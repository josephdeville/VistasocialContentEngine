/**
 * Core GTM Playbook Type Definitions
 * These types match the output structure defined in the GTM Context Engine prompt
 */

export interface CompanyProfile {
  company_name: string;
  domain: string;
  one_liner: string;
  category: string;
  business_model: string;
  stage: string;
  primary_offering: string;
  key_differentiators: string[];
}

export interface ICPSegment {
  segment_name: string;
  company_characteristics: {
    industry: string[];
    company_size: string;
    revenue_range: string;
    tech_maturity: 'Low' | 'Medium' | 'High';
    geographic_focus: string[];
  };
  buying_triggers: string[];
  disqualifiers: string[];
  qualification_criteria: {
    must_have: string[];
    nice_to_have: string[];
  };
}

export interface PainPoint {
  pain: string;
  intensity: 'High' | 'Medium' | 'Low';
  current_solution: string;
}

export interface Objection {
  objection: string;
  response: string;
}

export interface BuyerPersona {
  persona_name: string;
  job_titles: string[];
  reports_to: string;
  department: string;
  responsibilities: string[];
  goals_and_kpis: string[];
  pain_points: PainPoint[];
  objections: Objection[];
  information_sources: string[];
  buying_role: 'Decision Maker' | 'Influencer' | 'Champion' | 'End User';
  messaging_tone: 'Professional' | 'Casual' | 'Technical' | 'Executive';
}

export interface ValueDriver {
  driver: string;
  quantification: string;
}

export interface UseCase {
  use_case_name: string;
  problem_statement: string;
  current_state: string;
  desired_state: string;
  primary_persona: string;
  value_drivers: ValueDriver[];
  proof_points: string[];
  competitive_alternative: string;
}

export interface ValueProposition {
  headline: string;
  subheadline: string;
  proof_statement: string;
}

export interface PersonaValueProp {
  persona: string;
  value_prop: string;
  key_metric: string;
  before_after: {
    before: string;
    after: string;
  };
}

export interface Competitor {
  name: string;
  positioning: string;
  strengths: string[];
  weaknesses: string[];
  when_we_win: string;
  when_we_lose: string;
  battlecard_talking_points: string[];
}

export interface CompetitivePositioning {
  positioning_statement: string;
  competitive_matrix: Record<string, Competitor>;
}

export interface EmailTouch {
  channel: string;
  timing: string;
  subject_line: string;
  preview_text?: string;
  body: string;
  cta: string;
}

export interface EmailSequence {
  persona: string;
  sequence_name: string;
  use_case_focus: string;
  touch_1: EmailTouch;
  touch_2: EmailTouch;
  touch_3: EmailTouch;
}

export interface LinkedInMessages {
  persona: string;
  connection_request: string;
  follow_up_message: string;
}

export interface ColdCallScript {
  persona: string;
  opener: string;
  pain_probe_questions: string[];
  value_statement: string;
  objection_handlers: Record<string, { response: string }>;
  close: string;
}

export interface MessagingPlaybooks {
  email_sequences: EmailSequence[];
  linkedin_messages: LinkedInMessages[];
  cold_call_scripts: ColdCallScript[];
}

export interface QualificationCriterion {
  criterion: string;
  question: string;
  good_answer: string;
  red_flag: string;
  weight: number;
}

export interface QualificationFramework {
  qualification_model: string;
  criteria: QualificationCriterion[];
  scoring: {
    qualified: number;
    nurture: string;
    disqualified: number;
  };
}

export interface OutboundPlay {
  name: string;
  target: string;
  trigger: string;
  sequence: string;
  expected_conversion: string;
}

export interface BuyingSignal {
  signal: string;
  source: string;
  action: string;
}

export interface OutboundMotion {
  recommended_approach: string;
  priority_plays: Record<string, OutboundPlay>;
  signals_to_monitor: BuyingSignal[];
}

export interface RoadmapPhase {
  focus: string;
  deliverables: string[];
  metrics_to_track?: string[];
}

export interface ImplementationRoadmap {
  week_1: RoadmapPhase;
  week_2_4: RoadmapPhase;
  month_2_onwards: RoadmapPhase;
}

export interface GTMPlaybook {
  company_profile: CompanyProfile;
  icp_segments: ICPSegment[];
  buyer_personas: BuyerPersona[];
  use_cases: UseCase[];
  value_propositions: {
    core: ValueProposition;
    persona_specific: PersonaValueProp[];
  };
  competitive_positioning: CompetitivePositioning;
  messaging_playbooks: MessagingPlaybooks;
  qualification_framework: QualificationFramework;
  outbound_motion: OutboundMotion;
  implementation_roadmap: ImplementationRoadmap;
  metadata?: {
    generated_at: string;
    research_sources: string[];
    assumptions: string[];
  };
}

export interface ResearchData {
  company_info: any;
  competitive_landscape: any;
  customer_intelligence: any;
  market_trends: any;
  raw_sources: string[];
}

export interface AnalysisConfig {
  domain: string;
  industry_focus?: string;
  competitor_focus?: string;
  persona_depth?: string;
  output_format?: 'yaml' | 'markdown' | 'json';
  model?: string;
}
