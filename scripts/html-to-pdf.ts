#!/usr/bin/env ts-node

import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

async function convertToPDF(htmlFile: string, outputPdf: string) {
  console.log(`Converting ${htmlFile} to PDF...`);

  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Load the HTML file
  const htmlPath = path.resolve(htmlFile);
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  await page.setContent(htmlContent, {
    waitUntil: 'networkidle',
  });

  // Generate PDF
  await page.pdf({
    path: outputPdf,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in',
    },
  });

  await browser.close();

  console.log(`✅ PDF generated: ${outputPdf}`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: ts-node scripts/html-to-pdf.ts <html-file> <output-pdf>');
    process.exit(1);
  }

  const [htmlFile, outputPdf] = args;

  if (!fs.existsSync(htmlFile)) {
    console.error(`Error: File not found: ${htmlFile}`);
    process.exit(1);
  }

  await convertToPDF(htmlFile, outputPdf);
}

main().catch(console.error);
