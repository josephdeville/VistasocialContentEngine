# GTM Context Engine - Prompt Template

This template shows how to use the GTM Context Engine with various customization options.

## Basic Analysis

```bash
gtm analyze example.com
```

## Industry-Focused Analysis

To tailor the analysis for a specific industry:

```bash
gtm analyze example.com --industry healthcare
```

**Available Industry Focuses:**
- Healthcare
- Financial Services
- Manufacturing
- Retail & E-commerce
- Technology/SaaS
- Education
- Real Estate
- Professional Services

## Competitive Analysis

To focus positioning against a specific competitor:

```bash
gtm analyze example.com --competitor competitor.com
```

This will generate:
- Head-to-head battlecards
- Displacement messaging
- Win/loss scenarios
- Differentiation talking points

## Persona Deep Dive

To generate additional depth for a specific persona:

```bash
gtm analyze example.com --persona "VP of Sales"
```

Additional details include:
- Day-in-the-life narrative
- Tool stack they likely use
- LinkedIn groups/communities
- Content topics that resonate
- Buying committee influence map

## Output Format Options

### YAML (Default)
Best for: CRM imports, automation, structured data

```bash
gtm analyze example.com --format yaml
```

### Markdown
Best for: Team sharing, documentation, presentations

```bash
gtm analyze example.com --format markdown
```

### JSON
Best for: API integration, programmatic access

```bash
gtm analyze example.com --format json
```

## Model Selection

### Claude Sonnet (Default)
Fast and cost-effective for most analyses

```bash
gtm analyze example.com --model claude-sonnet-4-5-20250929
```

### Claude Opus
Most powerful, for complex competitive landscapes or niche markets

```bash
gtm analyze example.com --model claude-opus-4-5-20251101
```

## Combined Options

```bash
# Healthcare SaaS company, positioning against competitor, markdown output
gtm analyze example.com \
  --industry healthcare \
  --competitor competitor.com \
  --format markdown \
  --verbose

# Deep persona analysis with JSON output
gtm analyze example.com \
  --persona "Chief Technology Officer" \
  --format json \
  --model claude-opus-4-5-20251101
```

## Environment Variables

For repeated use, set environment variables:

```bash
# Set defaults
export OUTPUT_FORMAT=markdown
export OUTPUT_DIR=~/gtm-playbooks
export ANTHROPIC_MODEL=claude-sonnet-4-5-20250929

# Now run with defaults
gtm analyze example.com
```

## Programmatic Usage

For integration into your own applications:

```typescript
import { GTMOrchestrator, AnalysisConfig } from 'claude-gtm-engine';

const config: AnalysisConfig = {
  domain: 'example.com',
  output_format: 'json',
  industry_focus: 'healthcare',
  competitor_focus: 'competitor.com',
  model: 'claude-sonnet-4-5-20250929'
};

const orchestrator = new GTMOrchestrator(config);
const { playbook, outputPath } = await orchestrator.execute();

// Access playbook data
console.log(playbook.buyer_personas);
console.log(playbook.messaging_playbooks);
```

## Tips for Best Results

1. **Use exact domains** - `stripe.com` not `www.stripe.com`
2. **Enable verbose mode** - See research progress with `--verbose`
3. **Start broad, then narrow** - First run basic analysis, then add industry/competitor focus
4. **Iterate on messaging** - Generated content is a starting point; customize for your brand
5. **Validate assumptions** - Review metadata section for assumptions made during analysis

## Common Use Cases

### New Market Entry
```bash
gtm analyze target-company.com --industry target-vertical --verbose
```

### Competitive Displacement
```bash
gtm analyze our-company.com --competitor main-competitor.com --format markdown
```

### Persona Research
```bash
gtm analyze customer-company.com --persona "VP Engineering" --format json
```

### Sales Enablement
```bash
gtm analyze prospect-company.com --format yaml
# Import YAML into CRM for sales team access
```

## Output Files

Generated playbooks are saved to:
```
outputs/gtm-playbook-{domain}-{date}.{format}
```

Example:
```
outputs/gtm-playbook-stripe-com-2025-12-16.yaml
outputs/gtm-playbook-notion-so-2025-12-16.md
outputs/gtm-playbook-salesforce-com-2025-12-16.json
```
