# GTM Context Engine 🚀

> **AI-Powered Go-To-Market Strategy Generator**
> Analyze any company domain and generate comprehensive outbound sales strategies in minutes.

[![Built with Claude](https://img.shields.io/badge/Built%20with-Claude%20AI-blue)](https://anthropic.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

The GTM Context Engine is an intelligent platform that analyzes company domains and automatically generates battle-tested GTM playbooks. Inspired by enterprise sales intelligence platforms like Octave HQ, it combines AI-powered research with proven sales frameworks to deliver actionable strategies.

**Two Powerful Modes:**

1. **Strategic GTM Analysis** (`gtm analyze`) - Comprehensive 10-section company-wide strategy
2. **Octave Playbooks** (`gtm playbook`) - Focused, tactical sales playbooks for specific segments

### Strategic GTM Analysis

Input a company domain → Get a complete GTM playbook including:

- **ICP Segments** - Ideal customer profiles with qualification criteria
- **Buyer Personas** - Detailed personas with pain points, objections, and messaging tone
- **Use Cases** - Specific problems solved with value quantification
- **Value Propositions** - Core and persona-specific value props
- **Competitive Positioning** - Battlecards and positioning statements
- **Messaging Playbooks** - Ready-to-use email sequences, LinkedIn messages, and cold call scripts
- **Qualification Framework** - Scoring criteria for lead qualification
- **Outbound Motion** - Strategic plays with triggers and conversion expectations
- **Implementation Roadmap** - Week-by-week rollout plan

### Octave-Style Sales Playbooks

Input a company domain + playbook type + target focus → Get a tactical sales playbook including:

- **Core Strategy** - WHO this segment is, what challenges they face, why conventional solutions fail
- **Key Insights** - 5 deep insights showing genuine understanding
- **Approach Angle** - How to engage (lead with, position as, address, make it about)
- **Named Value Props** - Memorable pain names by persona (e.g., "Attribution Reportability Crisis")
- **Qualifying Questions** - 8 questions to reveal if prospect fits segment
- **Key Messaging** - Core message + persona-specific messaging
- **Outreach Sequences** - Ready-to-use email (3-touch), LinkedIn, and cold call scripts

## Quick Start

### Two Ways to Use

**1. Web Interface (Easiest)** - Beautiful UI with real-time progress tracking
**2. CLI** - Command-line interface for automation and scripting

### Prerequisites

- Node.js 18+ and npm/yarn
- Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/claude-gtm-engine.git
cd claude-gtm-engine

# Install dependencies
npm install

# Build the project
npm run build

# Set up your API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Or create a .env file
cp .env.example .env
# Edit .env and add your API key
```

### Web Interface (Recommended for First-Time Users)

```bash
# Start the web server
npm run web

# Open your browser to http://localhost:3000
```

**Features:**
- 🎨 Beautiful, modern UI
- 📊 Real-time progress tracking
- 📥 Instant playbook preview
- ⬇️ One-click download
- 🔄 No command-line knowledge needed

### CLI Usage

```bash
# Strategic GTM Analysis
npm run dev analyze stripe.com

# Octave-Style Playbook
npm run dev playbook stripe.com -- -t practitioner -f "RevOps teams needing technical execution"

# With options
npm run dev analyze notion.so -- --format markdown --verbose
npm run dev playbook salesforce.com -- -t sector -f "Healthcare SaaS" --verbose

# Using the CLI directly after build
node dist/cli.js analyze salesforce.com --industry healthcare
node dist/cli.js playbook asana.com -t competitive -f "Displacing Monday.com"
```

## Web Interface

### Starting the Web Server

```bash
npm run web
```

Then open your browser to **http://localhost:3000**

### Features

- **Dual Mode Interface**: Switch between Strategic GTM Analysis and Octave Playbooks
- **Real-Time Progress**: See live updates as your playbook generates
- **Instant Preview**: View your playbook immediately in beautiful markdown
- **One-Click Download**: Download your playbook as a markdown file
- **Form Validation**: Helpful tips and examples for each field
- **Responsive Design**: Works on desktop, tablet, and mobile

### Using the Web Interface

1. **Choose Your Mode**: Select either "Strategic GTM Analysis" or "Octave Playbook"

2. **Fill in the Form**:
   - **Analyze**: Enter company domain, optional industry/competitor focus
   - **Playbook**: Enter domain, select playbook type, describe target focus

3. **Generate**: Click the generate button

4. **Watch Progress**: See real-time updates as research and analysis happens

5. **Review & Download**: Preview your playbook and download it

### Screenshots

**Main Interface:**
- Mode selector (Analyze vs Playbook)
- Smart forms with inline help
- Progress bar with status messages
- Full playbook preview
- Download button

## CLI Commands

The GTM Context Engine provides two powerful commands:

### `gtm analyze <domain>` - Strategic GTM Analysis

Generate a comprehensive 10-section GTM strategy playbook for a company domain.

**Arguments:**
- `<domain>` - Company domain (e.g., stripe.com, notion.so)

**Options:**
- `-i, --industry <industry>` - Focus on specific industry vertical
- `-c, --competitor <domain>` - Focus positioning against specific competitor
- `-p, --persona <title>` - Generate deep dive for specific persona title
- `-f, --format <format>` - Output format: `yaml`, `markdown`, or `json` (default: yaml)
- `-m, --model <model>` - AI model to use (default: claude-sonnet-4-5-20250929)
- `-v, --verbose` - Enable verbose logging

**Examples:**

```bash
# Basic analysis
gtm analyze stripe.com

# Focus on healthcare industry
gtm analyze salesforce.com --industry healthcare

# Generate markdown output
gtm analyze notion.so --format markdown

# Competitive positioning against a specific competitor
gtm analyze asana.com --competitor monday.com

# Use more powerful model for complex analysis
gtm analyze oracle.com --model claude-opus-4-5-20251101 --verbose
```

### `gtm playbook <domain>` - Octave-Style Sales Playbooks

Generate focused, tactical sales playbooks using Octave HQ's proven methodology.

**Arguments:**
- `<domain>` - Company domain (e.g., stripe.com, notion.so)

**Required Options:**
- `-t, --type <type>` - Playbook type: `practitioner`, `sector`, `milestone`, `competitive`, or `account`
- `-f, --focus <focus>` - Target focus description (e.g., "RevOps teams needing technical execution")

**Optional:**
- `--format <format>` - Output format: `markdown` or `json` (default: markdown)
- `-m, --model <model>` - AI model to use (default: claude-sonnet-4-5-20250929)
- `-v, --verbose` - Enable verbose logging

**Playbook Types:**

1. **Practitioner** - Target specific roles/personas
   ```bash
   gtm playbook stripe.com -t practitioner -f "RevOps teams struggling with attribution"
   ```

2. **Sector** - Target specific industries
   ```bash
   gtm playbook salesforce.com -t sector -f "Healthcare technology companies"
   ```

3. **Milestone** - Target companies hitting specific triggers
   ```bash
   gtm playbook asana.com -t milestone -f "Companies that just raised Series B"
   ```

4. **Competitive** - Position against specific competitors
   ```bash
   gtm playbook notion.so -t competitive -f "Displacing Confluence and wikis"
   ```

5. **Account** - Hyper-specific for named accounts
   ```bash
   gtm playbook zoom.us -t account -f "Zoom Video Communications"
   ```

**What You Get:**

Octave-style playbooks include:
- **Core Strategy** - Description, executive summary, and 4 strategic paragraphs
- **Key Insights** - 5 deep insights demonstrating understanding
- **Approach Angle** - Tactical engagement strategy (lead with, position as, address, make it about)
- **Named Value Props** - Memorable pain names by persona (e.g., "The Hybrid Hiring Trap")
- **Qualifying Questions** - 8 discovery questions
- **Key Messaging** - Core message + persona-specific messaging
- **Outreach Sequences** - Email (3-touch), LinkedIn, and cold call scripts

### `gtm init`

Display setup instructions and configuration options.

```bash
gtm init
```

## Configuration

Configure the engine via environment variables or `.env` file:

```bash
# Required
ANTHROPIC_API_KEY=your_api_key_here

# Optional
ANTHROPIC_MODEL=claude-sonnet-4-5-20250929  # AI model
OUTPUT_FORMAT=yaml                            # yaml, markdown, or json
OUTPUT_DIR=./outputs                          # Output directory
MAX_CONCURRENT_REQUESTS=3                     # Rate limiting
```

## Output Structure

The GTM playbook is generated in your chosen format with this structure:

```
outputs/
  └── gtm-playbook-{domain}-{date}.yaml
```

### Sample Output Sections

#### 1. Company Profile
```yaml
company_name: Stripe
domain: stripe.com
one_liner: Payment infrastructure for the internet
category: Payment Processing
business_model: B2B SaaS
stage: Scale
primary_offering: Payment API and financial services
key_differentiators:
  - Developer-first API design
  - Global payment support
  - Comprehensive financial tooling
```

#### 2. ICP Segments
```yaml
segment_name: Fast-Growing SaaS Companies
company_characteristics:
  industry: [SaaS, E-commerce, Marketplaces]
  company_size: 50-500 employees
  revenue_range: $5M-$50M ARR
  tech_maturity: High
  geographic_focus: [North America, Europe]
buying_triggers:
  - Scaling payment operations beyond 1000 transactions/day
  - Expanding to international markets
  - Replacing legacy payment infrastructure
```

#### 3. Buyer Personas
```yaml
persona_name: The Growth-Focused VP Sales
job_titles:
  - VP of Sales
  - Chief Revenue Officer
  - Head of Revenue Operations
pain_points:
  - pain: Manual deal tracking consuming 10+ hours per week
    intensity: High
    current_solution: Spreadsheets and fragmented tools
```

#### 4. Messaging Playbooks

**Email Sequence Example:**
```yaml
touch_1:
  subject_line: "Quick question about [Company]'s payment stack"
  body: |
    Hi [First Name],

    I noticed [Company] recently expanded to Europe—congrats on the growth!

    Quick question: how are you handling multi-currency payments and local
    payment methods? Most companies at your stage hit friction with their
    current processor around 5K transactions/day.

    Worth a 15-min conversation?
  cta: "Open to a brief call this week?"
```

## Programmatic Usage

Use the GTM Engine in your own applications:

```typescript
import { GTMOrchestrator, AnalysisConfig } from 'claude-gtm-engine';

const config: AnalysisConfig = {
  domain: 'stripe.com',
  output_format: 'json',
  industry_focus: 'fintech',
};

const orchestrator = new GTMOrchestrator(config);
const { playbook, outputPath } = await orchestrator.execute();

console.log('Generated playbook:', playbook);
console.log('Saved to:', outputPath);
```

## Architecture

```
src/
├── types/              # TypeScript type definitions
│   └── gtm.types.ts   # GTM playbook structure
├── utils/              # Utility modules
│   ├── config.ts      # Configuration loader
│   ├── logger.ts      # Logging utilities
│   └── ai-client.ts   # Anthropic API client
├── modules/            # Core modules
│   ├── researcher.ts       # Company research & web search
│   ├── gtm-analyzer.ts     # AI-powered GTM analysis
│   ├── output-formatter.ts # Output generation
│   └── orchestrator.ts     # Main orchestrator
├── cli.ts              # CLI interface
└── index.ts            # Main entry point
```

## How It Works

### 1. Research Phase

The engine conducts comprehensive research across multiple dimensions:

**Company Deep Dive:**
- Products, services, and features
- Pricing and business model
- Company size, funding, and growth
- Technology stack
- Recent news and launches

**Competitive Analysis:**
- Direct and indirect competitors
- Market positioning
- Competitive advantages/weaknesses
- Industry trends

**Customer Intelligence:**
- Current customer base
- Success stories and testimonials
- Common pain points
- Target industries and verticals

### 2. Analysis Phase

Using Claude AI, the engine synthesizes research into:

- **ICP Segments** - Identifies 2-4 ideal customer profiles
- **Buyer Personas** - Creates 3-5 detailed personas
- **Use Cases** - Develops 5-8 specific use cases
- **Value Props** - Generates core and persona-specific propositions
- **Competitive Positioning** - Builds battlecards and positioning
- **Messaging** - Creates email, LinkedIn, and call scripts
- **Qualification** - Develops scoring framework
- **Strategy** - Recommends outbound motion and plays

### 3. Output Phase

The playbook is formatted and saved in your chosen format:

- **YAML** - Structured, machine-readable
- **Markdown** - Human-readable, shareable
- **JSON** - API-compatible, programmable

## Use Cases

### For Sales Teams
- Generate messaging for new market segments
- Create persona-based email campaigns
- Develop competitive battlecards
- Build qualification frameworks

### For Marketing Teams
- Develop positioning statements
- Create persona-based content strategies
- Identify key value propositions
- Plan market entry strategies

### For Founders
- Understand target customer profiles
- Develop go-to-market strategy
- Create initial sales playbooks
- Analyze competitive landscape

### For Agencies
- Accelerate client onboarding
- Generate market intelligence
- Create campaign strategies
- Deliver strategic consulting

## Advanced Features

### Industry-Focused Analysis

Target specific verticals:

```bash
gtm analyze salesforce.com --industry healthcare
```

This tailors all personas, messaging, and use cases to the specified industry.

### Competitive Positioning

Focus on a specific competitor:

```bash
gtm analyze asana.com --competitor monday.com
```

Generates displacement messaging and head-to-head battlecards.

### Model Selection

Choose the AI model based on your needs:

```bash
# Faster, cost-effective (default)
gtm analyze company.com --model claude-sonnet-4-5-20250929

# Most powerful, for complex analysis
gtm analyze company.com --model claude-opus-4-5-20251101
```

## Best Practices

### 1. Research Quality
- Use the exact company domain (not www or subdomains)
- For better results, analyze well-established companies with public information
- Enable `--verbose` to see research progress

### 2. Output Customization
- Use YAML for CRM imports and automation
- Use Markdown for team sharing and documentation
- Use JSON for programmatic access

### 3. Iteration
- Start with basic analysis
- Refine with industry or competitor focus
- Generate multiple versions for different segments

### 4. Implementation
- Review and customize messaging for your brand voice
- Validate personas against actual customer data
- Test qualification criteria with your sales team
- Implement plays iteratively, starting with highest priority

## API Integration

### Search API (Optional)

For production use, integrate with a professional search API:

1. **Google Custom Search API**
   - Best for comprehensive results
   - Requires API key and Search Engine ID

2. **SerpAPI**
   - Easy integration
   - Good for production

3. **Bing Search API**
   - Cost-effective
   - Good coverage

Update `src/modules/researcher.ts` to integrate your preferred API.

## Limitations & Considerations

- **Research Quality**: Results depend on publicly available information
- **AI Variability**: Output may vary slightly between runs
- **Rate Limits**: Anthropic API has rate limits; use appropriate model
- **Accuracy**: Always validate generated content against your knowledge
- **Customization**: Generated content is a starting point; customize for your needs

## Roadmap

- [ ] Integration with CRM systems (Salesforce, HubSpot)
- [ ] Real-time company data enrichment
- [ ] Multi-language support
- [ ] Team collaboration features
- [ ] Version control for playbooks
- [ ] A/B testing framework for messaging
- [ ] Integration with sales engagement platforms
- [ ] Analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/claude-gtm-engine/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/claude-gtm-engine/discussions)

## Acknowledgments

- Built with [Anthropic Claude](https://anthropic.com) AI
- Inspired by enterprise GTM platforms like Octave HQ
- Based on proven B2B sales frameworks (MEDDIC, SPICED, BANT)

## Example Commands

### Strategic GTM Analysis

```bash
# Basic company analysis
gtm analyze stripe.com
gtm analyze notion.so
gtm analyze figma.com

# Industry-focused
gtm analyze salesforce.com --industry healthcare
gtm analyze hubspot.com --industry manufacturing

# Competitive positioning
gtm analyze asana.com --competitor monday.com
gtm analyze zoom.us --competitor webex.com
```

### Octave-Style Playbooks

```bash
# Practitioner playbooks
gtm playbook stripe.com -t practitioner -f "RevOps teams struggling with attribution"
gtm playbook gong.io -t practitioner -f "VP Sales needing conversation intelligence"

# Sector playbooks
gtm playbook salesforce.com -t sector -f "Healthcare technology companies"
gtm playbook stripe.com -t sector -f "B2B SaaS companies processing payments"

# Milestone playbooks
gtm playbook notion.so -t milestone -f "Companies that just raised Series B"
gtm playbook figma.com -t milestone -f "Teams scaling from 50 to 200 employees"

# Competitive playbooks
gtm playbook asana.com -t competitive -f "Displacing Monday.com in mid-market"
gtm playbook notion.so -t competitive -f "Replacing Confluence and traditional wikis"

# Account playbooks
gtm playbook zoom.us -t account -f "Zoom Video Communications"
gtm playbook stripe.com -t account -f "Stripe Inc"
```

---

**Built with ❤️ using Claude AI**

For questions, feedback, or support, please open an issue on GitHub.