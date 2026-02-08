import express, { Request, Response } from 'express';
import cors from 'cors';
import * as path from 'path';
import * as fs from 'fs';
import { config } from '../utils/config';
import { logger } from '../utils/logger';
import { CompanyResearcher } from '../modules/researcher';
import { GTMOrchestrator } from '../modules/orchestrator';
import { OctaveOrchestrator } from '../modules/octave-orchestrator';
import { AnalysisConfig, PlaybookConfig, PlaybookType } from '../types';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store active jobs for progress tracking
interface Job {
  id: string;
  type: 'analyze' | 'playbook';
  status: 'running' | 'completed' | 'failed';
  progress: number;
  message: string;
  result?: any;
  error?: string;
  clients: Response[];
}

const jobs = new Map<string, Job>();

/**
 * Generate unique job ID
 */
function generateJobId(): string {
  return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Send progress update to all connected clients for a job
 */
function sendProgress(jobId: string, progress: number, message: string) {
  const job = jobs.get(jobId);
  if (!job) return;

  job.progress = progress;
  job.message = message;

  job.clients.forEach(client => {
    client.write(`data: ${JSON.stringify({ progress, message })}\n\n`);
  });
}

/**
 * Health check endpoint
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

/**
 * Generate strategic GTM analysis
 */
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { domain, industry, competitor, format = 'markdown', model } = req.body;

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    const jobId = generateJobId();
    const job: Job = {
      id: jobId,
      type: 'analyze',
      status: 'running',
      progress: 0,
      message: 'Starting analysis...',
      clients: [],
    };

    jobs.set(jobId, job);

    // Return job ID immediately
    res.json({ jobId, status: 'started' });

    // Run analysis in background
    (async () => {
      try {
        sendProgress(jobId, 10, `Researching ${domain}...`);

        const analysisConfig: AnalysisConfig = {
          domain,
          industry_focus: industry,
          competitor_focus: competitor,
          output_format: format,
          model: model || config.anthropicModel,
        };

        const orchestrator = new GTMOrchestrator(analysisConfig);

        sendProgress(jobId, 30, 'Analyzing company information...');
        const { playbook, outputPath } = await orchestrator.execute();

        sendProgress(jobId, 90, 'Formatting output...');

        // Read the generated file
        const content = fs.readFileSync(outputPath, 'utf-8');

        job.status = 'completed';
        job.progress = 100;
        job.message = 'Analysis complete!';
        job.result = {
          playbook,
          content,
          outputPath,
        };

        sendProgress(jobId, 100, 'Analysis complete!');

        // Close all SSE connections
        job.clients.forEach(client => client.end());
        job.clients = [];

      } catch (error: any) {
        job.status = 'failed';
        job.error = error.message;
        sendProgress(jobId, 100, `Error: ${error.message}`);

        job.clients.forEach(client => client.end());
        job.clients = [];
      }
    })();

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Generate Octave-style playbook
 */
app.post('/api/playbook', async (req: Request, res: Response) => {
  try {
    const { domain, type, focus, format = 'markdown', model } = req.body;

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    if (!type) {
      return res.status(400).json({ error: 'Playbook type is required' });
    }

    if (!focus) {
      return res.status(400).json({ error: 'Target focus is required' });
    }

    const validTypes: PlaybookType[] = ['practitioner', 'sector', 'milestone', 'competitive', 'account'];
    if (!validTypes.includes(type as PlaybookType)) {
      return res.status(400).json({ error: `Invalid type. Must be one of: ${validTypes.join(', ')}` });
    }

    const jobId = generateJobId();
    const job: Job = {
      id: jobId,
      type: 'playbook',
      status: 'running',
      progress: 0,
      message: 'Starting playbook generation...',
      clients: [],
    };

    jobs.set(jobId, job);

    // Return job ID immediately
    res.json({ jobId, status: 'started' });

    // Run playbook generation in background
    (async () => {
      try {
        sendProgress(jobId, 10, `Researching ${domain}...`);

        const playbookConfig: PlaybookConfig = {
          domain,
          playbook_type: type as PlaybookType,
          target_focus: focus,
          output_format: format,
          model: model || config.anthropicModel,
        };

        const orchestrator = new OctaveOrchestrator(playbookConfig);

        sendProgress(jobId, 30, 'Generating playbook...');
        const { playbook, outputPath } = await orchestrator.execute();

        sendProgress(jobId, 90, 'Formatting output...');

        // Read the generated file
        const content = fs.readFileSync(outputPath, 'utf-8');

        job.status = 'completed';
        job.progress = 100;
        job.message = 'Playbook complete!';
        job.result = {
          playbook,
          content,
          outputPath,
        };

        sendProgress(jobId, 100, 'Playbook complete!');

        // Close all SSE connections
        job.clients.forEach(client => client.end());
        job.clients = [];

      } catch (error: any) {
        job.status = 'failed';
        job.error = error.message;
        sendProgress(jobId, 100, `Error: ${error.message}`);

        job.clients.forEach(client => client.end());
        job.clients = [];
      }
    })();

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Server-Sent Events endpoint for progress tracking
 */
app.get('/api/progress/:jobId', (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  // Set up SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send initial progress
  res.write(`data: ${JSON.stringify({ progress: job.progress, message: job.message })}\n\n`);

  // Add client to job
  job.clients.push(res);

  // Remove client on disconnect
  req.on('close', () => {
    job.clients = job.clients.filter(client => client !== res);
  });
});

/**
 * Get job result
 */
app.get('/api/result/:jobId', (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  if (job.status === 'running') {
    return res.json({ status: 'running', progress: job.progress, message: job.message });
  }

  if (job.status === 'failed') {
    return res.status(500).json({ status: 'failed', error: job.error });
  }

  res.json({ status: 'completed', result: job.result });
});

/**
 * Download playbook
 */
app.get('/api/download/:jobId', (req: Request, res: Response) => {
  const { jobId } = req.params;
  const job = jobs.get(jobId);

  if (!job || job.status !== 'completed' || !job.result) {
    return res.status(404).json({ error: 'Result not found' });
  }

  const { content, outputPath } = job.result;
  const filename = path.basename(outputPath);

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'text/markdown');
  res.send(content);
});

/**
 * Serve frontend
 */
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Start server
 */
app.listen(PORT, HOST, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 GTM Context Engine - Web Interface');
  console.log('='.repeat(60));
  console.log(`\n📍 Server running at: http://localhost:${PORT}`);
  console.log(`📍 Also accessible at: http://${HOST}:${PORT}`);
  console.log(`\n💡 Open your browser and navigate to the URL above\n`);
  console.log('='.repeat(60) + '\n');
});

// Cleanup old jobs every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 3600000;
  jobs.forEach((job, jobId) => {
    const jobTimestamp = parseInt(jobId.split('_')[1]);
    if (jobTimestamp < oneHourAgo) {
      jobs.delete(jobId);
    }
  });
}, 3600000);
