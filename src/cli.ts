#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import * as path from 'path';
import { GTMOrchestrator } from './modules/orchestrator';
import { OctaveOrchestrator } from './modules/octave-orchestrator';
import { logger, LogLevel } from './utils/logger';
import { config } from './utils/config';
import { AnalysisConfig, PlaybookConfig, PlaybookType } from './types';

const program = new Command();

program
  .name('gtm')
  .description('GTM Context Engine - Generate comprehensive outbound sales strategies')
  .version('1.0.0');

program
  .command('analyze')
  .description('Analyze a company domain and generate GTM playbook')
  .argument('<domain>', 'Company domain (e.g., stripe.com)')
  .option('-i, --industry <industry>', 'Focus on specific industry')
  .option('-c, --competitor <domain>', 'Focus positioning against specific competitor')
  .option('-p, --persona <title>', 'Generate deep dive for specific persona')
  .option('-f, --format <format>', 'Output format: yaml, markdown, or json', 'yaml')
  .option('-m, --model <model>', 'AI model to use', config.anthropicModel)
  .option('-v, --verbose', 'Verbose logging')
  .action(async (domain: string, options: any) => {
    try {
      // Set log level
      if (options.verbose) {
        logger.setLevel(LogLevel.DEBUG);
      }

      // Display header
      console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║        GTM Context Engine                             ║'));
      console.log(chalk.bold.cyan('║        Powered by Claude AI                           ║'));
      console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════════════╝\n'));

      logger.info(`Target Domain: ${chalk.bold(domain)}`);
      if (options.industry) {
        logger.info(`Industry Focus: ${chalk.bold(options.industry)}`);
      }
      if (options.competitor) {
        logger.info(`Competitor Focus: ${chalk.bold(options.competitor)}`);
      }
      logger.info(`Output Format: ${chalk.bold(options.format)}`);
      logger.info(`AI Model: ${chalk.bold(options.model)}\n`);

      // Create analysis config
      const analysisConfig: AnalysisConfig = {
        domain,
        industry_focus: options.industry,
        competitor_focus: options.competitor,
        persona_depth: options.persona,
        output_format: options.format,
        model: options.model,
      };

      // Execute orchestrator
      const orchestrator = new GTMOrchestrator(analysisConfig);
      const { playbook, outputPath } = await orchestrator.execute();

      // Display summary
      console.log(chalk.bold.green('\n✓ GTM Playbook Generated Successfully!\n'));
      console.log(chalk.cyan('Summary:'));
      console.log(`  Company: ${playbook.company_profile.company_name}`);
      console.log(`  ICP Segments: ${playbook.icp_segments.length}`);
      console.log(`  Buyer Personas: ${playbook.buyer_personas.length}`);
      console.log(`  Use Cases: ${playbook.use_cases.length}`);
      console.log(`  Competitors Analyzed: ${Object.keys(playbook.competitive_positioning.competitive_matrix).length}`);
      console.log(`\n  Output File: ${chalk.bold(outputPath)}\n`);

      // Display next steps
      console.log(chalk.bold.yellow('Next Steps:'));
      console.log(`  1. Review the playbook: ${chalk.cyan(`cat ${outputPath}`)}`);
      console.log(`  2. Customize messaging for your team`);
      console.log(`  3. Implement qualification framework in your CRM`);
      console.log(`  4. Launch priority plays from the outbound motion section\n`);

    } catch (error: any) {
      logger.error('Failed to generate GTM playbook', error);
      process.exit(1);
    }
  });

program
  .command('playbook')
  .description('Generate Octave-style sales playbook')
  .argument('<domain>', 'Company domain (e.g., stripe.com)')
  .requiredOption('-t, --type <type>', 'Playbook type: practitioner, sector, milestone, competitive, or account')
  .requiredOption('-f, --focus <focus>', 'Target focus (e.g., "RevOps teams needing technical execution")')
  .option('--format <format>', 'Output format: markdown or json', 'markdown')
  .option('-m, --model <model>', 'AI model to use', config.anthropicModel)
  .option('-v, --verbose', 'Verbose logging')
  .action(async (domain: string, options: any) => {
    try {
      // Set log level
      if (options.verbose) {
        logger.setLevel(LogLevel.DEBUG);
      }

      // Validate playbook type
      const validTypes: PlaybookType[] = ['practitioner', 'sector', 'milestone', 'competitive', 'account'];
      if (!validTypes.includes(options.type as PlaybookType)) {
        console.error(chalk.red(`\nInvalid playbook type: ${options.type}`));
        console.log(chalk.yellow(`Valid types: ${validTypes.join(', ')}\n`));
        process.exit(1);
      }

      // Display header
      console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════════════╗'));
      console.log(chalk.bold.cyan('║        Octave-Style Playbook Generator                ║'));
      console.log(chalk.bold.cyan('║        Powered by Claude AI                           ║'));
      console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════════════╝\n'));

      logger.info(`Target Domain: ${chalk.bold(domain)}`);
      logger.info(`Playbook Type: ${chalk.bold(options.type)}`);
      logger.info(`Target Focus: ${chalk.bold(options.focus)}`);
      logger.info(`Output Format: ${chalk.bold(options.format)}`);
      logger.info(`AI Model: ${chalk.bold(options.model)}\n`);

      // Create playbook config
      const playbookConfig: PlaybookConfig = {
        domain,
        playbook_type: options.type as PlaybookType,
        target_focus: options.focus,
        output_format: options.format,
        model: options.model,
      };

      // Execute orchestrator
      const orchestrator = new OctaveOrchestrator(playbookConfig);
      const { playbook, outputPath } = await orchestrator.execute();

      // Display summary
      console.log(chalk.bold.green('\n✓ Octave Playbook Generated Successfully!\n'));
      console.log(chalk.cyan('Summary:'));
      console.log(`  Playbook: ${playbook.playbook_title}`);
      console.log(`  Type: ${playbook.playbook_type}`);
      console.log(`  Personas: ${playbook.value_propositions_by_persona.length}`);
      console.log(`  Qualifying Questions: ${playbook.qualifying_questions.length}`);
      console.log(`  Key Insights: ${playbook.key_insights.length}`);
      console.log(`\n  Output File: ${chalk.bold(outputPath)}\n`);

      // Display next steps
      console.log(chalk.bold.yellow('Next Steps:'));
      console.log(`  1. Review the playbook: ${chalk.cyan(`cat ${outputPath}`)}`);
      console.log(`  2. Train your sales team on the messaging`);
      console.log(`  3. Use qualifying questions in discovery calls`);
      console.log(`  4. Customize outreach sequences for your brand\n`);

    } catch (error: any) {
      logger.error('Failed to generate playbook', error);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize GTM engine configuration')
  .action(() => {
    console.log(chalk.bold.cyan('\n╔═══════════════════════════════════════════════════════╗'));
    console.log(chalk.bold.cyan('║        GTM Context Engine - Setup                     ║'));
    console.log(chalk.bold.cyan('╚═══════════════════════════════════════════════════════╝\n'));

    console.log(chalk.yellow('Required Configuration:'));
    console.log(`\n1. Set your Anthropic API key:`);
    console.log(chalk.cyan('   export ANTHROPIC_API_KEY="your-api-key-here"'));
    console.log(`\n   Or create a .env file:`);
    console.log(chalk.cyan('   echo "ANTHROPIC_API_KEY=your-api-key-here" > .env'));

    console.log(chalk.yellow('\n\nOptional Configuration:'));
    console.log(`\n2. Customize output directory (default: ./outputs):`);
    console.log(chalk.cyan('   export OUTPUT_DIR="/path/to/outputs"'));

    console.log(`\n3. Change default output format (default: yaml):`);
    console.log(chalk.cyan('   export OUTPUT_FORMAT="markdown"'));

    console.log(`\n4. Select AI model (default: claude-sonnet-4-5-20250929):`);
    console.log(chalk.cyan('   export ANTHROPIC_MODEL="claude-opus-4-5-20251101"'));

    console.log(chalk.yellow('\n\nExample Usage:'));
    console.log(chalk.bold('\nStrategic GTM Analysis:'));
    console.log(chalk.cyan('   gtm analyze stripe.com'));
    console.log(chalk.cyan('   gtm analyze notion.so --format markdown'));
    console.log(chalk.cyan('   gtm analyze salesforce.com --industry healthcare --verbose'));

    console.log(chalk.bold('\nOctave-Style Sales Playbooks:'));
    console.log(chalk.cyan('   gtm playbook stripe.com -t practitioner -f "RevOps teams needing technical execution"'));
    console.log(chalk.cyan('   gtm playbook notion.so -t sector -f "Education technology companies"'));
    console.log(chalk.cyan('   gtm playbook asana.com -t competitive -f "Displacing Monday.com"'));
    console.log(chalk.cyan('   gtm playbook zoom.us -t milestone -f "Companies that just raised Series B"\n'));

    console.log(chalk.green('✓ Setup instructions displayed\n'));
  });

program.parse();
