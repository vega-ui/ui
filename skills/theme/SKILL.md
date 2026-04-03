---
name: theme
description: Use when creating or updating a branded theme on top of VegaUI. Helps map brand decisions onto VegaUI semantic theme variables, define app-level theme classes, validate contrast and state coverage, and avoid raw-token misuse or component-local hacks when a semantic override is the right tool.
---

# Theme

Use this skill when the task is to create, revise, or audit a custom theme built on top of VegaUI.

## Goal

Produce a stable app-level theme that:

- starts from `@vega-ui/theme-core`
- overrides semantic variables instead of rewriting component CSS
- keeps component states readable across the kit
- gives the product a distinct brand without breaking VegaUI interaction semantics

## Sources Of Truth

Read these first:

- `docs/getting-started.md`
- `docs/architecture.md`
- `docs/styling/README.md`
- `docs/styling/themes.md`
- `docs/styling/css-variables.md`
- `docs/styling/tokens.md`
- `packages/tokens/README.md`

Read these references when needed:

- `references/semantic-theme-checklist.md`
- `references/component-validation-surfaces.md`
- `references/theme-smells.md`

When auditing a specific component family, also read:

- `docs/components/<component>/styling.md`
- the component CSS module in `packages/ui/src/<Component>/`

## Default Theme Strategy

Always prefer this order:

1. start from `@vega-ui/theme-core`
2. define a product theme class such as `.brand-acme`
3. override semantic variables in that class
4. use component-local variables only when the change should affect one family instead of the whole application

Do not start by editing component CSS modules unless the theme layer cannot express the requirement.

## Core Rule

Map brand design into semantic roles, not directly into component implementation details.

Good:

- `--background-color`
- `--text-color`
- `--surface-primary`
- `--surface-secondary`
- `--border-color`
- `--focus-color`
- `--fills-primary`
- `--fills-secondary`
- `--label-primary`
- `--label-secondary`
- `--color-error`

Risky:

- raw palette values applied directly to one component family
- per-component color hacks before the semantic layer is defined
- brand overrides that make focus, disabled, hover, or pressed states ambiguous

## Theme Workflow

1. Confirm the app imports:
   - `@vega-ui/theme-core`
   - `@vega-ui/react/style.css`
2. Choose the theme boundary class name.
3. Define the semantic variable mapping in one place.
4. Apply the theme class high in the app tree.
5. Validate the major semantic surfaces:
   - app background
   - default text
   - elevated surfaces
   - floating surfaces
   - borders
   - focus rings
   - selected fills
   - disabled states
   - error states
6. Only then decide whether any component-family override is still needed.

## Minimum Semantic Coverage

Do not call a theme finished until it has intentional values for:

- `--background-color`
- `--text-color`
- `--surface-primary`
- `--surface-secondary`
- `--border-color`
- `--border-color-hover`
- `--focus-color`
- `--fills-primary`
- `--fills-primary-hover`
- `--fills-primary-active`
- `--fills-secondary`
- `--fills-tertiary`
- `--label-primary`
- `--label-secondary`
- `--label-tertiary`
- `--disable-background-color`
- `--disable-text-color`
- `--disable-border-color`
- `--color-error`
- `--surface-shadow`

## Validation Surfaces

Check these components before considering the theme stable:

- `Button`
- `TextField`
- `Select`
- `Checkbox`
- `Radio`
- `Dialog`
- `Drawer`
- `Sheet`
- `Popover`
- `Tooltip`
- `Card`
- `Table`
- `Calendar` or another advanced interactive component if the product uses it

## Theme Smells

These are signs the theme is wrong:

- focus rings disappear into surfaces
- disabled and enabled controls look too similar
- selected states do not read as selected
- elevated overlays blend into the page background
- placeholder text and actual values are hard to distinguish
- error state is only “redder” but not structurally clearer
- the brand palette forces many component-local overrides to stay usable

## Raw Token Guidance

Use raw tokens only to build semantic variables.

Do not recommend app code or component overrides like:

- `background: var(--color-blue-500)`
- `border-color: var(--color-red-300)`

Prefer semantic variables instead, unless the task is explicitly about defining the semantic mapping itself.

## Output Expectations

A theme task should usually produce:

- a theme class or theme stylesheet
- a short explanation of semantic mapping decisions
- a list of validated component surfaces
- any residual risks, such as dark-mode parity or weak contrast areas

## Final Validation Gate

Before finishing:

1. Check whether the change was done at the semantic layer whenever possible.
2. Verify that raw palette tokens are not leaking into consumer-level component usage unnecessarily.
3. Verify that the app boundary applies the theme class once and high enough in the tree.
4. Check focus, disabled, hover, active, selected, and error states.
5. If component-local overrides were added, justify why the semantic layer was insufficient.

Useful checks:

- inspect semantic theme guidance:
  `sed -n '1,240p' docs/styling/themes.md`
- inspect token guidance:
  `sed -n '1,220p' packages/tokens/README.md`
- inspect component styling docs:
  `sed -n '1,220p' docs/components/<component>/styling.md`

## Practical Heuristics

- Brand globally first, component-locally second.
- A good theme reduces wrapper noise instead of increasing it.
- If every component needs custom overrides, the semantic theme is underspecified.
- Contrast and state readability matter more than exact palette purity.
- The best branded theme still feels internally consistent across overlays, fields, and interactive states.
