import ora from 'ora';
import { CompanyResearcher } from './researcher';
import { GTMAnalyzer } from './gtm-analyzer';
import { OutputFormatter } from './output-formatter';
import { AIClient } from '../utils/ai-client';
import { logger } from '../utils/logger';
import { AnalysisConfig, GTMPlaybook } from '../types';

export class GTMOrchestrator {
  private researcher: CompanyResearcher;
  private aiClient: AIClient;
  private config: AnalysisConfig;

  constructor(config: AnalysisConfig) {
    this.config = config;
    this.aiClient = new AIClient(undefined, config.model);
    this.researcher = new CompanyResearcher(this.aiClient);
  }

  /**
   * Main execution flow
   */
  async execute(): Promise<{ playbook: GTMPlaybook; outputPath: string }> {
    const spinner = ora();

    try {
      // Phase 1: Research
      spinner.start(`Researching ${this.config.domain}...`);
      const researchData = await this.researcher.researchCompany(this.config.domain);
      spinner.succeed(`Research completed for ${this.config.domain}`);

      // Phase 2: Analysis
      spinner.start('Generating GTM playbook...');
      const analyzer = new GTMAnalyzer(this.config, this.aiClient);
      const playbook = await analyzer.analyzeAndGeneratePlaybook(researchData);
      spinner.succeed('GTM playbook generated');

      // Phase 3: Output
      spinner.start('Formatting and saving playbook...');
      const formatter = new OutputFormatter();
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `gtm-playbook-${this.sanitizeDomain(this.config.domain)}-${timestamp}`;

      const outputPath = await formatter.savePlaybook(
        playbook,
        `outputs/${filename}`,
        this.config.output_format || 'yaml'
      );
      spinner.succeed('Playbook saved');

      return { playbook, outputPath };
    } catch (error) {
      spinner.fail('Failed to generate GTM playbook');
      throw error;
    }
  }

  /**
   * Sanitize domain for filename
   */
  private sanitizeDomain(domain: string): string {
    return domain.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }
}
