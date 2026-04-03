---
name: review
description: Use when reviewing component documentation in this repository. Checks docs/components content against packages/ui/src and *.stories.tsx, prioritizes placeholders, pseudo-code, API drift, weak examples, misleading minimal compositions, missing anatomy/usage guidance, and styling docs that invent unsupported contracts.
---

# Review

Use this skill when the task is to review existing documentation under `docs/components/`.

## Review Goal

Find documentation defects that would mislead a consumer integrating a component from `@vega-ui/react`.

Prioritize:

- incorrect or invented API
- stale docs that drift from source
- placeholder snippets or pseudo-code
- examples that are technically valid but too weak to teach correct usage
- misleading minimal compositions for compound or advanced interactive components
- anatomy docs that omit required parts or valid composition order
- styling docs that document non-existent public hooks

## Sources Of Truth

Review against:

- `docs/components/README.md`
- `docs/components/structure.md`
- `packages/ui/src/<Component>/`
- `packages/ui/src/<Component>/*.stories.tsx`
- relevant tests in `packages/ui/src/<Component>/__tests__/`

Read `references/review-checklist.md` when you need severity guidance or a fast audit pass.

Do not treat existing docs as authoritative if they conflict with source or stories.

## Review Workflow

1. Identify the component doc profile from `docs/components/structure.md`.
2. Read the component source and public exports.
3. Read the story file and note the real consumer compositions.
4. Read the docs in `docs/components/<component>/`.
5. Compare docs against source and stories.
6. Search for placeholders, pseudo-code, and suspiciously thin snippets.
7. Report findings ordered by severity.

## What Counts As A Finding

Report a finding when the issue materially harms one of:

- correctness
- copyability
- composition clarity
- integration safety
- styling contract accuracy

Examples of valid findings:

- docs show a prop, part, or type that is not public
- docs omit required wrapper parts for a compound component
- a minimal composition is so empty that it teaches the wrong integration model
- `examples.md` uses shell snippets where the component realistically needs more structure
- `styling.md` invents CSS variables that source does not expose
- troubleshooting advice contradicts real behavior

Do not report style-only preferences unless they materially reduce clarity.

## Review Heuristics

- Compound and advanced interactive components should almost never rely on one-line examples alone.
- If the story has the correct composition and docs do not, the docs are probably wrong.
- Repeated placeholders are always findings.
- Repeated pseudo-code such as `const calendar = /* same composition */` is always a finding.
- A shorter snippet is not better if it hides required parts.
- “Minimal” should still be truthful.

## Final Validation Checks

Useful searches:

- placeholders and pseudo-code:
  `rg -n "\\{\\/\\*.*\\*\\/\\}|TODO|same .* composition" docs/components/<component>`
- suspicious fake-minimal snippets:
  `rg -n "<[A-Z][A-Za-z0-9]+\\s*/>" docs/components/<component>`
- compare stories:
  `sed -n '1,240p' packages/ui/src/<Component>/<Component>.stories.tsx`

## Output Format

When asked for a review:

- list findings first
- include file references
- explain why the issue is misleading or risky
- keep summaries short

If there are no findings, say that explicitly and note any residual risk such as “examples are correct but still somewhat terse”.
