# GTM CONTEXT ENGINE - COMPLETE SOURCE CODE
**Copy this entire codebase to recreate the GTM Context Engine**

## 📦 INSTALLATION

```bash
# 1. Create project directory
mkdir claude-gtm-engine
cd claude-gtm-engine

# 2. Initialize npm
npm init -y

# 3. Install dependencies (see package.json below)
npm install

# 4. Create .env file with your Anthropic API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env

# 5. Build TypeScript
npm run build

# 6. Run the engine
npm run dev playbook cin7.com -- -t milestone -f "Post-PE funding companies needing attribution"
```

---

## 📂 PROJECT STRUCTURE

```
claude-gtm-engine/
├── package.json
├── tsconfig.json
├── .env
├── README.md
├── src/
│   ├── index.ts
│   ├── cli.ts
│   ├── modules/
│   │   ├── gtm-analyzer.ts
│   │   ├── researcher.ts
│   │   ├── orchestrator.ts
│   │   ├── octave-analyzer.ts
│   │   ├── octave-formatter.ts
│   │   ├── octave-orchestrator.ts
│   │   ├── output-formatter.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── gtm.types.ts
│   │   ├── octave.types.ts
│   │   └── playbook.types.ts
│   ├── utils/
│   │   ├── ai-client.ts
│   │   ├── config.ts
│   │   ├── logger.ts
│   │   └── index.ts
│   └── web/
│       └── server.ts
├── outputs/
└── playbooks/
```

---
