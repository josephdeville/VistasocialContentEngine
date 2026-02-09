#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { marked } from 'marked';

interface BrandingConfig {
  companyName: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

const vistaSocialBranding: BrandingConfig = {
  companyName: 'Vista Social',
  primaryColor: '#6366F1', // Indigo
  secondaryColor: '#8B5CF6', // Purple
  accentColor: '#EC4899', // Pink
};

function generateBrandedHTML(markdownContent: string, branding: BrandingConfig, title: string): string {
  const htmlContent = marked(markdownContent);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${branding.companyName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: #ffffff;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    /* Header Branding */
    .brand-header {
      background: linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%);
      color: white;
      padding: 3rem 2rem;
      margin: -2rem -2rem 3rem -2rem;
      border-radius: 0 0 1rem 1rem;
      box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
    }

    .brand-header h1 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .brand-header .company-name {
      font-size: 1.25rem;
      font-weight: 600;
      opacity: 0.95;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid rgba(255, 255, 255, 0.2);
    }

    .brand-header .subtitle {
      font-size: 1.1rem;
      opacity: 0.9;
      font-weight: 400;
    }

    /* Typography */
    h1 {
      color: ${branding.primaryColor};
      font-size: 2.25rem;
      font-weight: 700;
      margin: 2rem 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid ${branding.primaryColor};
    }

    h2 {
      color: ${branding.primaryColor};
      font-size: 1.75rem;
      font-weight: 600;
      margin: 2.5rem 0 1rem 0;
      padding-left: 1rem;
      border-left: 4px solid ${branding.accentColor};
    }

    h3 {
      color: ${branding.secondaryColor};
      font-size: 1.35rem;
      font-weight: 600;
      margin: 1.5rem 0 0.75rem 0;
    }

    h4 {
      color: #4b5563;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 1rem 0 0.5rem 0;
    }

    p {
      margin: 0.75rem 0;
      color: #374151;
      font-size: 1rem;
      line-height: 1.7;
    }

    strong {
      color: #111827;
      font-weight: 600;
    }

    /* Lists */
    ul, ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }

    li {
      margin: 0.5rem 0;
      color: #374151;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border-radius: 0.5rem;
      overflow: hidden;
    }

    thead {
      background: ${branding.primaryColor};
      color: white;
    }

    th {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tbody tr:hover {
      background: #f9fafb;
    }

    /* Code blocks */
    code {
      background: #f3f4f6;
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
      color: ${branding.secondaryColor};
    }

    pre {
      background: #1f2937;
      color: #f9fafb;
      padding: 1.5rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin: 1rem 0;
    }

    pre code {
      background: transparent;
      color: #f9fafb;
      padding: 0;
    }

    /* Blockquotes */
    blockquote {
      border-left: 4px solid ${branding.accentColor};
      padding: 1rem 1.5rem;
      margin: 1.5rem 0;
      background: #fef3f8;
      border-radius: 0 0.5rem 0.5rem 0;
      font-style: italic;
      color: #be185d;
    }

    /* Horizontal Rule */
    hr {
      border: none;
      height: 2px;
      background: linear-gradient(to right, ${branding.primaryColor}, ${branding.secondaryColor}, ${branding.accentColor});
      margin: 2.5rem 0;
      border-radius: 1px;
    }

    /* Emoji enhancement */
    h2:before {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }

    /* Footer */
    .brand-footer {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .brand-footer strong {
      color: ${branding.primaryColor};
    }

    /* Print styles */
    @media print {
      body {
        max-width: 100%;
        padding: 1rem;
      }

      .brand-header {
        margin: -1rem -1rem 2rem -1rem;
        page-break-after: avoid;
      }

      h1, h2, h3 {
        page-break-after: avoid;
      }

      table {
        page-break-inside: avoid;
      }
    }

    /* Highlight boxes */
    .highlight-box {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-left: 4px solid ${branding.primaryColor};
      padding: 1.5rem;
      margin: 1.5rem 0;
      border-radius: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="brand-header">
    <h1>${title}</h1>
    <div class="subtitle">Competitive Intelligence & Sales Playbook</div>
    <div class="company-name">Powered by ${branding.companyName}</div>
  </div>

  <div class="content">
    ${htmlContent}
  </div>

  <div class="brand-footer">
    <p><strong>${branding.companyName}</strong> - Social Media Management Platform</p>
    <p>Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>
</body>
</html>`;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: ts-node scripts/generate-branded-pdf.ts <markdown-file>');
    console.log('Example: ts-node scripts/generate-branded-pdf.ts outputs/competitive-playbook-sproutsocial-com-2026-02-08.md');
    process.exit(1);
  }

  const inputFile = args[0];

  if (!fs.existsSync(inputFile)) {
    console.error(`Error: File not found: ${inputFile}`);
    process.exit(1);
  }

  // Read markdown file
  const markdownContent = fs.readFileSync(inputFile, 'utf-8');

  // Extract title from filename or first h1
  const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/📖\s*/, '') : path.basename(inputFile, '.md');

  // Generate branded HTML
  const html = generateBrandedHTML(markdownContent, vistaSocialBranding, title);

  // Output file path
  const outputFile = inputFile.replace(/\.md$/, '-vista-branded.html');

  // Write HTML file
  fs.writeFileSync(outputFile, html, 'utf-8');

  console.log(`✅ Branded HTML generated: ${outputFile}`);
  console.log('');
  console.log('To convert to PDF:');
  console.log(`  1. Open ${outputFile} in Chrome/Edge`);
  console.log('  2. Press Cmd+P (Mac) or Ctrl+P (Windows)');
  console.log('  3. Select "Save as PDF"');
  console.log('  4. Click "Save"');
  console.log('');
  console.log('Or use a headless browser:');
  console.log(`  npx playwright pdf ${outputFile} ${outputFile.replace('.html', '.pdf')}`);
}

main().catch(console.error);
