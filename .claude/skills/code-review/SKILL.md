---
name: code-review
description: Structured self-review before opening a PR. Catches over-engineering, AI-generated smell, and missing edge cases.
allowed-tools: Read, Glob, Grep
---

# Code Review

## When to use this skill
Before submitting any PR touching more than a single file.

## The five passes

### 1. Correctness
- Does the code do what the task requires? Trace one happy path end-to-end.
- Are edge cases handled (empty, single, many, max)?
- Are error paths meaningful (fallback, logged context, user-visible message)?

### 2. Simplicity
- Is there a line that exists "just in case"? Delete it.
- Is there a helper called once? Inline it.
- Is there abstraction without three callers? Collapse it.

### 3. Names
- Every identifier tells the reader what it holds in one second.
- No generic `data`, `item`, `process`, `handle`.

### 4. AI-smell check
- Symmetrical copy-paste? Flag.
- Over-defensive null checks on validated data? Cut.
- Comments that restate code? Remove.
- Regions hiding bloat? Remove.

### 5. Diff discipline
- Only files relevant to the task changed.
- No drive-by refactors.
- No dead code reintroduced.

## Output
Per finding: **file:line — severity — issue — fix**.

End with: **APPROVE / REQUEST-CHANGES**.

## TODO: Pull from upstream repo
Source: canonical review playbooks. Mirror as patterns evolve.
