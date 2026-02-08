# Contributing to GTM Context Engine

Thank you for your interest in contributing to the GTM Context Engine! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions. We're building a tool to help sales and marketing professionals, and we welcome contributions from all backgrounds.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node version, OS, etc.)
- Sample output if applicable

### Suggesting Features

Feature requests are welcome! Please include:
- Clear use case and value proposition
- How it fits into the existing architecture
- Any implementation ideas you have

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/claude-gtm-engine.git
   cd claude-gtm-engine
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run build
   npm test
   npm run lint
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: brief description"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Build
npm run build

# Run in dev mode
npm run dev

# Lint
npm run lint
```

## Project Structure

```
src/
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── modules/        # Core business logic
│   ├── researcher.ts
│   ├── gtm-analyzer.ts
│   ├── output-formatter.ts
│   └── orchestrator.ts
├── cli.ts          # CLI interface
└── index.ts        # Main entry point
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types, avoid `any`
- Use interfaces for data structures
- Export types from `types/` directory

### Style Guide

- Use 2 spaces for indentation
- Use single quotes for strings
- Add JSDoc comments for public APIs
- Keep functions focused and small
- Use descriptive variable names

### Error Handling

- Catch and handle errors appropriately
- Log errors with context using the logger
- Provide helpful error messages to users

### Testing

- Add tests for new features
- Ensure existing tests pass
- Test edge cases and error scenarios

## Areas for Contribution

### High Priority

- [ ] Integration with professional search APIs (Google, Bing, SerpAPI)
- [ ] Enhanced web scraping for better company data
- [ ] CRM integrations (Salesforce, HubSpot)
- [ ] Caching layer for research data
- [ ] Rate limiting and retry logic improvements

### Medium Priority

- [ ] Multi-language support
- [ ] Enhanced persona depth (day-in-life, tool stack)
- [ ] A/B testing framework for messaging
- [ ] Analytics and tracking
- [ ] Web UI for the engine

### Documentation

- [ ] More examples and templates
- [ ] Video tutorials
- [ ] Integration guides
- [ ] Best practices documentation

## Research Module Improvements

The research module (`src/modules/researcher.ts`) is a great place to contribute:

1. **Search API Integration**
   - Replace DuckDuckGo with professional APIs
   - Add caching layer
   - Improve result parsing

2. **Data Enrichment**
   - Integrate with company data APIs
   - Add LinkedIn integration
   - Social media analysis

3. **Competitive Intelligence**
   - G2/Capterra review analysis
   - Product comparison tools
   - Pricing intelligence

## GTM Analysis Improvements

The analysis module (`src/modules/gtm-analyzer.ts`) can be enhanced:

1. **Persona Development**
   - Add psychographic profiling
   - Buying journey mapping
   - Influence mapping

2. **Messaging Generation**
   - A/B testing suggestions
   - Multi-channel coordination
   - Personalization tokens

3. **Qualification Framework**
   - Lead scoring models
   - Predictive analytics
   - Dynamic criteria

## Questions?

Feel free to:
- Open an issue for discussion
- Reach out via GitHub Discussions
- Contact maintainers directly

Thank you for contributing to GTM Context Engine!
