import ora from 'ora';
import { CompanyResearcher } from './researcher';
import { OctavePlaybookAnalyzer } from './octave-analyzer';
import { OctaveFormatter } from './octave-formatter';
import { AIClient } from '../utils/ai-client';
import { logger } from '../utils/logger';
import { PlaybookConfig, OctavePlaybook } from '../types';

export class OctaveOrchestrator {
  private researcher: CompanyResearcher;
  private aiClient: AIClient;
  private config: PlaybookConfig;

  constructor(config: PlaybookConfig) {
    this.config = config;
    this.aiClient = new AIClient(undefined, config.model);
    this.researcher = new CompanyResearcher(this.aiClient);
  }

  /**
   * Main execution flow for Octave playbook generation
   */
  async execute(): Promise<{ playbook: OctavePlaybook; outputPath: string }> {
    const spinner = ora();

    try {
      // Phase 1: Research
      spinner.start(`Researching ${this.config.domain}...`);
      const researchData = await this.researcher.researchCompany(this.config.domain);
      spinner.succeed(`Research completed for ${this.config.domain}`);

      // Phase 2: Generate Octave Playbook
      spinner.start(`Generating ${this.config.playbook_type} playbook...`);
      const analyzer = new OctavePlaybookAnalyzer(this.config, this.aiClient);
      const playbook = await analyzer.generatePlaybook(researchData);
      spinner.succeed('Octave playbook generated');

      // Phase 3: Output
      spinner.start('Formatting and saving playbook...');
      const formatter = new OctaveFormatter();
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `${this.config.playbook_type}-playbook-${this.sanitizeDomain(this.config.domain)}-${timestamp}`;

      let outputPath: string;
      if (this.config.output_format === 'json') {
        outputPath = await formatter.saveAsJSON(playbook, `outputs/${filename}`);
      } else {
        outputPath = await formatter.savePlaybook(playbook, `outputs/${filename}`);
      }

      spinner.succeed('Playbook saved');

      return { playbook, outputPath };
    } catch (error) {
      spinner.fail('Failed to generate playbook');
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
