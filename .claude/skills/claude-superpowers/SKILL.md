---
name: claude-superpowers
description: Workflow skill — plan, verify, then execute. Lifts the quality bar on multi-step tasks by forcing a plan, proof, and post-mortem.
allowed-tools: Read, Edit, Glob, Grep, Bash
---

# Claude Superpowers

## When to use this skill
Non-trivial multi-step tasks: new pages, refactors across files, schema changes, setup work. Skip for single-line edits.

## The loop
1. **Frame** — restate the task in one sentence. What is the definition of done?
2. **Plan** — list the steps. Estimate which files change.
3. **Verify** — before editing, confirm assumptions (read the files, run the repro, check the types).
4. **Execute** — make the smallest change that satisfies the plan.
5. **Prove** — run the build / tests / typecheck. Show the output.
6. **Reflect** — one sentence: what would you do differently? Is there a lint rule that would prevent future mistakes?

## Rules
- Never claim "done" without proof (build output, screenshot, test pass).
- If you change direction mid-task, log the pivot and why.
- If a step costs more than 10 minutes of exploration, stop and ask.

## Output format (for medium-sized tasks)
- **Goal**
- **Plan** (3–7 bullets)
- **Diffs** (per-file)
- **Proof** (command output)
- **Follow-ups** (what was cut from scope)

## TODO: Pull from upstream repo
Source: `anthropic-experimental/superpowers`. Mirror patterns as the repo evolves.
