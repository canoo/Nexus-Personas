# 🧠 Nexus-Personas

The official community vault and open registry of AI agent personas for the [NEXUS Framework](https://github.com/canoo/agent-nexus).

Each persona is a standardized Markdown specification that instructs AI coding assistants (Claude Code, Gemini CLI, Kiro CLI, Cursor, etc.) to adopt specialized roles, tools, constraints, and mental models.

---

## 🌐 Architecture: How Both Repositories Connect

This repository acts as the **central single source of truth (vault)** for all agent personas. Both the main NEXUS engine (`agent-nexus`) and the documentation showcase (`nexus-site`) interface with this vault:

```
                          ┌───────────────────────────┐
                          │   canoo/Nexus-Personas    │
                          │   (Central Vault & Spec)  │
                          └─────────────┬─────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 │                                             │
                 ▼                                             ▼
  ┌──────────────────────────────┐              ┌──────────────────────────────┐
  │      canoo/agent-nexus       │              │       canoo/nexus-site       │
  │     (Main CLI Framework)     │              │    (Showcase & Marketplace)  │
  ├──────────────────────────────┤              ├──────────────────────────────┤
  │ - CLI `nexus persona install`│              │ - Consumes `registry.json`   │
  │ - Pulls raw persona .md files│              │ - Renders live web cards     │
  │ - Symlinks to ~/.config/nexus│              │ - Interactive search & tags  │
  │ - Local model routing map    │              │ - Auto-rebuild on dispatch   │
  └──────────────────────────────┘              └──────────────────────────────┘
```

### 1. How `agent-nexus` (The CLI) Accesses This Vault

The NEXUS CLI interacts with this vault directly via GitHub's raw endpoints:

1. **Listing & Searching**:
   - Queries `https://raw.githubusercontent.com/canoo/Nexus-Personas/main/registry.json` for indexed personas.
   - Example CLI behavior:
     ```bash
     nexus persona list
     nexus persona search kubernetes
     ```
2. **Downloading & Installing**:
   - Downloads the target Markdown file directly into the user's global registry (`~/.config/nexus/personas/<name>.md`):
     ```bash
     curl -sSL "https://raw.githubusercontent.com/canoo/Nexus-Personas/main/personas/<name>.md" \
       -o ~/.config/nexus/personas/<name>.md
     ```
   - Instantly available across all configured tools (Claude Code, Gemini CLI, Kiro) via existing NEXUS symlinks without restarting.
3. **Optional Git Submodule**:
   - For local offline development or bundled distributions, `agent-nexus` can vendor this repo as a submodule:
     ```bash
     git submodule add https://github.com/canoo/Nexus-Personas.git personas/vault
     ```

---

### 2. How `nexus-site` (Showcase & Web Catalog) Accesses This Vault

The website (`nexus.codelogiic.com`) acts as the visual exploration frontend for this vault:

1. **Automated Catalog Synchronization**:
   - `scripts/build-registry.js` in this repo automatically parses every persona file in `personas/` and generates an updated `registry.json` upon every commit.
   - `nexus-site` fetches `https://raw.githubusercontent.com/canoo/Nexus-Personas/main/registry.json` during static build time (or client-side) to generate:
     - Persona showcase grid cards.
     - Search & filter capabilities (by role, tag, tools, color).
     - One-click copy commands (`nexus persona install <name>`).
2. **Automated Build Triggers**:
   - On push to `main` in `Nexus-Personas`, a GitHub Actions workflow triggers a repository dispatch to `canoo/nexus-site` to rebuild Cloudflare Pages with newly accepted community personas.

---

## 📋 Persona Specification Standard

Every persona in `personas/` must start with YAML frontmatter:

```markdown
---
name: Persona Name
description: Concise description of expertise and responsibilities.
emoji: ⚡
color: green # green | blue | ruby | amber | purple | cyan
vibe: Operational tone or behavioral rule summary.
allowedTools:
  - "Read"
  - "Write"
  - "Edit"
  - "Bash(*)"
  - "Glob"
  - "Grep"
---

# Persona Title

[Persona system prompt, core mission, constraints, and workflow guidelines...]
```

---

## 📦 Active Built-in Specialists

| Persona ID | Name | Emoji | Color | Focus Area |
|------------|------|:-----:|:-----:|------------|
| `agents-orchestrator` | Expert Orchestrator | ⚡ | Green | Meta-orchestration, task decomposition, context window budget |
| `engineering-backend-architect` | Backend Architect | 🏗️ | Blue | Scalable APIs, schemas, database engines, cloud infrastructure |
| `engineering-frontend-developer` | Frontend Developer | 🎨 | Blue | Modern UI, Astro, React, Tailwind CSS, WebGL/Canvas |
| `engineering-mobile-app-builder` | Mobile App Builder | 📲 | Purple | Native iOS/Android, Capacitor, React Native, cross-platform |
| `bubbletea-tui` | TUI Specialist | ⬛ | Cyan | Terminal interfaces, Bubbletea v2, Bubbles, Lipgloss |
| `engineering-code-reviewer` | Code Reviewer | 🔍 | Amber | PR review, security analysis, architectural adherence |
| `engineering-devops-ci-agent` | DevOps / CI Agent | 🚀 | Ruby | CI/CD pipelines, Docker, Cloudflare, containerization |
| `engineering-git-workflow-master` | Git Workflow Master | 🌿 | Green | Atomic git hygiene, branching strategies, rebasing |
| `engineering-firebase-agent` | Firebase Agent | 🔥 | Amber | Firestore, GCP Cloud Functions, Auth, Hosting |
| `engineering-dev-roadmap` | Dev Roadmap | 🗺️ | Blue | Milestone tracking, issue triage, backlog planning |
| `onboarding-guide` | Onboarding Guide | 🧭 | Green | Hardware detection, Ollama local model sizing, symlink setup |
| `ui-tester-agent` | UI Tester | 🧪 | Ruby | Playwright browser automation, screenshot QA, regressions |

---

## 🤝 Contributing

We welcome community personas! Check out [CONTRIBUTING.md](./CONTRIBUTING.md) to learn how to structure and submit your custom AI specialist agent via Pull Request.

---

## 📄 License

MIT © 2026 [Codelogiic](https://www.codelogiic.com).
