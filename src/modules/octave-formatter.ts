import * as fs from 'fs';
import * as path from 'path';
import { OctavePlaybook } from '../types';
import { logger } from '../utils/logger';

export class OctaveFormatter {
  /**
   * Format and save Octave playbook as markdown
   */
  async savePlaybook(playbook: OctavePlaybook, outputPath: string): Promise<string> {
    const content = this.formatAsMarkdown(playbook);
    const finalPath = outputPath.endsWith('.md') ? outputPath : `${outputPath}.md`;

    // Ensure directory exists
    const dir = path.dirname(finalPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(finalPath, content, 'utf-8');
    logger.success(`Playbook saved to: ${finalPath}`);

    return finalPath;
  }

  /**
   * Format playbook as Octave-style markdown
   */
  private formatAsMarkdown(playbook: OctavePlaybook): string {
    const sections: string[] = [];

    // Header
    sections.push(`# 📖 ${playbook.playbook_title} Playbook\n`);
    sections.push(`**Type:** ${playbook.playbook_type}`);
    sections.push(`**Focus:** ${playbook.target_focus}`);
    sections.push(`**Generated:** ${playbook.metadata?.generated_at || new Date().toISOString()}\n`);
    sections.push(`---\n`);

    // 1. Core Strategy
    sections.push(`## 1. ⚙️ Core Strategy: Description & Executive Summary\n`);
    sections.push(`| Element | Summary |`);
    sections.push(`|---------|---------|`);
    sections.push(`| **Description** | ${playbook.core_strategy.description} |`);
    sections.push(`| **Executive Summary** | ${playbook.core_strategy.executive_summary} |\n`);

    sections.push(`**The Core Tension**\n`);
    sections.push(`${playbook.core_strategy.core_tension}\n`);

    sections.push(`**Why Conventional Solutions Fail**\n`);
    sections.push(`${playbook.core_strategy.why_conventional_fails}\n`);

    sections.push(`**What Survival Demands**\n`);
    sections.push(`${playbook.core_strategy.what_survival_demands}\n`);

    sections.push(`**The Real Challenge**\n`);
    sections.push(`${playbook.core_strategy.the_real_challenge}\n`);

    sections.push(`---\n`);

    // 2. Key Insights
    sections.push(`## 2. 💡 Key Insights\n`);
    playbook.key_insights.forEach((insight) => {
      sections.push(`**${insight.title}**\n`);
      sections.push(`${insight.content}\n`);
    });

    sections.push(`---\n`);

    // Approach Angle
    sections.push(`### Approach Angle\n`);
    sections.push(`**Lead with...**\n${playbook.approach_angle.lead_with}\n`);
    sections.push(`**Position as...**\n${playbook.approach_angle.position_as}\n`);
    sections.push(`**Address...**\n${playbook.approach_angle.address}\n`);
    sections.push(`**Make it about...**\n${playbook.approach_angle.make_it_about}\n`);

    sections.push(`---\n`);

    // 3. Value Propositions by Persona
    sections.push(`## 3. 🎯 Value Propositions by Persona\n`);
    sections.push(`| Persona | Value Proposition |`);
    sections.push(`|---------|------------------|`);

    playbook.value_propositions_by_persona.forEach((persona) => {
      const valueProps = persona.value_propositions
        .map((vp) => `**${vp.name}:** ${vp.description}`)
        .join(' ');
      sections.push(`| **${persona.persona_title}** | ${valueProps} |`);
    });

    sections.push(`\n---\n`);

    // 4. Qualifying Questions
    sections.push(`## 4. ❓ Qualifying Questions\n`);
    playbook.qualifying_questions.forEach((q, i) => {
      sections.push(`${i + 1}. ${q}`);
    });

    sections.push(`\n---\n`);

    // 5. Key Messaging
    sections.push(`## 5. 💬 Key Messaging\n`);
    sections.push(`**Core Message:**\n`);
    sections.push(`"${playbook.key_messaging.message}"\n`);

    sections.push(`**Persona-Specific Messaging:**\n`);
    sections.push(`| Persona | Messaging Focus |`);
    sections.push(`|---------|-----------------|`);
    playbook.key_messaging.persona_specific.forEach((pm) => {
      sections.push(`| ${pm.persona} | "${pm.message}" |`);
    });

    sections.push(`\n---\n`);

    // 6. Outreach Sequences
    sections.push(`## 6. 📧 Outreach Sequences\n`);

    sections.push(`### Email Sequence (3-Touch)\n`);
    sections.push(`**Email 1: The Diagnosis**\n`);
    sections.push(`- **Subject:** ${playbook.outreach_sequences.email_sequence.email_1_diagnosis.subject}`);
    sections.push(`- **Body:**\n\`\`\`\n${playbook.outreach_sequences.email_sequence.email_1_diagnosis.body}\n\`\`\`\n`);

    sections.push(`**Email 2: The Proof**\n`);
    sections.push(`- **Subject:** ${playbook.outreach_sequences.email_sequence.email_2_proof.subject}`);
    sections.push(`- **Body:**\n\`\`\`\n${playbook.outreach_sequences.email_sequence.email_2_proof.body}\n\`\`\`\n`);

    sections.push(`**Email 3: The Direct Ask**\n`);
    sections.push(`- **Subject:** ${playbook.outreach_sequences.email_sequence.email_3_direct_ask.subject}`);
    sections.push(`- **Body:**\n\`\`\`\n${playbook.outreach_sequences.email_sequence.email_3_direct_ask.body}\n\`\`\`\n`);

    sections.push(`---\n`);

    sections.push(`### LinkedIn Sequence\n`);
    sections.push(`**Connection Request (under 300 chars):**\n`);
    sections.push(`\`\`\`\n${playbook.outreach_sequences.linkedin_sequence.connection_request}\n\`\`\`\n`);
    sections.push(`**Follow-Up Message (under 500 chars):**\n`);
    sections.push(`\`\`\`\n${playbook.outreach_sequences.linkedin_sequence.follow_up_message}\n\`\`\`\n`);

    sections.push(`---\n`);

    sections.push(`### Cold Call Framework\n`);
    sections.push(`**Opener:**\n${playbook.outreach_sequences.cold_call_framework.opener}\n`);

    sections.push(`**Pain Probe Questions:**\n`);
    playbook.outreach_sequences.cold_call_framework.pain_probe_questions.forEach((q, i) => {
      sections.push(`${i + 1}. ${q}`);
    });
    sections.push(``);

    sections.push(`**15-Second Value Statement:**\n${playbook.outreach_sequences.cold_call_framework.value_statement_15sec}\n`);

    sections.push(`**Common Objections:**\n`);
    Object.entries(playbook.outreach_sequences.cold_call_framework.common_objections).forEach(
      ([objection, response]) => {
        sections.push(`- **"${objection}"** → ${response}`);
      }
    );
    sections.push(``);

    sections.push(`**Close:**\n${playbook.outreach_sequences.cold_call_framework.close}\n`);

    sections.push(`---\n`);

    // Metadata
    if (playbook.metadata) {
      sections.push(`## Metadata\n`);
      sections.push(`- **Company Domain:** ${playbook.metadata.company_domain}`);
      sections.push(`- **Generated:** ${playbook.metadata.generated_at}`);

      if (playbook.metadata.assumptions && playbook.metadata.assumptions.length > 0) {
        sections.push(`\n**Assumptions:**`);
        playbook.metadata.assumptions.forEach((a) => sections.push(`- ${a}`));
      }

      if (playbook.metadata.research_sources && playbook.metadata.research_sources.length > 0) {
        sections.push(`\n**Research Sources:** ${playbook.metadata.research_sources.length} sources consulted`);
      }
    }

    sections.push(`\n---\n`);
    sections.push(`\n*Generated by GTM Context Engine - Octave-Style Playbook*`);

    return sections.join('\n');
  }

  /**
   * Save as JSON
   */
  async saveAsJSON(playbook: OctavePlaybook, outputPath: string): Promise<string> {
    const content = JSON.stringify(playbook, null, 2);
    const finalPath = outputPath.endsWith('.json') ? outputPath : `${outputPath}.json`;

    const dir = path.dirname(finalPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(finalPath, content, 'utf-8');
    logger.success(`Playbook saved to: ${finalPath}`);

    return finalPath;
  }
}
