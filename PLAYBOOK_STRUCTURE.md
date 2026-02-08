# GTM Playbook Structure

## Strategic GTM Analysis - 10 Comprehensive Sections

The `gtm analyze` command generates a comprehensive, company-wide Go-To-Market strategy with **10 strategic sections**. This is **NOT** a git time metrics tool - it's a strategic sales intelligence platform.

### Overview

Input: Company domain (e.g., `stripe.com`)
Output: Complete GTM playbook with 10 detailed sections
Purpose: Generate actionable sales strategies, messaging, and implementation plans

---

## The 10 Sections

### 1. Company Profile
**What it provides:**
- Company name and domain
- One-line value proposition
- Primary product category
- Business model (B2B SaaS, Services, etc.)
- Company stage (Startup, Growth, Scale, Enterprise)
- Primary offering
- 3-5 key differentiators

**Implementation:** `src/modules/gtm-analyzer.ts:93-116`

---

### 2. ICP Segments (Ideal Customer Profiles)
**What it provides:**
- 2-4 distinct customer segments
- Company characteristics per segment:
  - Target industries
  - Company size ranges
  - Revenue ranges
  - Technology maturity level
  - Geographic focus
- Buying triggers that create urgency
- Disqualification criteria (red flags)
- Must-have and nice-to-have qualification criteria

**Implementation:** `src/modules/gtm-analyzer.ts:121-150`

---

### 3. Buyer Personas
**What it provides:**
- 3-5 detailed buyer personas
- Job titles and reporting structure
- Department and responsibilities
- Goals and KPIs they're measured on
- Pain points with intensity ratings and current solutions
- Common objections with suggested responses
- Information sources (where they research)
- Buying role (Decision Maker, Influencer, Champion, End User)
- Messaging tone preference

**Implementation:** `src/modules/gtm-analyzer.ts:155-183`

---

### 4. Use Cases
**What it provides:**
- 5-8 specific, actionable use cases
- Problem statement for each use case
- Current state (how prospects handle it today)
- Desired state (what success looks like)
- Primary persona who cares most
- Value drivers with quantification
- Proof points and evidence
- Competitive alternatives

**Implementation:** `src/modules/gtm-analyzer.ts:188-213`

---

### 5. Value Propositions
**What it provides:**
- Core value proposition:
  - Headline (10 words or less)
  - Subheadline (20 words or less)
  - Proof statement (evidence-backed claim)
- Persona-specific value propositions:
  - Tailored value prop per persona
  - Key metric each persona cares about
  - Before/after transformation

**Implementation:** `src/modules/gtm-analyzer.ts:218-246`

---

### 6. Competitive Positioning
**What it provides:**
- Positioning statement (structured format)
- Competitive matrix with 3-5 key competitors:
  - How they position themselves
  - Their strengths and weaknesses
  - When you win vs. when you lose
  - Battlecard talking points (3-5 per competitor)

**Implementation:** `src/modules/gtm-analyzer.ts:251-278`

---

### 7. Messaging Playbooks
**What it provides:**
- Ready-to-use email sequences:
  - 3-touch sequences for key personas
  - Subject lines, preview text, body copy, CTAs
  - Timing recommendations
- LinkedIn messages:
  - Connection requests (under 300 chars)
  - Follow-up messages (under 500 chars)
- Cold call scripts:
  - Opening statements (2 sentences max)
  - Pain probe questions (3-4 per persona)
  - 15-second value statements
  - Objection handlers with responses
  - Meeting request closes

**Implementation:** `src/modules/gtm-analyzer.ts:283-326`

---

### 8. Qualification Framework
**What it provides:**
- Qualification model (BANT/MEDDIC/SPICED/Custom)
- 5-7 qualification criteria:
  - Discovery questions to ask
  - What indicates qualification
  - Red flags for disqualification
  - Weight/importance scores (1-5)
- Scoring thresholds:
  - Qualified score
  - Nurture score range
  - Disqualified score

**Implementation:** `src/modules/gtm-analyzer.ts:331-358`

---

### 9. Outbound Motion Strategy
**What it provides:**
- Strategic recommendations (2-3 paragraphs):
  - How to structure outbound efforts
  - Which personas to prioritize
  - Which use cases to lead with
- 2-3 priority plays:
  - Target segment + persona
  - Triggering events
  - Recommended channel sequence
  - Expected conversion benchmarks
- Buying signals to monitor:
  - What signals indicate buying intent
  - Where to find these signals
  - What action to take when detected

**Implementation:** `src/modules/gtm-analyzer.ts:363-390`

---

### 10. Implementation Roadmap
**What it provides:**
- Week 1 plan:
  - Primary focus
  - 2-4 key deliverables
- Weeks 2-4 plan:
  - Focus areas
  - 3-5 deliverables
- Month 2+ plan:
  - Optimization and scaling focus
  - Key metrics to track

**Implementation:** `src/modules/gtm-analyzer.ts:395-417`

---

## Output Formats

The complete playbook can be generated in three formats:

1. **YAML** (default) - Structured, machine-readable, CRM-friendly
2. **Markdown** - Human-readable, shareable with teams
3. **JSON** - API-compatible, programmable

## Usage Examples

```bash
# Basic strategic analysis
gtm analyze stripe.com

# Industry-focused
gtm analyze salesforce.com --industry healthcare

# Competitive positioning
gtm analyze asana.com --competitor monday.com

# Custom format
gtm analyze notion.so --format markdown

# Verbose output
gtm analyze figma.com --verbose
```

## Key Differentiators

This is **NOT**:
- ❌ A git time tracking tool
- ❌ A code metrics analyzer
- ❌ A development statistics tool

This **IS**:
- ✅ A strategic GTM intelligence platform
- ✅ A comprehensive sales playbook generator
- ✅ An AI-powered market analysis tool
- ✅ A messaging and positioning framework

## Architecture

```
Research Phase → Analysis Phase → Output Phase
     ↓                ↓               ↓
  Company Info    10 Sections    YAML/MD/JSON
  Competitors     Generated      Saved to
  Customers       via AI         ./outputs/
  Market Data
```

## Metadata

Each playbook includes metadata:
- Generation timestamp
- Research sources used
- Assumptions made during analysis

This ensures transparency and allows for validation of generated content.
