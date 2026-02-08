# GTM CONTEXT ENGINE - COMPLETE SOURCE CODE

**Repository:** ClaudeGTM
**Purpose:** Analyze company domains and generate comprehensive GTM playbooks
**Tech Stack:** TypeScript, Node.js, Anthropic Claude API

---

## 📦 PROJECT STRUCTURE

```
ClaudeGTM/
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── .env                           # API keys (not included - create your own)
├── README.md
├── src/
│   ├── index.ts                   # Main entry point
│   ├── cli.ts                     # CLI interface
│   ├── modules/
│   │   ├── gtm-analyzer.ts        # GTM playbook generator
│   │   ├── researcher.ts          # Web research module
│   │   ├── orchestrator.ts        # Main orchestration
│   │   ├── octave-analyzer.ts     # Octave-style playbooks
│   │   ├── octave-formatter.ts    # Octave markdown formatter
│   │   ├── octave-orchestrator.ts # Octave orchestration
│   │   └── output-formatter.ts    # Output formatting
│   ├── types/
│   │   ├── index.ts              # Type exports
│   │   ├── gtm.types.ts          # GTM types
│   │   ├── octave.types.ts       # Octave types
│   │   └── playbook.types.ts     # Playbook types
│   ├── utils/
│   │   ├── ai-client.ts          # Claude API client
│   │   ├── config.ts             # Configuration
│   │   └── logger.ts             # Logging utility
│   └── web/
│       └── server.ts             # Web server (Express)
├── outputs/                       # Generated playbooks
└── playbooks/                     # Saved playbooks
```

---

## 📄 COPY-PASTE FILES BELOW

---

### **1. package.json**

```json
{
  "name": "claude-gtm-engine",
  "version": "1.0.0",
  "description": "GTM Context Engine - Analyze company domains and generate comprehensive outbound sales strategies",
  "main": "dist/index.js",
  "bin": {
    "gtm": "dist/cli.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/cli.ts",
    "start": "node dist/cli.js",
    "analyze": "ts-node src/cli.ts analyze",
    "web": "ts-node src/web/server.ts",
    "web:build": "tsc && node dist/web/server.js",
    "test": "jest",
    "lint": "eslint src --ext .ts"
  },
  "keywords": ["gtm", "sales", "outbound", "icp", "persona", "messaging"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@anthropic-ai/sdk": "^0.30.0",
    "axios": "^1.7.0",
    "chalk": "^4.1.2",
    "cheerio": "^1.0.0",
    "commander": "^12.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.0",
    "express": "^4.18.0",
    "js-yaml": "^4.1.0",
    "marked": "^11.0.0",
    "ora": "^5.4.1",
    "p-limit": "^3.1.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.0",
    "@types/js-yaml": "^4.0.9",
    "@types/marked": "^6.0.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint": "^8.57.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.0",
    "ts-node": "^10.9.0",
    "typescript": "^5.3.0"
  }
}
```

---

### **2. tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

---

### **3. .env.example** (Create your own .env with your API key)

```bash
# Anthropic API Key (required)
ANTHROPIC_API_KEY=your_api_key_here

# Optional: Model configuration
ANTHROPIC_MODEL=claude-sonnet-4-20250514
ANTHROPIC_MAX_TOKENS=16000

# Optional: Output directory
OUTPUT_DIR=./outputs
PLAYBOOKS_DIR=./playbooks

# Optional: Web server
PORT=3000
```

---

### **4. src/index.ts** (Main Entry Point)

```typescript
export * from './modules/orchestrator';
export * from './modules/gtm-analyzer';
export * from './modules/researcher';
export * from './modules/output-formatter';
export * from './types';
export * from './utils';
```

---

### **5. src/cli.ts** (CLI Interface)

