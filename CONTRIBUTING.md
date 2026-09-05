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
5. Automated validation checks will verify the format before community review.
