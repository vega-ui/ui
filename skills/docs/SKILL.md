---
name: docs
description: Use when creating or updating component documentation in this repository. Applies the local docs structure in docs/components, uses packages/ui/src and *.stories.tsx as sources of truth, writes realistic consumer-facing snippets, and avoids placeholders or pseudo-code in index.md, anatomy.md, examples.md, patterns.md, styling.md, and troubleshooting.md.
---

# Docs

Use this skill when the task is to add or update component documentation under `docs/components/`.

## Goals

- Keep docs aligned with real exports from `@vega-ui/react`
- Prefer source-backed examples over invented snippets
- Write consumer-facing docs, not internal implementation notes
- Avoid placeholders such as `/* content */`, `/* rows */`, `/* calendar layout */`

## Sources Of Truth

Read these first:

- `docs/components/README.md`
- `docs/components/structure.md`
- `packages/ui/src/<Component>/`
- `packages/ui/src/<Component>/*.stories.tsx`

Read these references when needed:

- `references/doc-profiles.md` for quick profile selection
- `references/docs-workflow.md` for working order, snippet standards, and common smells

Use these as tie-breakers when needed:

- nearby component docs in `docs/components/<component>/`
- tests in `packages/ui/src/<Component>/__tests__/`

Do not invent public API that is not exported from `packages/ui/src/index.ts` or the component package entrypoints.

## Required Workflow

1. Find the public component, its exported parts, and exported types.
2. Read the component source and relevant subcomponents.
3. Read the story file and reuse real consumer composition patterns from it.
4. Determine the component doc profile from `docs/components/structure.md`.
5. Create or update the needed files in `docs/components/<component>/`.
6. Ensure snippets are structurally complete and copyable.
7. Re-scan the touched docs for placeholders, pseudo-code, and drift from the source.
8. Before finishing, run a final validation pass on the exact files you changed.

## File Expectations

### `index.md`

- Short summary
- imports and exported types
- minimal composition that is actually useful
- required and optional parts
- variants, edge cases, common mistakes

Do not make minimal composition misleadingly empty if the component is compound or advanced interactive.

### `anatomy.md`

Use for compound components.

- overview
- required parts
- optional parts
- composition order
- valid composition
- invalid composition

The valid composition should show a real, coherent tree, not a shell with comments.

### `examples.md`

- use the shared taxonomy where relevant:
  `Basic`, `Controlled/Stateful`, `Form/Integration`, `Layout/Overlay`, `Error`, `Disabled`, `Edge`
- prefer production-style examples over toy snippets
- if a component is commonly used with overlays, forms, or state, show that explicitly

### `patterns.md`

- explain when to use the pattern
- include composition notes
- include trade-offs
- use realistic snippets, not abstract placeholders

### `styling.md`

- document only real public styling hooks
- prefer real CSS variables and real parts from source
- do not invent a token contract that does not exist

### `troubleshooting.md`

- focus on likely integration failures
- give a concrete fix snippet when composition is the issue

## Snippet Rules

- Snippets must use real exports from `@vega-ui/react`
- Snippets must be valid-looking and compositionally complete
- Repeated snippets may extract a local `const ... = (...)`, but that extracted value must still contain real code
- Keep examples concise, but not skeletal
- If a component family requires many parts, prefer one complete reusable snippet over many fake short snippets

## Writing Rules

- Keep tone factual and implementation-oriented
- Optimize for copyability and fast comprehension
- Prefer short explanation plus strong snippet over long prose plus weak snippet
- Do not document internal implementation details unless they change consumer usage

## Quality Checklist

- [ ] Docs match current source and stories
- [ ] No placeholder comments remain in code blocks
- [ ] No pseudo-code like `const calendar = /* ... */`
- [ ] Compound components have meaningful anatomy docs
- [ ] Examples show realistic usage, not only trivial shells
- [ ] Styling docs mention only real override points
- [ ] Troubleshooting covers actual consumer mistakes

## Final Validation Gate

Do not stop after writing docs. Before finishing, validate the touched files directly.

Minimum required checks:

1. Search the touched docs for placeholders and pseudo-code.
2. Compare the snippets against the current story and source composition.
3. Confirm that imports, exported parts, and types named in docs really exist.
4. Confirm that any repeated extracted snippet still contains real code, not shorthand comments.

Useful checks:

- search for placeholder comments:
  `rg -n "\\{\\/\\*.*\\*\\/\\}|TODO|same .* composition" docs/components/<component>`
- search for suspicious one-line fake compositions:
  `rg -n "<[A-Z][A-Za-z0-9]+\\s*/>" docs/components/<component>`
- compare against stories:
  `sed -n '1,220p' packages/ui/src/<Component>/<Component>.stories.tsx`

If the docs still contain placeholders, pseudo-code, or obviously dry snippets after this pass, the task is not done.

## Practical Heuristics

- If the story already contains the right composition, adapt it instead of re-inventing it
- If a one-line example hides essential composition, replace it with a fuller snippet
- If an example repeats often across field wrappers, duplication is acceptable when it keeps docs copyable
- For advanced interactive components, weak snippets are worse than slightly longer ones
- For new components, prefer a slightly longer but truthful snippet over a short misleading one
