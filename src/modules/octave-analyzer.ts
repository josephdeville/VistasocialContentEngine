import { AIClient } from '../utils/ai-client';
import { logger } from '../utils/logger';
import {
  OctavePlaybook,
  PlaybookConfig,
  ResearchData,
  PlaybookType,
} from '../types';

export class OctavePlaybookAnalyzer {
  private aiClient: AIClient;
  private config: PlaybookConfig;
  private researchData!: ResearchData;

  constructor(config: PlaybookConfig, aiClient?: AIClient) {
    this.aiClient = aiClient || new AIClient();
    this.config = config;
  }

  /**
   * Generate complete Octave-style playbook
   */
  async generatePlaybook(researchData: ResearchData): Promise<OctavePlaybook> {
    this.researchData = researchData;

    logger.section('Generating Octave-Style Playbook');
    logger.info(`Type: ${this.config.playbook_type}`);
    logger.info(`Focus: ${this.config.target_focus}`);

    const prompt = this.buildOctavePrompt();
    const systemPrompt = this.getSystemPrompt();

    logger.info('Sending prompt to Claude AI...');

    const response = await this.aiClient.generateCompletion(
      prompt,
      systemPrompt,
      {
        maxTokens: 16000,
        temperature: 0.8,
      }
    );

    logger.info('Parsing playbook response...');
    const playbook = this.parsePlaybookResponse(response);

    logger.success('Octave playbook generated successfully');

    return playbook;
  }

  /**
   * Build the complete Octave-style prompt
   */
  private buildOctavePrompt(): string {
    const typeInstructions = this.getPlaybookTypeInstructions();

    return `<role>
You are a senior GTM strategist who creates segment-specific sales playbooks. You combine deep B2B sales expertise with the ability to identify acute operational pain points, map them to buyer personas, and craft messaging that demonstrates immediate understanding of the prospect's situation.

Your playbooks are actionable - they diagnose specific problems, explain why conventional solutions fail, and position a clear transformation path. A sales rep should be able to use your output immediately.
</role>

<task>
Research the company at ${this.config.domain} and generate a complete GTM Sales Playbook.

Playbook Type: ${this.config.playbook_type}
Target Focus: ${this.config.target_focus}
</task>

<playbook_type_instructions>
${typeInstructions}
</playbook_type_instructions>

<research_context>
Here is the research data gathered about ${this.config.domain}:

Company Information:
${JSON.stringify(this.researchData.company_info, null, 2)}

Competitive Landscape:
${JSON.stringify(this.researchData.competitive_landscape, null, 2)}

Customer Intelligence:
${JSON.stringify(this.researchData.customer_intelligence, null, 2)}

Market Trends:
${JSON.stringify(this.researchData.market_trends, null, 2)}
</research_context>

<output_requirements>
Generate a complete playbook with these EXACT sections in valid JSON format:

{
  "playbook_title": "string (e.g., 'RevOps Teams Needing Technical Execution')",
  "playbook_type": "${this.config.playbook_type}",
  "target_focus": "${this.config.target_focus}",

  "core_strategy": {
    "description": "2-3 sentences: WHO is this segment, what challenge, what symptoms",
    "executive_summary": "2-3 sentences: Strategic stakes, why unsolved matters, why conventional fails",
    "core_tension": "Paragraph: The gap between where they are and need to be",
    "why_conventional_fails": "Paragraph: Why typical approaches don't work for this segment",
    "what_survival_demands": "Paragraph: What these teams actually need - urgent and action-oriented",
    "the_real_challenge": "Paragraph: The root cause others miss"
  },

  "key_insights": [
    {
      "title": "The Pressure They're Under",
      "content": "Paragraph about who is pressuring them and timeline"
    },
    {
      "title": "The Capability Gap",
      "content": "Paragraph about missing skills/resources"
    },
    {
      "title": "Why Current Approaches Fail",
      "content": "Paragraph about what they've tried and why it didn't work"
    },
    {
      "title": "What Keeps Them Up at Night",
      "content": "Paragraph about the fear, risk, thing they can't admit"
    },
    {
      "title": "What Sets Successful Teams Apart",
      "content": "Paragraph about what winners do differently"
    }
  ],

  "approach_angle": {
    "lead_with": "How to open conversation, what to diagnose, what proof points",
    "position_as": "How to frame solution relative to failed alternatives",
    "address": "What executive concerns to tackle head-on",
    "make_it_about": "Ultimate value prop framing, transformation offered"
  },

  "value_propositions_by_persona": [
    {
      "persona_title": "VP of Revenue Operations",
      "value_propositions": [
        {
          "name": "Attribution Reportability Crisis",
          "description": "One sentence solution"
        },
        {
          "name": "The Hybrid Hiring Trap",
          "description": "One sentence solution"
        },
        {
          "name": "Velocity Bottleneck Stifles Strategy",
          "description": "One sentence solution"
        },
        {
          "name": "CRM Data Credibility Deficit",
          "description": "One sentence solution"
        }
      ]
    }
  ],

  "qualifying_questions": [
    "8 discovery questions that reveal if prospect fits this segment",
    "Questions should be answerable with specifics, not yes/no",
    "Surface pain points, urgency, timeline",
    "Identify if they've tried and failed with alternatives",
    "Uncover budget authority and decision-making"
  ],

  "key_messaging": {
    "message": "3-4 sentence core message capturing entire value prop",
    "persona_specific": [
      {
        "persona": "VP RevOps",
        "message": "One sentence using their named value props"
      }
    ]
  },

  "outreach_sequences": {
    "email_sequence": {
      "email_1_diagnosis": {
        "subject": "Pattern-interrupt subject referencing specific pain",
        "body": "3-4 sentences: Observation → Name problem → Why conventional fails → Soft CTA"
      },
      "email_2_proof": {
        "subject": "Reference a result or insight",
        "body": "3-4 sentences: Case study → Connect to situation → Build credibility → Stronger CTA"
      },
      "email_3_direct_ask": {
        "subject": "Direct, clear",
        "body": "2-3 sentences: Acknowledge busy → State value prop → Meeting request"
      }
    },
    "linkedin_sequence": {
      "connection_request": "Under 300 characters, non-salesy",
      "follow_up_message": "Under 500 characters, value-first"
    },
    "cold_call_framework": {
      "opener": "Permission-based, 2 sentences max",
      "pain_probe_questions": [
        "Question to uncover pain",
        "Follow-up question",
        "Deeper question"
      ],
      "value_statement_15sec": "Tailored pitch for this segment",
      "common_objections": {
        "Not interested": "Response",
        "Already have a solution": "Response",
        "Send me info": "Response"
      },
      "close": "Meeting request close"
    }
  }
}
</output_requirements>

<quality_standards>
- All messaging must sound human and conversational, not templated
- Named value props must be memorable and use the prospect's internal language
- Use memorable names like "The Hybrid Hiring Trap", "Attribution Reportability Crisis"
- Insights must demonstrate genuine understanding, not surface-level observations
- Questions must reveal qualification, not just check boxes
- Everything must be specific to ${this.config.domain}'s actual offering
- No placeholder text in final output
- If information is unavailable, state assumptions explicitly
</quality_standards>

<constraints>
- Do NOT generate generic content that could apply to any company
- Do NOT use filler phrases like "leverage synergies" or "drive value"
- Do NOT create personas that don't map to real buyer roles
- Do NOT skip any section of the output structure
- Do NOT write emails longer than 100 words
- Every named value prop MUST have a memorable, quotable name
</constraints>

Return ONLY valid JSON matching the exact structure above.`;
  }

  /**
   * Get playbook type-specific instructions
   */
  private getPlaybookTypeInstructions(): string {
    const instructions: Record<PlaybookType, string> = {
      practitioner: `
**Practitioner Playbook Focus:**
- Focus on a specific role/function (e.g., "RevOps teams needing technical execution")
- Deep dive into that persona's daily challenges, KPIs, and pressures
- Map value props to their specific operational pain points
- Qualifying questions should reveal if they match this practitioner profile`,

      sector: `
**Sector Playbook Focus:**
- Focus on a specific industry vertical (e.g., "Healthcare SaaS companies")
- Research industry-specific regulations, buying cycles, and terminology
- Identify sector-specific pain points and compliance requirements
- Use industry language and reference relevant sector trends`,

      milestone: `
**Milestone Playbook Focus:**
- Focus on companies hitting a specific trigger/signal (e.g., "Just raised Series B")
- Research what challenges emerge at this milestone
- Identify the urgency and timeline pressures they face
- Position solution as addressing milestone-specific scaling needs`,

      competitive: `
**Competitive Playbook Focus:**
- Focus on displacing a specific competitor
- Research the competitor's weaknesses and common complaints
- Identify switching triggers and migration pain points
- Build battlecard-style messaging for head-to-head positioning`,

      account: `
**Account Playbook Focus:**
- Focus on a specific named company
- Research their tech stack, recent news, org structure, and initiatives
- Identify specific people to target and their likely priorities
- Hyper-personalize all messaging to their exact situation`,
    };

    return instructions[this.config.playbook_type];
  }

  /**
   * Get system prompt
   */
  private getSystemPrompt(): string {
    return `You are an expert GTM strategist specializing in creating Octave-style sales playbooks.

Your expertise:
- Identifying acute operational pain points
- Creating memorable "named pain" patterns (like "The Hybrid Hiring Trap")
- Explaining why conventional solutions fail
- Crafting human, conversational messaging
- Building tactical sales execution playbooks

Your output must be:
- Specific to the company being analyzed
- Actionable for sales reps immediately
- Grounded in real research data
- Using the prospect's internal language
- Free of generic consultant-speak

Return ONLY valid JSON. No markdown formatting, no code blocks, just pure JSON.`;
  }

  /**
   * Parse the AI response into playbook structure
   */
  private parsePlaybookResponse(response: string): OctavePlaybook {
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = response.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      const jsonString = jsonMatch ? jsonMatch[1] : response;

      const parsed = JSON.parse(jsonString);

      // Add metadata
      return {
        ...parsed,
        metadata: {
          generated_at: new Date().toISOString(),
          company_domain: this.config.domain,
          research_sources: this.researchData.raw_sources,
          assumptions: this.extractAssumptions(),
        },
      };
    } catch (error) {
      logger.error('Failed to parse playbook response as JSON', error);
      logger.debug('Raw response:', response.substring(0, 500));
      throw new Error(
        'Failed to parse AI response. Please try again or check the logs.'
      );
    }
  }

  /**
   * Extract assumptions made during analysis
   */
  private extractAssumptions(): string[] {
    const assumptions: string[] = [];

    if (!this.researchData.company_info?.parsed) {
      assumptions.push('Limited company information available - some details inferred');
    }

    if (this.config.playbook_type === 'account') {
      assumptions.push('Account-specific playbook based on publicly available information');
    }

    if (this.config.playbook_type === 'competitive') {
      assumptions.push('Competitive intelligence based on publicly available data');
    }

    return assumptions;
  }
}
