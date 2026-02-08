import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export interface Config {
  anthropicApiKey: string;
  anthropicModel: string;
  anthropicApiUrl?: string;
  maxConcurrentRequests: number;
  outputFormat: 'yaml' | 'markdown' | 'json';
  outputDir: string;
}

export function loadConfig(): Config {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY is required. Please set it in your .env file or environment variables.'
    );
  }

  return {
    anthropicApiKey: apiKey,
    anthropicModel: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929',
    anthropicApiUrl: process.env.ANTHROPIC_API_URL,
    maxConcurrentRequests: parseInt(process.env.MAX_CONCURRENT_REQUESTS || '3', 10),
    outputFormat: (process.env.OUTPUT_FORMAT || 'yaml') as 'yaml' | 'markdown' | 'json',
    outputDir: process.env.OUTPUT_DIR || path.join(process.cwd(), 'outputs'),
  };
}

export const config = loadConfig();
