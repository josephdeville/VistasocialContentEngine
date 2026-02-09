# Vista Social Branded Competitive Playbooks

**Generated:** February 9, 2026
**Platform:** GTM Context Engine v1.0.0
**Branding:** Vista Social

---

## 📊 Generated Playbooks

### 1. Sprout Social vs Hootsuite (Offensive)
**Title:** "Displacing Hootsuite: Mid-Market & Enterprise Teams Trapped by Platform Limitations"

**Files:**
- Markdown: `outputs/competitive-playbook-sproutsocial-com-2026-02-08.md` (22KB)
- Vista Branded HTML: `outputs/competitive-playbook-sproutsocial-com-2026-02-08-vista-branded.html` (30KB)

**Key Positioning:**
- **Core Tension:** Social teams have professionalized faster than their platforms evolved
- **Main Attack:** Hootsuite = complexity without capability
- **Hero Insight:** "The Executive Credibility Gap" - teams presenting analytics they don't trust

**Value Props by Persona:**
- VP Marketing: "The Executive Credibility Gap"
- Social Media Manager: "The Daily Friction Penalty"
- CMO/VP CX: "The ROI Accountability Mandate"

**Sections:** 7 comprehensive sections, 195 lines
- Core Strategy (Description & Executive Summary)
- 5 Key Insights
- Approach Angle
- Value Propositions (3 personas)
- 8 Qualifying Questions
- Key Messaging
- Outreach Sequences (Email 3-touch, LinkedIn, Cold Call)

---

### 2. Hootsuite vs Sprout Social (Defensive)
**Title:** "Defending Enterprise Social Teams Against Sprout Social Migration"

**Files:**
- Markdown: `outputs/competitive-playbook-hootsuite-com-2026-02-09.md` (25KB)
- Vista Branded HTML: `outputs/competitive-playbook-hootsuite-com-2026-02-09-vista-branded.html` (33KB)

**Key Positioning:**
- **Core Tension:** Known complexity vs. unknown migration risk
- **Main Defense:** Migration is "changing tires on a moving car"
- **Hero Insight:** "The Q4 Migration Suicide Mission" - avoiding team chaos during peak season

**Value Props by Persona:**
- Director of Social Media: "The Q4 Migration Suicide Mission"
- VP Marketing/CMO: "The Attribution Theater Illusion"
- Marketing Ops/RevOps: "The API Integration Rebuild Tax"

**Sections:** 7 comprehensive sections, 231 lines
- Core Strategy with defensive positioning
- 5 Key Insights on migration risks
- Approach Angle (validate frustration, map migration costs)
- Value Propositions (3 personas)
- 12 Qualifying Questions (!)
- Key Messaging
- Outreach Sequences

---

## 🎨 Vista Social Branding

### Design Elements
- **Primary Color:** #6366F1 (Indigo)
- **Secondary Color:** #8B5CF6 (Purple)
- **Accent Color:** #EC4899 (Pink)
- **Typography:** Inter font family

### Branded Features
✅ Gradient header with Vista Social logo space
✅ Color-coded section headings
✅ Professional table styling
✅ Print-optimized CSS
✅ Responsive design
✅ Enhanced typography with emoji support
✅ Brand footer with generation date

---

## 📄 Converting HTML to PDF

### Method 1: Mac Print to PDF (Recommended)
```bash
# Open in browser
open outputs/competitive-playbook-sproutsocial-com-2026-02-08-vista-branded.html

# Then:
# 1. Press Cmd+P
# 2. Select "Save as PDF"
# 3. Adjust margins if needed
# 4. Click "Save"
```

### Method 2: Command Line (wkhtmltopdf)
```bash
# Install if needed
brew install wkhtmltopdf

# Convert to PDF
wkhtmltopdf \
  outputs/competitive-playbook-sproutsocial-com-2026-02-08-vista-branded.html \
  outputs/sprout-social-vista-playbook.pdf

wkhtmltopdf \
  outputs/competitive-playbook-hootsuite-com-2026-02-09-vista-branded.html \
  outputs/hootsuite-vista-playbook.pdf
```

### Method 3: Headless Chrome
```bash
# Using Chrome's headless mode
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless \
  --disable-gpu \
  --print-to-pdf=outputs/sprout-social-vista-playbook.pdf \
  outputs/competitive-playbook-sproutsocial-com-2026-02-08-vista-branded.html
```

---

## 📈 Playbook Comparison

| Aspect | Sprout Social (Offensive) | Hootsuite (Defensive) |
|--------|---------------------------|----------------------|
| **Stance** | Aggressive displacement | Risk-based retention |
| **Lines** | 195 | 231 |
| **Questions** | 8 qualifying questions | 12 qualifying questions |
| **Personas** | 3 personas | 3 personas |
| **Core Message** | "Professionalized beyond the tool" | "Known vs. unknown complexity" |
| **Strongest Attack** | Executive credibility gap | Migration operational chaos |
| **Tone** | Empathetic + ambitious | Validating + pragmatic |

---

## 🎯 Usage Recommendations

### For Vista Social Sales Team

**Using Sprout Social Playbook:**
1. Target mid-market teams (3-50 person social teams)
2. Lead with analytics pain ("Excel exports for real reporting")
3. Focus on "capability gap" not feature comparison
4. Use "Executive Credibility Gap" language
5. Address migration concerns proactively

**Using Hootsuite Playbook:**
1. Study competitor's defensive positioning
2. Prepare counter-arguments for migration objections
3. Quantify migration costs they'll cite (200+ hours, data loss)
4. Emphasize "known vs. unknown" complexity framing
5. Be ready for "Q4 campaign" timing objections

### For Marketing

**Content Ideas:**
- Blog: "The Hidden Cost of Social Media Platform Migration"
- Case Study: "How [Company] Improved Analytics Without Switching Platforms"
- Comparison Page: Feature parity chart (now you know their defense)
- Email Campaign: Use qualifying questions as email hooks
- LinkedIn Ads: Target "social media directors" with credibility gap messaging

### For Product

**Roadmap Validation:**
- ✅ Analytics/reporting is #1 pain point (both playbooks confirm)
- ✅ Approval workflow complexity is major concern
- ✅ Integration with DAM/CRM is table stakes
- ✅ Historical data/benchmarking is critical retention factor
- ✅ Support responsiveness matters more than feature breadth

---

## 🚀 Next Steps

### Generate More Playbooks

**Competitive Scenarios:**
```bash
# Buffer positioning
npm run dev playbook buffer.com -- -t competitive -f "Displacing Hootsuite for SMBs"

# Later vs Sprout Social
npm run dev playbook later.com -- -t competitive -f "Instagram-first teams vs enterprise platforms"

# Vista Social positioning
npm run dev playbook vistasocial.com -- -t competitive -f "Displacing legacy platforms for modern teams"
```

**Practitioner Playbooks:**
```bash
npm run dev playbook vistasocial.com -- -t practitioner -f "Agency social media managers"
npm run dev playbook vistasocial.com -- -t practitioner -f "RevOps teams needing social attribution"
```

**Sector Playbooks:**
```bash
npm run dev playbook vistasocial.com -- -t sector -f "Healthcare social media compliance"
npm run dev playbook vistasocial.com -- -t sector -f "B2B SaaS marketing teams"
```

### Brand Other Playbooks

```bash
# Use the branding script for any markdown playbook
ts-node scripts/generate-branded-pdf.ts <playbook-file.md>

# Example
ts-node scripts/generate-branded-pdf.ts outputs/any-playbook.md
```

### Customize Branding

Edit `scripts/generate-branded-pdf.ts` to change:
- Brand colors (lines 15-18)
- Logo placement
- Typography
- Header/footer content

---

## 📊 Technical Details

**Generator Script:** `scripts/generate-branded-pdf.ts`
- Uses `marked` for markdown parsing
- Generates responsive HTML with print CSS
- Customizable branding configuration
- Inter font from Google Fonts
- Gradient headers with brand colors

**Dependencies:**
- `marked` - Markdown to HTML conversion
- `playwright` (optional) - HTML to PDF automation
- `markdown-pdf` (installed but deprecated)

**File Locations:**
- Source: `outputs/*.md`
- Branded HTML: `outputs/*-vista-branded.html`
- PDFs: Generate manually or via command line

---

## 🎓 Key Learnings

### What Makes a Strong Competitive Playbook

1. **Empathy First** - Validate prospect pain before pitching solution
2. **Named Pain Points** - Memorable phrases ("Executive Credibility Gap")
3. **Specific Evidence** - Reference real workflows (Excel exports, broken streams)
4. **Multi-Persona** - Different value props for decision maker vs. user
5. **Migration Awareness** - Address switching costs proactively
6. **Qualifying Questions** - Discovery questions that surface real need
7. **Ready-to-Use Content** - Email sequences, call scripts, objection handlers

### Offensive vs. Defensive Positioning

**Offensive (Sprout Social playbook):**
- Lead with empathy for their current pain
- Focus on capability gap, not feature gap
- Frame as "professionalized beyond the tool"
- Promise: Intelligence platform, not publishing tool

**Defensive (Hootsuite playbook):**
- Validate frustration immediately
- Quantify migration costs exhaustively
- Frame as "known vs. unknown complexity"
- Promise: Fix top 3 pain points in 30 days

---

## 📁 File Inventory

```
outputs/
├── competitive-playbook-sproutsocial-com-2026-02-08.md (22KB)
├── competitive-playbook-sproutsocial-com-2026-02-08-vista-branded.html (30KB)
├── competitive-playbook-hootsuite-com-2026-02-09.md (25KB)
└── competitive-playbook-hootsuite-com-2026-02-09-vista-branded.html (33KB)

scripts/
├── generate-branded-pdf.ts (PDF branding generator)
└── html-to-pdf.ts (Playwright PDF converter)
```

---

**Generated by:** GTM Context Engine v1.0.0
**Powered by:** Claude AI (Sonnet 4.5)
**Session:** https://claude.ai/code/session_01EXuW8Gi9gLeSQ7vH2crXJr
**Branding:** Vista Social
