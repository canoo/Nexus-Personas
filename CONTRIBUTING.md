# Contributing Personas to the NEXUS Vault

Welcome! The **Nexus-Personas** repository is the open-source community vault for specialist AI agent personas designed for the [NEXUS framework](https://github.com/canoo/agent-nexus).

---

## Submission Guidelines

### 1. Create a Persona File
Place your persona in the `personas/` directory as a Markdown file:
`personas/<persona-id>.md` (use kebab-case, e.g., `kubernetes-operator.md`).

### 2. Required Frontmatter
Every persona must begin with YAML frontmatter conforming to this format:

```markdown
---
name: Kubernetes Operator
description: Specialist in Kubernetes manifests, Helm charts, and cluster debugging.
emoji: ☸️
color: blue
vibe: Production-grade cloud native operations with zero downtime mindset.
allowedTools:
  - "Read"
  - "Bash(*)"
  - "Grep"
  - "Glob"
---
```

### 3. Markdown Structure
Following the frontmatter, format your agent spec with:
- **Identity & Memory**: Core background, focus areas, and operational heuristics.
- **Core Mission**: Clear primary objectives and guidelines.
- **Critical Rules**: Strict constraints (e.g., security, dry-run policies).
- **Workflow / Examples**: Step-by-step methodology and execution examples.

---

## Pull Request Process

1. Fork this repository.
2. Add your persona under `personas/`.
3. Run the registry generator locally:
   ```bash
   node scripts/build-registry.js
   ```
4. Open a Pull Request with a clear summary of what your specialist agent excels at.
5. CI checks repeatable generation and whether the committed catalog matches the sources. Full YAML/schema validation remains a follow-up; this generator is not a complete YAML validator.

## Reproducible catalog builds

`registry-meta.json` owns the catalog version and release date (`updatedAt`). Keep these values unchanged for routine regeneration; update them intentionally when preparing a catalog release. `updatedAt` describes that release, not the time a developer ran the generator. Persona changes still appear immediately in regenerated entries.

The generator uses no wall-clock timestamp and sorts IDs without depending on the machine's locale. Identical persona sources and release metadata produce identical catalog bytes. Run `npm test` for the isolated regression check. No dependencies need installation.
