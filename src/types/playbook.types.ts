/**
 * Octave-Style Sales Playbook Type Definitions
 */

export type PlaybookType = 'practitioner' | 'sector' | 'milestone' | 'competitive' | 'account';

export interface PlaybookConfig {
  domain: string;
  playbook_type: PlaybookType;
  target_focus: string;
  output_format?: 'markdown' | 'json';
  model?: string;
}

// Core Strategy Section
export interface CoreStrategy {
  description: string;
  executive_summary: string;
  core_tension: string;
  why_conventional_fails: string;
  what_survival_demands: string;
  the_real_challenge: string;
}

// Key Insights Section
export interface KeyInsight {
  title: string;
  content: string;
}

export interface ApproachAngle {
  lead_with: string;
  position_as: string;
  address: string;
  make_it_about: string;
}

// Value Propositions Section
export interface NamedValueProp {
  name: string;
  description: string;
}

export interface PersonaValueProps {
  persona_title: string;
  value_propositions: NamedValueProp[];
}

// Messaging Section
export interface CoreMessage {
  message: string;
  persona_specific: Array<{
    persona: string;
    message: string;
  }>;
}

// Outreach Sequences
export interface EmailTouch {
  subject: string;
  body: string;
}

export interface EmailSequence {
  email_1_diagnosis: EmailTouch;
  email_2_proof: EmailTouch;
  email_3_direct_ask: EmailTouch;
}

export interface LinkedInSequence {
  connection_request: string;
  follow_up_message: string;
}

export interface ColdCallFramework {
  opener: string;
  pain_probe_questions: string[];
  value_statement_15sec: string;
  common_objections: Record<string, string>;
  close: string;
}

export interface OutreachSequences {
  email_sequence: EmailSequence;
  linkedin_sequence: LinkedInSequence;
  cold_call_framework: ColdCallFramework;
}

// Complete Playbook Structure
export interface OctavePlaybook {
  playbook_title: string;
  playbook_type: PlaybookType;
  target_focus: string;

  core_strategy: CoreStrategy;
  key_insights: KeyInsight[];
  approach_angle: ApproachAngle;
  value_propositions_by_persona: PersonaValueProps[];
  qualifying_questions: string[];
  key_messaging: CoreMessage;
  outreach_sequences: OutreachSequences;

  metadata?: {
    generated_at: string;
    company_domain: string;
    research_sources: string[];
    assumptions: string[];
  };
}

// Research Data (reused from existing)
export interface ResearchData {
  company_info: any;
  competitive_landscape: any;
  customer_intelligence: any;
  market_trends: any;
  raw_sources: string[];
}
