---
name: component
description: Use when creating a new standalone component on top of VegaUI. Helps choose the right VegaUI primitives, compose them into a product-facing component, define a stable API, apply theme-safe styling, add realistic stories and tests, and avoid rebuilding behavior that VegaUI already provides.
---

# Component

Use this skill when the task is to create a new component that should be built with VegaUI as the foundation.

## Goal

Build a new component that:

- reuses `@vega-ui/react` primitives and compound parts where possible
- exposes a clean product-facing API
- follows VegaUI semantic styling instead of hardcoded local hacks
- avoids reimplementing behavior that already exists in VegaUI
- ships with realistic stories, tests, and docs when needed

This skill is for building new components with VegaUI, not for editing VegaUI internals unless that is truly necessary.

## Sources Of Truth

Read these first:

- `docs/getting-started.md`
- `docs/architecture.md`
- `docs/styling/themes.md`
- `docs/components/README.md`
- `docs/components/structure.md`

Then inspect the relevant foundation pieces:

- `packages/ui/src/<Component>/`
- `packages/ui/src/<Component>/*.stories.tsx`
- nearby components that solve similar interaction patterns

Read these references when needed:

- `references/component-decision-tree.md`
- `references/story-test-doc-checklist.md`

Use VegaUI docs and stories as the behavior and composition baseline.

## First Design Question

Before writing code, decide which of these you are building:

1. a thin wrapper with fixed defaults
2. a composed component that combines several VegaUI parts
3. a new product component with its own API but built from VegaUI primitives

Prefer the smallest one that solves the problem.

## Component Creation Strategy

Use this order of preference:

1. configure an existing VegaUI component
2. wrap an existing VegaUI component
3. compose several VegaUI components into one product component
4. add custom local behavior only for the gap VegaUI does not cover

Do not rebuild:

- focus management
- keyboard navigation
- selection mechanics
- overlay dismissal
- field semantics

if VegaUI already provides them.

## API Design Rules

The new component API should:

- expose product meaning, not raw internal wiring
- keep prop count small
- reuse VegaUI prop types where that improves correctness
- hide internal composition unless consumers truly need it
- avoid leaking unstable implementation details

Good examples:

- `status`, `tone`, `emptyMessage`, `actions`
- `value`, `onChange`, `disabled`
- `size`, `variant` only if the product wants them to stay configurable

Risky examples:

- forwarding every internal child prop by default
- exposing low-level refs and sub-parts with no documented need
- using names that duplicate VegaUI semantics but mean something different

## Styling Rules

- Prefer semantic theme variables first
- Reuse VegaUI spacing, surface, text, border, and focus semantics
- Add component-local CSS variables only when the component has a real reusable local contract
- Do not hardcode brand colors when a semantic variable should drive the result

If the component needs heavy styling overrides to make VegaUI usable, revisit the composition choice first.

## Implementation Workflow

1. Define the user-facing behavior and public API.
2. Identify the VegaUI primitives or compound parts to reuse.
3. Create the component in the product-facing location.
4. Add local styles only for layout or component-specific presentation.
5. Add realistic stories.
6. Add or update tests for the real interaction contract.
7. Add docs if the component is public in this repository.

## Story Requirements

Every new component should get stories that show:

- default usage
- important controlled or stateful usage if applicable
- disabled or error state if applicable
- realistic composition, not toy-only snippets

If the component wraps an advanced VegaUI primitive, the story should prove that the wrapped composition still works as intended.

## Test Requirements

Add tests when the component has:

- custom state transitions
- transformed `onChange` behavior
- protected composition rules
- disabled, error, or edge-case behavior
- wrapper logic that could drift from the underlying VegaUI primitive

## Docs Requirements

If the component is public in this repository, document it using the local docs profile from `docs/components/structure.md`.

If it is internal to a product kit, document at least:

- what it wraps or composes
- why it exists
- what consumers should use instead of the raw VegaUI parts

## Review Questions

Before finishing, ask:

- Could this have been only a themed VegaUI component?
- Could this have been only a thin wrapper?
- Am I reimplementing behavior VegaUI already owns?
- Is the public API smaller and clearer than the internal composition?
- Are styles using semantic variables first?
- Do stories and tests reflect real consumer usage?

## Final Validation Gate

Before finishing:

1. Compare the new component to the VegaUI primitives it builds on.
2. Confirm that any custom behavior fills a real gap instead of duplicating library behavior.
3. Confirm that stories are realistic and structurally complete.
4. Confirm that tests cover the component-specific contract.
5. If docs were added, confirm they match source and stories.

Useful checks:

- inspect similar components:
  `find packages/ui/src -maxdepth 2 -type f | rg '<keyword>|<related component>'`
- inspect source-backed usage:
  `sed -n '1,220p' packages/ui/src/<Component>/<Component>.stories.tsx`
- inspect docs expectations:
  `sed -n '1,220p' docs/components/structure.md`

## Practical Heuristics

- Compose more, reinvent less.
- A good new component usually removes repeated product code.
- If consumers still need to know too much about the underlying VegaUI wiring, the abstraction is weak.
- If your wrapper has no product opinion, it may not need to exist.
- Slightly longer truthful composition is better than a tiny misleading abstraction.
