# Company → Contact → Playbook Workflow

## Overview
This workflow takes a list of companies, analyzes their ICP fit, finds target personas, selects appropriate playbooks, and generates personalized outreach.

## Workflow Steps

### Step 1: Company Analysis & Playbook Selection
For each company in the CSV:

1. **Research Company**
   - Domain: Extract from CSV
   - ARR Stage: Infer from funding round data
   - Tech Stack: Check for HubSpot, Salesforce usage
   - Recent News: Funding announcements, hiring signals

2. **Determine Milestone**
   - Series A → B transition ($5-10M ARR)
   - Series B scaling ($10-20M ARR)
   - Post-Series B growth ($20M+ ARR)

3. **Select Playbook Type**
   - **Milestone**: Companies at inflection points (Series B scaling, RevOps breakdown)
   - **Practitioner**: Specific role focus (VP RevOps, Head of Growth)
   - **Sector**: Industry-specific (FinTech, HealthTech, etc.)

### Step 2: Contact Discovery
For each company, find 3 personas:

**Persona 1: Head of Growth**
- Titles: Head of Growth, VP Growth, Chief Growth Officer
- Pain Points: CAC efficiency, growth experimentation, funnel optimization
- LinkedIn search: "{Company} Head of Growth"

**Persona 2: Head of GTM / RevOps**
- Titles: Head of GTM, VP Revenue Operations, Chief Revenue Officer
- Pain Points: Sales/Marketing alignment, attribution, forecasting
- LinkedIn search: "{Company} Revenue Operations" OR "GTM"

**Persona 3: Head of Demand Gen**
- Titles: Head of Demand Generation, VP Marketing Operations, Director of Demand Gen
- Pain Points: Pipeline generation, attribution modeling, CAC optimization
- LinkedIn search: "{Company} Demand Generation"

### Step 3: Playbook Generation
Generate or select playbook based on:

**Decision Tree:**
```
IF funding_round == "Series B" AND arr_range == "$5-20M":
    → Use RevPartners Milestone Playbook (already generated)

ELIF role == "Head of Growth" AND stage == "scaling":
    → Generate Practitioner Playbook for Growth Leaders

ELIF industry == "FinTech" OR "HealthTech":
    → Generate Sector Playbook

ELSE:
    → Generate custom Milestone Playbook for their stage
```

### Step 4: Personalized Outreach
For each contact, customize using:

1. **Named Value Prop** (from playbook)
   - Match to their role
   - Example: Head of Growth → "The CAC Payback Blind Spot"

2. **Company-Specific Trigger**
   - Recent funding: "Saw you raised Series B..."
   - Recent hire: "Congrats on joining {Company}..."
   - Tech stack: "Noticed you're on HubSpot..."

3. **Role-Specific Pain**
   - Head of Growth: Growth experimentation at scale
   - Head of GTM: Sales/Marketing alignment
   - Head of Demand Gen: Attribution and pipeline visibility

### Step 5: Output Format

**CSV Output:**
```csv
Company,Domain,Funding_Round,ARR_Est,Playbook_Type,Contact_Name,Contact_Title,Contact_LinkedIn,Value_Prop,Email_Subject,Email_Body
Acme Corp,acme.com,Series B,$12M,Milestone,Sarah Chen,Head of Growth,linkedin.com/in/sarahchen,"The CAC Payback Blind Spot","Your Series B growth just got harder","{Personalized email}"
```

## Automation Sequence

```yaml
Input: companies.csv
  ↓
For each company:
  1. Research company (AI agent)
  2. Determine playbook fit (decision logic)
  3. Generate/retrieve playbook (GTM Engine)
  4. Find 3 contacts (LinkedIn/Apollo/ZoomInfo)
  5. Personalize outreach (AI + playbook)
  6. Output to enriched CSV
  ↓
Output: enriched_contacts.csv
```

## Tools Required

1. **GTM Context Engine** - Generate playbooks
2. **LinkedIn/Apollo** - Find contacts
3. **AI Personalization** - Customize outreach
4. **CSV Parser** - Read input, write output

## Example Company Processing

### Input Company: "Statsig"
```yaml
Domain: statsig.com
Funding: Series B ($43M)
Estimated ARR: $8-12M
Industry: DevTools / Feature Flags
Tech Stack: Unknown (research needed)
```

### Analysis:
- **Milestone**: Series B scaling ($10M ARR range)
- **Playbook Type**: Milestone - "Series B SaaS RevOps Scaling Wall"
- **Pain Points**:
  - Rapid product expansion = complex attribution
  - Developer tool = PLG motion = RevOps chaos
  - Series B = board pressure for efficient growth

### Contacts Found:
1. **Vijaye Raji** - Co-Founder & CEO
   - Not ideal (too senior)
2. **Head of Growth** - [To be found via LinkedIn]
3. **Head of Marketing/Demand Gen** - [To be found via LinkedIn]

### Playbook Match: RevPartners Milestone Playbook
- Value Prop: "The Series B Scaling Bottleneck"
- Outreach Angle: Post-funding scaling chaos

### Personalized Email (Head of Growth):
```
Subject: Your Series B growth metrics just got more complicated

[Name],

Congrats on the $43M Series B. I've been tracking companies at your stage
and there's a pattern: the growth motion that got you here (PLG + sales-assist)
creates attribution nightmares when you scale.

Your board wants to know CAC payback by channel, but your HubSpot/Salesforce
setup can't accurately track product-led vs sales-led attribution across
the funnel.

Most Series B companies try to hire their way out (3 RevOps roles = $450K)
or limp along with broken data. There's a third option.

Worth 15 minutes to discuss how similar-stage DevTools companies are solving this?

[Your Name]
RevPartners
```

## Next Steps

1. Provide CSV with columns: Company Name, Domain, Funding Round, Industry
2. I'll run each company through this workflow
3. Output enriched CSV with 3 contacts per company + personalized outreach
