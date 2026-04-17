---
name: claude-mem
description: Conventions for persisting decisions, open questions, and context into the `memory/` subsystem so future sessions inherit them.
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Claude Memory

## When to use this skill
- A decision was made that future sessions must respect (palette, WhatsApp number, font).
- A constraint was discovered (client doesn't want price tags before Phase 3).
- An external reference was introduced (IG handle, domain, partner brand).

## What to save
Save memories for facts that are **non-obvious** and **durable**. Skip anything derivable from the codebase.

## File layout
Each memory is a standalone `.md` file with YAML frontmatter:

```markdown
---
name: {{memory name}}
description: {{one-line description}}
type: {{user | feedback | project | reference}}
---

{{memory content}}
```

## MEMORY.md (index)
One line per memory:
```
- [Title](file.md) — one-line hook
```
Keep under 200 lines total.

## Types
- **user** — user role, workflow preferences, knowledge level.
- **feedback** — guidance given ("do X", "don't Y") with *why*.
- **project** — business facts, decisions, deadlines, stakeholders.
- **reference** — where external info lives (Notion page, Figma file, Slack channel).

## Rules
- Convert relative dates to absolute (`"next Thursday"` → `"2026-04-23"`).
- Update stale memories; delete wrong ones.
- Before acting on a memory, verify the underlying fact still holds.

## TODO: Pull from upstream repo
Canonical docs at https://docs.claude.com — mirror as the memory system evolves.
