import { AIClient } from '../utils/ai-client';
import { logger } from '../utils/logger';
import {
  GTMPlaybook,
  ResearchData,
  AnalysisConfig,
  CompanyProfile,
  ICPSegment,
  BuyerPersona,
  UseCase,
  CompetitivePositioning,
  QualificationFramework,
  OutboundMotion,
  ImplementationRoadmap,
} from '../types';

export class GTMAnalyzer {
  private aiClient: AIClient;
  private config: AnalysisConfig;
  private researchData!: ResearchData;

  constructor(config: AnalysisConfig, aiClient?: AIClient) {
    this.aiClient = aiClient || new AIClient();
    this.config = config;
  }

  /**
   * Main analysis orchestrator
   */
  async analyzeAndGeneratePlaybook(researchData: ResearchData): Promise<GTMPlaybook> {
    this.researchData = researchData;

    logger.section('Generating GTM Playbook');

    // Generate each section of the playbook
    logger.info('Generating company profile...');
    const companyProfile = await this.generateCompanyProfile();

    logger.info('Generating ICP segments...');
    const icpSegments = await this.generateICPSegments();

    logger.info('Generating buyer personas...');
    const buyerPersonas = await this.generateBuyerPersonas();

    logger.info('Generating use cases...');
    const useCases = await this.generateUseCases();

    logger.info('Generating value propositions...');
    const valuePropositions = await this.generateValuePropositions(buyerPersonas);

    logger.info('Generating competitive positioning...');
    const competitivePositioning = await this.generateCompetitivePositioning();

    logger.info('Generating messaging playbooks...');
    const messagingPlaybooks = await this.generateMessagingPlaybooks(
      buyerPersonas,
      useCases
    );

    logger.info('Generating qualification framework...');
    const qualificationFramework = await this.generateQualificationFramework();

    logger.info('Generating outbound motion strategy...');
    const outboundMotion = await this.generateOutboundMotion();

    logger.info('Generating implementation roadmap...');
    const implementationRoadmap = await this.generateImplementationRoadmap();

    logger.success('GTM Playbook generation completed');

    return {
      company_profile: companyProfile,
      icp_segments: icpSegments,
      buyer_personas: buyerPersonas,
      use_cases: useCases,
      value_propositions: valuePropositions,
      competitive_positioning: competitivePositioning,
      messaging_playbooks: messagingPlaybooks,
      qualification_framework: qualificationFramework,
      outbound_motion: outboundMotion,
      implementation_roadmap: implementationRoadmap,
      metadata: {
        generated_at: new Date().toISOString(),
        research_sources: researchData.raw_sources,
        assumptions: this.extractAssumptions(),
      },
    };
  }

  /**
   * Generate company profile
   */
  private async generateCompanyProfile(): Promise<CompanyProfile> {
    const prompt = `Based on the following research data, generate a comprehensive company profile:

${JSON.stringify(this.researchData.company_info, null, 2)}

Generate a company profile with:
- company_name
- domain: ${this.config.domain}
- one_liner (single sentence describing what they do)
- category (primary product category)
- business_model (B2B SaaS, B2B Services, Marketplace, etc.)
- stage (Startup, Growth, Scale, Enterprise)
- primary_offering (core product/service)
- key_differentiators (array of 3-5 items)

Return ONLY valid JSON matching this exact structure.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are a GTM strategist analyzing company profiles. Return only valid JSON.'
    );

    return this.parseJSONResponse<CompanyProfile>(response);
  }

  /**
   * Generate ICP segments
   */
  private async generateICPSegments(): Promise<ICPSegment[]> {
    const prompt = `Based on this research data, identify 2-4 ideal customer profile (ICP) segments:

Company Info: ${JSON.stringify(this.researchData.company_info, null, 2)}
Customer Intelligence: ${JSON.stringify(this.researchData.customer_intelligence, null, 2)}
Market Trends: ${JSON.stringify(this.researchData.market_trends, null, 2)}

For each ICP segment, provide:
- segment_name (descriptive name)
- company_characteristics:
  - industry (array of target industries)
  - company_size (employee range)
  - revenue_range (if applicable)
  - tech_maturity (Low/Medium/High)
  - geographic_focus (array of regions)
- buying_triggers (array of 3-5 events that create urgency)
- disqualifiers (array of red flags)
- qualification_criteria:
  - must_have (array)
  - nice_to_have (array)

Return ONLY a valid JSON array of ICP segments.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are an expert in ICP development for B2B sales. Create detailed, actionable ICP segments. Return only valid JSON.'
    );

    return this.parseJSONResponse<ICPSegment[]>(response);
  }

  /**
   * Generate buyer personas
   */
  private async generateBuyerPersonas(): Promise<BuyerPersona[]> {
    const prompt = `Based on this research, create 3-5 detailed buyer personas:

Company Info: ${JSON.stringify(this.researchData.company_info, null, 2)}
Customer Intelligence: ${JSON.stringify(this.researchData.customer_intelligence, null, 2)}

For each persona, provide:
- persona_name (title-based, e.g., "The Growth-Focused VP Sales")
- job_titles (array of 3-5 relevant titles)
- reports_to (typical manager's title)
- department
- responsibilities (array of key responsibilities)
- goals_and_kpis (array of what they're measured on)
- pain_points (array of objects with pain, intensity [High/Medium/Low], current_solution)
- objections (array of objects with objection and response)
- information_sources (array of where they get information)
- buying_role (Decision Maker/Influencer/Champion/End User)
- messaging_tone (Professional/Casual/Technical/Executive)

Return ONLY a valid JSON array of buyer personas.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are an expert in B2B buyer persona development. Create realistic, detailed personas. Return only valid JSON.',
      { maxTokens: 16000 }
    );

    return this.parseJSONResponse<BuyerPersona[]>(response);
  }

  /**
   * Generate use cases
   */
  private async generateUseCases(): Promise<UseCase[]> {
    const prompt = `Based on this research, create 5-8 specific use cases:

Company Info: ${JSON.stringify(this.researchData.company_info, null, 2)}
Customer Intelligence: ${JSON.stringify(this.researchData.customer_intelligence, null, 2)}

For each use case, provide:
- use_case_name (descriptive name)
- problem_statement (specific problem this solves)
- current_state (how prospects handle this today)
- desired_state (what success looks like)
- primary_persona (which persona cares most)
- value_drivers (array of objects with driver and quantification)
- proof_points (array of evidence/examples)
- competitive_alternative (what they'd use instead)

Return ONLY a valid JSON array of use cases.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are an expert in product marketing and use case development. Create specific, compelling use cases. Return only valid JSON.',
      { maxTokens: 16000 }
    );

    return this.parseJSONResponse<UseCase[]>(response);
  }

  /**
   * Generate value propositions
   */
  private async generateValuePropositions(personas: BuyerPersona[]): Promise<any> {
    const prompt = `Based on this research and personas, create value propositions:

Company Info: ${JSON.stringify(this.researchData.company_info, null, 2)}
Personas: ${JSON.stringify(personas.map((p) => ({ name: p.persona_name, role: p.buying_role })), null, 2)}

Generate:
1. Core value proposition:
   - headline (10 words or less)
   - subheadline (20 words or less)
   - proof_statement (evidence-backed claim)

2. Persona-specific value props (one for each persona):
   - persona (persona name)
   - value_prop (tailored value prop)
   - key_metric (the number they care about)
   - before_after:
     - before (their world without product)
     - after (their world with product)

Return ONLY valid JSON with structure: { core: {...}, persona_specific: [...] }`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are an expert in value proposition development. Create compelling, specific value props. Return only valid JSON.'
    );

    return this.parseJSONResponse<any>(response);
  }

  /**
   * Generate competitive positioning
   */
  private async generateCompetitivePositioning(): Promise<CompetitivePositioning> {
    const prompt = `Based on this competitive research, generate positioning:

Competitive Landscape: ${JSON.stringify(this.researchData.competitive_landscape, null, 2)}
Company Info: ${JSON.stringify(this.researchData.company_info, null, 2)}

Generate:
1. positioning_statement (following format: "For [target] who [need], [Company] is the [category] that [benefit] unlike [alternatives] because [differentiator]")

2. competitive_matrix (object with 3-5 competitors as keys, each containing):
   - name
   - positioning (how they position themselves)
   - strengths (array)
   - weaknesses (array)
   - when_we_win (scenarios where we beat them)
   - when_we_lose (scenarios where they beat us)
   - battlecard_talking_points (array of 3-5 points)

Return ONLY valid JSON.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are an expert in competitive intelligence and positioning. Create factual, strategic analysis. Return only valid JSON.',
      { maxTokens: 16000 }
    );

    return this.parseJSONResponse<CompetitivePositioning>(response);
  }

  /**
   * Generate messaging playbooks
   */
  private async generateMessagingPlaybooks(
    personas: BuyerPersona[],
    useCases: UseCase[]
  ): Promise<any> {
    const prompt = `Generate ready-to-use messaging playbooks for these personas and use cases:

Personas: ${JSON.stringify(personas.map((p) => ({ name: p.persona_name, tone: p.messaging_tone, pain_points: p.pain_points.slice(0, 2) })), null, 2)}

Use Cases: ${JSON.stringify(useCases.map((u) => ({ name: u.use_case_name, problem: u.problem_statement })), null, 2)}

Company: ${this.config.domain}

Generate (for 2-3 key personas):

1. email_sequences (array of sequences):
   - persona
   - sequence_name
   - use_case_focus
   - touch_1, touch_2, touch_3 (each with: channel, timing, subject_line, preview_text, body, cta)

2. linkedin_messages (array):
   - persona
   - connection_request (under 300 chars)
   - follow_up_message (under 500 chars)

3. cold_call_scripts (array):
   - persona
   - opener (2 sentences max)
   - pain_probe_questions (array of 3-4)
   - value_statement (15 seconds)
   - objection_handlers (object with common objections)
   - close (meeting request)

Keep messaging human, specific to the company, not generic templates.
Return ONLY valid JSON.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are an expert sales copywriter. Create compelling, personalized messaging that sounds human. Return only valid JSON.',
      { maxTokens: 16000 }
    );

    return this.parseJSONResponse<any>(response);
  }

  /**
   * Generate qualification framework
   */
  private async generateQualificationFramework(): Promise<QualificationFramework> {
    const prompt = `Based on this research, create a lead qualification framework:

Company Info: ${JSON.stringify(this.researchData.company_info, null, 2)}
Customer Intelligence: ${JSON.stringify(this.researchData.customer_intelligence, null, 2)}

Generate:
- qualification_model (BANT/MEDDIC/SPICED/Custom)
- criteria (array of 5-7 qualification criteria):
  - criterion (name)
  - question (discovery question to ask)
  - good_answer (what indicates qualification)
  - red_flag (what indicates disqualification)
  - weight (1-5 importance score)
- scoring:
  - qualified (score threshold)
  - nurture (score range like "10-15")
  - disqualified (score threshold)

Return ONLY valid JSON.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are an expert in sales qualification frameworks. Create actionable criteria. Return only valid JSON.'
    );

    return this.parseJSONResponse<QualificationFramework>(response);
  }

  /**
   * Generate outbound motion strategy
   */
  private async generateOutboundMotion(): Promise<OutboundMotion> {
    const prompt = `Based on all the research, recommend an outbound motion strategy:

Company: ${this.config.domain}
Research: ${JSON.stringify({ company: this.researchData.company_info, customers: this.researchData.customer_intelligence }, null, 2)}

Generate:
- recommended_approach (2-3 paragraphs on how to structure outbound, which personas to prioritize, which use cases to lead with)
- priority_plays (object with 2-3 plays as keys like "play_1", each containing):
  - name
  - target (segment + persona)
  - trigger (what initiates this play)
  - sequence (recommended channel sequence)
  - expected_conversion (benchmark)
- signals_to_monitor (array of 3-5):
  - signal (buying signal)
  - source (where to find it)
  - action (what to do when detected)

Return ONLY valid JSON.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are an expert in outbound sales strategy. Provide actionable, strategic recommendations. Return only valid JSON.'
    );

    return this.parseJSONResponse<OutboundMotion>(response);
  }

  /**
   * Generate implementation roadmap
   */
  private async generateImplementationRoadmap(): Promise<ImplementationRoadmap> {
    const prompt = `Create an implementation roadmap for rolling out this GTM strategy:

Generate:
- week_1:
  - focus (primary focus)
  - deliverables (array of 2-4 items)
- week_2_4:
  - focus
  - deliverables (array of 3-5 items)
- month_2_onwards:
  - focus (optimization and scaling)
  - metrics_to_track (array of key metrics)

Return ONLY valid JSON.`;

    const response = await this.aiClient.generateCompletion(
      prompt,
      'You are a GTM implementation expert. Create a practical, phased rollout plan. Return only valid JSON.'
    );

    return this.parseJSONResponse<ImplementationRoadmap>(response);
  }

  /**
   * Parse JSON response from AI
   */
  private parseJSONResponse<T>(response: string): T {
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = response.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }

      // Try parsing the entire response
      return JSON.parse(response);
    } catch (error) {
      logger.error('Failed to parse JSON response', error);
      logger.debug('Raw response:', response);
      throw new Error('Failed to parse AI response as JSON');
    }
  }

  /**
   * Extract assumptions made during analysis
   */
  private extractAssumptions(): string[] {
    const assumptions: string[] = [];

    if (!this.researchData.company_info?.parsed) {
      assumptions.push('Limited company information available - some details may be inferred');
    }

    if (!this.researchData.competitive_landscape?.parsed) {
      assumptions.push('Competitive landscape partially inferred from available data');
    }

    if (!this.researchData.customer_intelligence?.parsed) {
      assumptions.push('Customer profiles developed based on typical patterns in this market');
    }

    return assumptions;
  }
}
