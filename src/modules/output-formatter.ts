import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { GTMPlaybook } from '../types';
import { logger } from '../utils/logger';

export class OutputFormatter {
  /**
   * Format and save GTM playbook
   */
  async savePlaybook(
    playbook: GTMPlaybook,
    outputPath: string,
    format: 'yaml' | 'markdown' | 'json' = 'yaml'
  ): Promise<string> {
    let content: string;
    let extension: string;

    switch (format) {
      case 'yaml':
        content = this.formatAsYAML(playbook);
        extension = '.yaml';
        break;
      case 'markdown':
        content = this.formatAsMarkdown(playbook);
        extension = '.md';
        break;
      case 'json':
        content = JSON.stringify(playbook, null, 2);
        extension = '.json';
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    const finalPath = outputPath.endsWith(extension)
      ? outputPath
      : `${outputPath}${extension}`;

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
   * Format playbook as YAML
   */
  private formatAsYAML(playbook: GTMPlaybook): string {
    return yaml.dump(playbook, {
      indent: 2,
      lineWidth: 100,
      noRefs: true,
      sortKeys: false,
    });
  }

  /**
   * Format playbook as Markdown
   */
  private formatAsMarkdown(playbook: GTMPlaybook): string {
    const sections: string[] = [];

    // Header
    sections.push(`# GTM Playbook: ${playbook.company_profile.company_name}`);
    sections.push(`\nGenerated: ${playbook.metadata?.generated_at || new Date().toISOString()}`);
    sections.push(`\n---\n`);

    // Table of Contents
    sections.push(`## Table of Contents\n`);
    sections.push(`1. [Company Profile](#1-company-profile)`);
    sections.push(`2. [ICP Segments](#2-icp-segments)`);
    sections.push(`3. [Buyer Personas](#3-buyer-personas)`);
    sections.push(`4. [Use Cases](#4-use-cases)`);
    sections.push(`5. [Value Propositions](#5-value-propositions)`);
    sections.push(`6. [Competitive Positioning](#6-competitive-positioning)`);
    sections.push(`7. [Messaging Playbooks](#7-messaging-playbooks)`);
    sections.push(`8. [Qualification Framework](#8-qualification-framework)`);
    sections.push(`9. [Outbound Motion](#9-outbound-motion)`);
    sections.push(`10. [Implementation Roadmap](#10-implementation-roadmap)`);
    sections.push(`\n---\n`);

    // 1. Company Profile
    sections.push(`## 1. Company Profile\n`);
    sections.push(`**Company:** ${playbook.company_profile.company_name}`);
    sections.push(`**Domain:** ${playbook.company_profile.domain}`);
    sections.push(`**Category:** ${playbook.company_profile.category}`);
    sections.push(`**Business Model:** ${playbook.company_profile.business_model}`);
    sections.push(`**Stage:** ${playbook.company_profile.stage}\n`);
    sections.push(`**One-liner:** ${playbook.company_profile.one_liner}\n`);
    sections.push(`**Primary Offering:** ${playbook.company_profile.primary_offering}\n`);
    sections.push(`**Key Differentiators:**`);
    playbook.company_profile.key_differentiators.forEach((diff) => {
      sections.push(`- ${diff}`);
    });
    sections.push(`\n---\n`);

    // 2. ICP Segments
    sections.push(`## 2. ICP Segments\n`);
    playbook.icp_segments.forEach((icp, index) => {
      sections.push(`### ${index + 1}. ${icp.segment_name}\n`);
      sections.push(`**Company Characteristics:**`);
      sections.push(`- **Industries:** ${icp.company_characteristics.industry.join(', ')}`);
      sections.push(`- **Company Size:** ${icp.company_characteristics.company_size}`);
      sections.push(`- **Revenue Range:** ${icp.company_characteristics.revenue_range}`);
      sections.push(`- **Tech Maturity:** ${icp.company_characteristics.tech_maturity}`);
      sections.push(`- **Geographic Focus:** ${icp.company_characteristics.geographic_focus.join(', ')}\n`);

      sections.push(`**Buying Triggers:**`);
      icp.buying_triggers.forEach((trigger) => sections.push(`- ${trigger}`));
      sections.push(``);

      sections.push(`**Disqualifiers:**`);
      icp.disqualifiers.forEach((dq) => sections.push(`- ${dq}`));
      sections.push(``);

      sections.push(`**Qualification Criteria:**`);
      sections.push(`*Must Have:*`);
      icp.qualification_criteria.must_have.forEach((mh) => sections.push(`- ${mh}`));
      sections.push(`*Nice to Have:*`);
      icp.qualification_criteria.nice_to_have.forEach((nh) => sections.push(`- ${nh}`));
      sections.push(``);
    });
    sections.push(`---\n`);

    // 3. Buyer Personas
    sections.push(`## 3. Buyer Personas\n`);
    playbook.buyer_personas.forEach((persona, index) => {
      sections.push(`### ${index + 1}. ${persona.persona_name}\n`);
      sections.push(`**Job Titles:** ${persona.job_titles.join(', ')}`);
      sections.push(`**Reports To:** ${persona.reports_to}`);
      sections.push(`**Department:** ${persona.department}`);
      sections.push(`**Buying Role:** ${persona.buying_role}`);
      sections.push(`**Messaging Tone:** ${persona.messaging_tone}\n`);

      sections.push(`**Responsibilities:**`);
      persona.responsibilities.forEach((resp) => sections.push(`- ${resp}`));
      sections.push(``);

      sections.push(`**Goals & KPIs:**`);
      persona.goals_and_kpis.forEach((goal) => sections.push(`- ${goal}`));
      sections.push(``);

      sections.push(`**Pain Points:**`);
      persona.pain_points.forEach((pp) => {
        sections.push(`- **[${pp.intensity}]** ${pp.pain}`);
        sections.push(`  - *Current Solution:* ${pp.current_solution}`);
      });
      sections.push(``);

      sections.push(`**Common Objections:**`);
      persona.objections.forEach((obj) => {
        sections.push(`- **Objection:** "${obj.objection}"`);
        sections.push(`  - **Response:** ${obj.response}`);
      });
      sections.push(``);

      sections.push(`**Information Sources:** ${persona.information_sources.join(', ')}`);
      sections.push(``);
    });
    sections.push(`---\n`);

    // 4. Use Cases
    sections.push(`## 4. Use Cases\n`);
    playbook.use_cases.forEach((useCase, index) => {
      sections.push(`### ${index + 1}. ${useCase.use_case_name}\n`);
      sections.push(`**Problem Statement:** ${useCase.problem_statement}\n`);
      sections.push(`**Primary Persona:** ${useCase.primary_persona}\n`);
      sections.push(`**Current State:** ${useCase.current_state}\n`);
      sections.push(`**Desired State:** ${useCase.desired_state}\n`);

      sections.push(`**Value Drivers:**`);
      useCase.value_drivers.forEach((vd) => {
        sections.push(`- ${vd.driver} - *${vd.quantification}*`);
      });
      sections.push(``);

      sections.push(`**Proof Points:**`);
      useCase.proof_points.forEach((pp) => sections.push(`- ${pp}`));
      sections.push(``);

      sections.push(`**Competitive Alternative:** ${useCase.competitive_alternative}`);
      sections.push(``);
    });
    sections.push(`---\n`);

    // 5. Value Propositions
    sections.push(`## 5. Value Propositions\n`);
    sections.push(`### Core Value Proposition\n`);
    sections.push(`**${playbook.value_propositions.core.headline}**\n`);
    sections.push(`${playbook.value_propositions.core.subheadline}\n`);
    sections.push(`*${playbook.value_propositions.core.proof_statement}*\n`);

    sections.push(`### Persona-Specific Value Propositions\n`);
    playbook.value_propositions.persona_specific.forEach((pvp) => {
      sections.push(`#### ${pvp.persona}\n`);
      sections.push(`**Value Prop:** ${pvp.value_prop}\n`);
      sections.push(`**Key Metric:** ${pvp.key_metric}\n`);
      sections.push(`**Before:** ${pvp.before_after.before}`);
      sections.push(`**After:** ${pvp.before_after.after}\n`);
    });
    sections.push(`---\n`);

    // 6. Competitive Positioning
    sections.push(`## 6. Competitive Positioning\n`);
    sections.push(`### Positioning Statement\n`);
    sections.push(`${playbook.competitive_positioning.positioning_statement}\n`);

    sections.push(`### Competitive Matrix\n`);
    Object.entries(playbook.competitive_positioning.competitive_matrix).forEach(
      ([key, comp]) => {
        sections.push(`#### ${comp.name}\n`);
        sections.push(`**Their Positioning:** ${comp.positioning}\n`);

        sections.push(`**Strengths:**`);
        comp.strengths.forEach((s) => sections.push(`- ${s}`));
        sections.push(``);

        sections.push(`**Weaknesses:**`);
        comp.weaknesses.forEach((w) => sections.push(`- ${w}`));
        sections.push(``);

        sections.push(`**When We Win:** ${comp.when_we_win}\n`);
        sections.push(`**When We Lose:** ${comp.when_we_lose}\n`);

        sections.push(`**Battlecard Talking Points:**`);
        comp.battlecard_talking_points.forEach((tp) => sections.push(`- ${tp}`));
        sections.push(``);
      }
    );
    sections.push(`---\n`);

    // 7. Messaging Playbooks
    sections.push(`## 7. Messaging Playbooks\n`);

    sections.push(`### Email Sequences\n`);
    playbook.messaging_playbooks.email_sequences.forEach((seq, index) => {
      sections.push(`#### Sequence ${index + 1}: ${seq.sequence_name}\n`);
      sections.push(`**Persona:** ${seq.persona}`);
      sections.push(`**Use Case Focus:** ${seq.use_case_focus}\n`);

      [seq.touch_1, seq.touch_2, seq.touch_3].forEach((touch, i) => {
        sections.push(`**Touch ${i + 1}** (${touch.timing}):`);
        sections.push(`- **Subject:** ${touch.subject_line}`);
        if (touch.preview_text) {
          sections.push(`- **Preview:** ${touch.preview_text}`);
        }
        sections.push(`- **Body:**\n\`\`\`\n${touch.body}\n\`\`\``);
        sections.push(`- **CTA:** ${touch.cta}\n`);
      });
    });

    sections.push(`### LinkedIn Message Templates\n`);
    playbook.messaging_playbooks.linkedin_messages.forEach((lm) => {
      sections.push(`#### ${lm.persona}\n`);
      sections.push(`**Connection Request:**`);
      sections.push(`\`\`\`\n${lm.connection_request}\n\`\`\`\n`);
      sections.push(`**Follow-up Message:**`);
      sections.push(`\`\`\`\n${lm.follow_up_message}\n\`\`\`\n`);
    });

    sections.push(`### Cold Call Scripts\n`);
    playbook.messaging_playbooks.cold_call_scripts.forEach((script) => {
      sections.push(`#### ${script.persona}\n`);
      sections.push(`**Opener:**\n${script.opener}\n`);

      sections.push(`**Pain Probe Questions:**`);
      script.pain_probe_questions.forEach((q) => sections.push(`- ${q}`));
      sections.push(``);

      sections.push(`**Value Statement:**\n${script.value_statement}\n`);

      sections.push(`**Objection Handlers:**`);
      Object.entries(script.objection_handlers).forEach(([obj, handler]) => {
        sections.push(`- **"${obj}"**`);
        sections.push(`  - ${handler.response}`);
      });
      sections.push(``);

      sections.push(`**Close:**\n${script.close}\n`);
    });
    sections.push(`---\n`);

    // 8. Qualification Framework
    sections.push(`## 8. Qualification Framework\n`);
    sections.push(`**Model:** ${playbook.qualification_framework.qualification_model}\n`);

    sections.push(`### Criteria\n`);
    playbook.qualification_framework.criteria.forEach((crit, index) => {
      sections.push(`${index + 1}. **${crit.criterion}** (Weight: ${crit.weight}/5)`);
      sections.push(`   - **Question:** ${crit.question}`);
      sections.push(`   - **Good Answer:** ${crit.good_answer}`);
      sections.push(`   - **Red Flag:** ${crit.red_flag}\n`);
    });

    sections.push(`### Scoring\n`);
    sections.push(`- **Qualified:** ${playbook.qualification_framework.scoring.qualified}+`);
    sections.push(`- **Nurture:** ${playbook.qualification_framework.scoring.nurture}`);
    sections.push(`- **Disqualified:** ${playbook.qualification_framework.scoring.disqualified}- or below`);
    sections.push(`\n---\n`);

    // 9. Outbound Motion
    sections.push(`## 9. Outbound Motion\n`);
    sections.push(`### Recommended Approach\n`);
    sections.push(`${playbook.outbound_motion.recommended_approach}\n`);

    sections.push(`### Priority Plays\n`);
    Object.entries(playbook.outbound_motion.priority_plays).forEach(([key, play]) => {
      sections.push(`#### ${play.name}\n`);
      sections.push(`- **Target:** ${play.target}`);
      sections.push(`- **Trigger:** ${play.trigger}`);
      sections.push(`- **Sequence:** ${play.sequence}`);
      sections.push(`- **Expected Conversion:** ${play.expected_conversion}\n`);
    });

    sections.push(`### Signals to Monitor\n`);
    playbook.outbound_motion.signals_to_monitor.forEach((signal) => {
      sections.push(`- **Signal:** ${signal.signal}`);
      sections.push(`  - **Source:** ${signal.source}`);
      sections.push(`  - **Action:** ${signal.action}\n`);
    });
    sections.push(`---\n`);

    // 10. Implementation Roadmap
    sections.push(`## 10. Implementation Roadmap\n`);

    sections.push(`### Week 1\n`);
    sections.push(`**Focus:** ${playbook.implementation_roadmap.week_1.focus}\n`);
    sections.push(`**Deliverables:**`);
    playbook.implementation_roadmap.week_1.deliverables.forEach((d) =>
      sections.push(`- ${d}`)
    );
    sections.push(``);

    sections.push(`### Week 2-4\n`);
    sections.push(`**Focus:** ${playbook.implementation_roadmap.week_2_4.focus}\n`);
    sections.push(`**Deliverables:**`);
    playbook.implementation_roadmap.week_2_4.deliverables.forEach((d) =>
      sections.push(`- ${d}`)
    );
    sections.push(``);

    sections.push(`### Month 2 Onwards\n`);
    sections.push(`**Focus:** ${playbook.implementation_roadmap.month_2_onwards.focus}\n`);
    if (playbook.implementation_roadmap.month_2_onwards.metrics_to_track) {
      sections.push(`**Metrics to Track:**`);
      playbook.implementation_roadmap.month_2_onwards.metrics_to_track.forEach((m) =>
        sections.push(`- ${m}`)
      );
    }
    sections.push(`\n---\n`);

    // Metadata
    if (playbook.metadata) {
      sections.push(`## Metadata\n`);
      sections.push(`**Generated:** ${playbook.metadata.generated_at}`);

      if (playbook.metadata.assumptions?.length > 0) {
        sections.push(`\n**Assumptions:**`);
        playbook.metadata.assumptions.forEach((a) => sections.push(`- ${a}`));
      }

      if (playbook.metadata.research_sources?.length > 0) {
        sections.push(`\n**Research Sources:**`);
        playbook.metadata.research_sources.slice(0, 10).forEach((s) => sections.push(`- ${s}`));
      }
    }

    return sections.join('\n');
  }
}
