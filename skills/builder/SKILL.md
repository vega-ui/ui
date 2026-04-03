---
name: builder
description: Use when the user wants to create a custom UI kit on top of VegaUI. Helps define a branded theme, wrapper components, opinionated defaults, composed patterns, exports, and docs without forking the base component layer. Uses @vega-ui/react, @vega-ui/theme-core, docs/styling, and real component docs as the source of truth.
---

# Builder

Use this skill when the task is to build a product-specific or brand-specific UI kit on top of VegaUI rather than editing VegaUI itself.

## Goal

Create a coherent application-facing UI kit that:

- reuses `@vega-ui/react` as the component foundation
- reuses `@vega-ui/theme-core` as the semantic theme base
- introduces product branding through semantic theme overrides
- adds wrapper components only where the product needs opinionated defaults or composition
- exposes a cleaner app-facing import surface for the consuming product

Do not fork VegaUI for routine branding or product defaults.

## Sources Of Truth

Read these first:

- `docs/getting-started.md`
- `docs/architecture.md`
- `docs/styling/README.md`
- `docs/styling/themes.md`
- `docs/styling/css-variables.md`
- `docs/components/README.md`
- relevant component docs in `docs/components/<component>/`

Then read the actual source only for components you plan to wrap:

- `packages/ui/src/<Component>/`
- `packages/ui/src/<Component>/*.stories.tsx`

Read these references when needed:

- `references/kit-architecture-patterns.md`
- `references/wrapper-vs-pattern-vs-theme.md`

## Default Strategy

Prefer this order of customization:

1. app-level theme class built on semantic variables
2. wrapper components with fixed defaults
3. composed product patterns built from VegaUI parts
4. a product export surface that re-exports approved primitives and wrappers

Only modify VegaUI source when the library itself is missing a capability that wrappers and theming cannot provide.

## What To Build

A product UI kit usually needs some combination of:

- a custom theme class such as `.brand-acme`
- an app shell that applies the theme class high in the tree
- wrapper primitives such as `PrimaryButton`, `AppDialog`, `FormField`, `AppSelect`
- product patterns such as `FilterDrawer`, `SettingsSection`, `DateRangeFilter`, `EmptyStateCard`
- a single package or folder that acts as the app-facing import surface
- local docs that explain the approved kit, not the whole VegaUI surface

## Architecture Rules

- Keep VegaUI as the foundation, not the public product language by itself.
- Brand through semantic variables first, not per-component hacks.
- Avoid editing VegaUI CSS modules just to change brand colors or spacing defaults.
- Do not expose raw VegaUI internals as your product contract unless you intend to support them.
- If your product kit wraps a component, give it a stable app-facing name and documented purpose.

## Theme Workflow

1. Import `@vega-ui/theme-core` and `@vega-ui/react/style.css`.
2. Define a product theme class that overrides semantic variables, for example:
   - `--background-color`
   - `--text-color`
   - `--surface-primary`
   - `--surface-secondary`
   - `--border-color`
   - `--focus-color`
   - `--fills-primary`
   - `--fills-secondary`
   - `--label-secondary`
3. Apply the theme class once at the app boundary.
4. Test key surfaces:
   - app shell
   - overlays
   - fields
   - selected states
   - disabled states

Prefer semantic variables over raw palette tokens in component-facing overrides.

## Wrapper Workflow

Create wrappers when the product needs:

- fixed variants or sizes
- required icons
- stronger labeling conventions
- consistent layout or spacing
- protected composition for advanced interactive components

Good wrapper examples:

- `PrimaryButton` = Vega `Button` with locked variant, size, and loading conventions
- `AppTextField` = `TextField` composition with label, helper text, and error placement
- `AppDialog` = standard `Dialog` shell with header and close affordance
- `BookingCalendar` = product-specific calendar composition with approved header and custom day cell content

Bad wrapper examples:

- wrappers that only rename a component without adding product meaning
- wrappers that hide important public behavior with no documentation
- wrappers that diverge from VegaUI source behavior in undocumented ways

## Export Surface Workflow

When building the product kit, define an explicit export policy:

- re-export safe VegaUI primitives unchanged
- export wrappers for approved defaults and product patterns
- keep internal experiments out of the public app-facing index

A good product-kit structure often looks like:

```text
product-ui/
  theme/
  components/
  patterns/
  index.ts
```

Where:

- `theme/` defines the brand theme class and entrypoint imports
- `components/` contains wrappers
- `patterns/` contains higher-level compositions
- `index.ts` is the approved public API

## Decision Heuristics

Use theme-only customization when:

- the product mainly needs branding
- defaults are close to VegaUI already
- component behavior should remain library-native

Use wrappers when:

- the product repeats the same props or composition constantly
- design rules must be enforced
- overlays, fields, and advanced interactive components need one approved structure

Use higher-level patterns when:

- the product needs reusable business UI, not just styled primitives
- one feature combines several VegaUI parts repeatedly

## Validation Checklist

- [ ] Theme imports are present: `@vega-ui/theme-core` and `@vega-ui/react/style.css`
- [ ] Theme class is applied high in the tree
- [ ] Semantic variables are overridden before component-local variables
- [ ] Wrappers add real product meaning
- [ ] Advanced components keep truthful composition
- [ ] Product export surface is explicit
- [ ] Docs describe the product kit, not just raw VegaUI
- [ ] No fork-like changes were made to VegaUI without a clear library-level reason

## Final Validation Gate

Before finishing:

1. Check whether the task can be solved with theming alone before introducing wrappers.
2. Check whether each wrapper exists for a concrete product rule.
3. Compare wrapped components against the underlying VegaUI docs and stories.
4. Confirm that your product kit still imports and composes VegaUI truthfully.
5. If you created docs for the kit, make sure they document the app-facing contract, not hidden VegaUI internals.

Useful checks:

- inspect theme guidance:
  `sed -n '1,240p' docs/styling/themes.md`
- inspect component docs:
  `find docs/components/<component> -maxdepth 1 -type f | sort`
- inspect source-backed usage:
  `sed -n '1,220p' packages/ui/src/<Component>/<Component>.stories.tsx`

## Practical Heuristics

- Start by choosing the smallest possible kit surface.
- Re-export less than you think.
- Brand globally, specialize locally.
- Protect complex composition behind product patterns when misuse is likely.
- Prefer one strong product wrapper over many tiny aliases.
- If the product team keeps copying the same VegaUI snippet, that is a wrapper candidate.
