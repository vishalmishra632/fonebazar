---
name: security-review
description: Security review pass scoped to a static Next.js site with client-side cart and WhatsApp handoff.
allowed-tools: Read, Glob, Grep
---

# Security Review

## Scope
This project is a static export. No backend, no auth, no database. The attack surface is:
- User input written to the DOM (XSS).
- URLs constructed from user input (open redirect, phishing).
- Client-side storage trust (localStorage shape validation).
- Third-party scripts (supply chain).
- SEO / metadata leakage.

## Checklist
1. **XSS in dynamic content** — anything derived from `localStorage`, URL params, or user-typed text that reaches `dangerouslySetInnerHTML`, `href`, or `src` must be URL-encoded or sanitised.
2. **WhatsApp URL builder** — destination host must be literal `https://wa.me/<number>`. Number must be validated (digits only).
3. **JSON-LD injection** — `JSON.stringify(schema)` output must have `<` → `\u003c` replacement before `dangerouslySetInnerHTML`.
4. **localStorage parse** — every `JSON.parse(localStorage.getItem(...))` must be inside try/catch. Returned shape must be validated (lightweight runtime check) before use.
5. **Third-party scripts** — any `<script src>` pinned to a known CDN. No `eval`, no `Function()`.
6. **Env vars** — only `NEXT_PUBLIC_*` are reachable from the client. Confirm no private keys bleed via bundle analysis.
7. **Clickjacking** — static hosting provider should serve `X-Frame-Options: DENY`. Confirm in deploy config.

## Output
Per finding: **file:line — severity — impact — remediation**.

End with: **PASS / FINDINGS**.

## TODO: Pull from upstream repo
Baseline: OWASP Top 10 mapped to static-site scope.
