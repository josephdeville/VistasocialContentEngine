import axios from 'axios';
import * as cheerio from 'cheerio';
import { logger } from '../utils/logger';
import { AIClient } from '../utils/ai-client';
import { ResearchData } from '../types';

export class CompanyResearcher {
  private aiClient: AIClient;
  private searchCache: Map<string, any> = new Map();

  constructor(aiClient?: AIClient) {
    this.aiClient = aiClient || new AIClient();
  }

  /**
   * Main research orchestrator
   */
  async researchCompany(domain: string): Promise<ResearchData> {
    logger.section('Starting Company Research');
    logger.step(1, 4, `Researching company at ${domain}`);

    const [companyInfo, competitiveLandscape, customerIntelligence, marketTrends] =
      await Promise.all([
        this.researchCompanyProfile(domain),
        this.researchCompetitors(domain),
        this.researchCustomers(domain),
        this.researchMarket(domain),
      ]);

    logger.success('Research phase completed');

    return {
      company_info: companyInfo,
      competitive_landscape: competitiveLandscape,
      customer_intelligence: customerIntelligence,
      market_trends: marketTrends,
      raw_sources: this.extractSources(),
    };
  }

  /**
   * Phase 1: Company Deep Dive
   */
  private async researchCompanyProfile(domain: string): Promise<any> {
    logger.step(1, 4, 'Company Deep Dive');

    const queries = [
      `site:${domain} about company overview`,
      `"${domain}" company profile product features`,
      `"${domain}" pricing business model`,
      `"${domain}" funding company size employees`,
      `"${domain}" technology stack`,
      `"${domain}" news product launch`,
    ];

    const searchResults = await this.performMultipleSearches(queries);

    // Use AI to synthesize the research
    const prompt = `Analyze the following search results about ${domain} and extract comprehensive company information.

Search Results:
${JSON.stringify(searchResults, null, 2)}

Extract and structure the following information:
1. Company overview (what they do, how they make money)
2. Core products/services and features
3. Target market and customer base
4. Pricing model
5. Company size, funding stage, growth indicators
6. Technology stack (if B2B SaaS)
7. Recent news, product launches, or pivots
8. Key differentiators and unique selling points

Return your analysis as structured JSON.`;

    try {
      const analysis = await this.aiClient.generateCompletion(
        prompt,
        'You are a business analyst conducting company research. Provide detailed, factual analysis based on the search results provided.'
      );

      return this.parseAIResponse(analysis);
    } catch (error) {
      logger.error('Failed to analyze company profile', error);
      return { raw_results: searchResults };
    }
  }

  /**
   * Phase 2: Market & Competitive Analysis
   */
  private async researchCompetitors(domain: string): Promise<any> {
    logger.step(2, 4, 'Market & Competitive Analysis');

    const queries = [
      `"${domain}" competitors alternatives`,
      `"${domain}" vs comparison`,
      `"${domain}" competitive advantages`,
      `"${domain}" market position industry`,
      `"${domain}" competitive landscape`,
    ];

    const searchResults = await this.performMultipleSearches(queries);

    const prompt = `Analyze these search results about ${domain}'s competitive landscape:

${JSON.stringify(searchResults, null, 2)}

Identify and structure:
1. Direct competitors (same solution, same market)
2. Indirect competitors (different solution, same problem)
3. Market positioning relative to competitors
4. Competitive advantages and weaknesses
5. Industry trends affecting their market
6. Common objections prospects might raise

Return as structured JSON with competitor names, positioning, strengths, and weaknesses.`;

    try {
      const analysis = await this.aiClient.generateCompletion(
        prompt,
        'You are a competitive intelligence analyst. Provide objective analysis of the competitive landscape.'
      );

      return this.parseAIResponse(analysis);
    } catch (error) {
      logger.error('Failed to analyze competitive landscape', error);
      return { raw_results: searchResults };
    }
  }

  /**
   * Phase 3: Customer Intelligence
   */
  private async researchCustomers(domain: string): Promise<any> {
    logger.step(3, 4, 'Customer Intelligence');

    const queries = [
      `"${domain}" customers case studies`,
      `"${domain}" testimonials reviews`,
      `"${domain}" use cases success stories`,
      `"${domain}" customer logos clients`,
      `"${domain}" pain points solves`,
      `"${domain}" industries verticals serves`,
    ];

    const searchResults = await this.performMultipleSearches(queries);

    const prompt = `Analyze these search results about ${domain}'s customers:

${JSON.stringify(searchResults, null, 2)}

Extract and structure:
1. Who currently uses their product (customer logos, company names)
2. Customer success stories and testimonials
3. Common pain points they solve
4. Industries and verticals they serve
5. Company sizes they typically sell to (SMB, Mid-Market, Enterprise)
6. Specific use cases and applications

Return as structured JSON.`;

    try {
      const analysis = await this.aiClient.generateCompletion(
        prompt,
        'You are a customer research analyst. Extract factual information about customer profiles and use cases.'
      );

      return this.parseAIResponse(analysis);
    } catch (error) {
      logger.error('Failed to analyze customer intelligence', error);
      return { raw_results: searchResults };
    }
  }

  /**
   * Research market trends
   */
  private async researchMarket(domain: string): Promise<any> {
    logger.step(4, 4, 'Market Trends Analysis');

    const queries = [
      `"${domain}" industry trends 2025`,
      `"${domain}" market analysis`,
      `"${domain}" growth market size`,
    ];

    const searchResults = await this.performMultipleSearches(queries);

    const prompt = `Analyze market trends for ${domain}:

${JSON.stringify(searchResults, null, 2)}

Extract:
1. Industry trends
2. Market growth indicators
3. Emerging opportunities or threats
4. Regulatory or technology shifts

Return as structured JSON.`;

    try {
      const analysis = await this.aiClient.generateCompletion(
        prompt,
        'You are a market research analyst. Identify key trends and market dynamics.'
      );

      return this.parseAIResponse(analysis);
    } catch (error) {
      logger.error('Failed to analyze market trends', error);
      return { raw_results: searchResults };
    }
  }

  /**
   * Perform multiple web searches
   */
  private async performMultipleSearches(queries: string[]): Promise<any[]> {
    const results = [];

    for (const query of queries) {
      try {
        const result = await this.webSearch(query);
        results.push({ query, result });
        // Rate limiting
        await this.sleep(500);
      } catch (error) {
        logger.warn(`Search failed for query: ${query}`);
        results.push({ query, error: 'Search failed' });
      }
    }

    return results;
  }

  /**
   * Web search implementation
   * Note: This is a simplified implementation. In production, you'd integrate with
   * a proper search API like Google Custom Search, Bing, or SerpAPI
   */
  private async webSearch(query: string): Promise<any> {
    // Check cache
    if (this.searchCache.has(query)) {
      return this.searchCache.get(query);
    }

    try {
      // For demo purposes, we'll use DuckDuckGo HTML search
      // In production, use a proper API like SerpAPI or Google Custom Search
      const response = await axios.get('https://html.duckduckgo.com/html/', {
        params: { q: query },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const results: any[] = [];

      $('.result').each((i, elem) => {
        if (i >= 5) return; // Limit to top 5 results

        const title = $(elem).find('.result__title').text().trim();
        const snippet = $(elem).find('.result__snippet').text().trim();
        const url = $(elem).find('.result__url').attr('href');

        if (title && snippet) {
          results.push({ title, snippet, url });
        }
      });

      this.searchCache.set(query, results);
      return results;
    } catch (error) {
      logger.debug(`Web search failed for: ${query}`);
      // Return mock data for development/testing
      return [
        {
          title: `Search result for: ${query}`,
          snippet: 'Search functionality requires API integration',
          url: 'https://example.com',
        },
      ];
    }
  }

  /**
   * Extract all sources from research
   */
  private extractSources(): string[] {
    const sources = new Set<string>();

    for (const result of this.searchCache.values()) {
      if (Array.isArray(result)) {
        result.forEach((item) => {
          if (item.url) sources.add(item.url);
        });
      }
    }

    return Array.from(sources);
  }

  /**
   * Parse AI response, attempting JSON extraction
   */
  private parseAIResponse(response: string): any {
    try {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = response.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1]);
      }

      // Try parsing the entire response
      return JSON.parse(response);
    } catch (error) {
      // If parsing fails, return structured text
      return {
        raw_analysis: response,
        parsed: false,
      };
    }
  }

  /**
   * Simple sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
