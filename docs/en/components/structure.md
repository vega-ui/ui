# Component Documentation Structure

This file declares the expected documentation layout for component docs under `docs/components/<component>/`.

## Base Rule

Every component gets its own directory:

```text
docs/components/<component>/
```

The minimum required file is:

- `index.md`: primary entry page with summary, imports, one concrete example, variants, edge cases, and common mistakes

Every `index.md` should also declare the component's doc profile explicitly:

```md
## Doc Profile

`primitive`
```

## File Roles

- `anatomy.md`: composition contract for [compound components](../glossary.md#compound-component), required parts, optional parts, valid order, and invalid compositions
- `examples.md`: deeper scenario coverage beyond the primary example
- `api.md`: props, exported parts, types, and state model
- `styling.md`: public CSS variables, theming hooks, and safe override guidance
- `accessibility.md`: labeling, keyboard behavior, focus flow, and screen-reader semantics
- `comparison.md`: when to choose the component instead of similar controls
- `patterns.md`: reusable integration patterns and production flows
- `troubleshooting.md`: common failure modes, diagnostics, and fixes

Templates for these files live under `docs/components/_templates/`.

## Editorial Contract

Use a stable section order so component docs stay predictable across the library.

### `index.md`

Recommended order:

1. `# ComponentName`
2. `## Doc Profile`
3. `## Summary`
4. `## Imports`
5. `## Exported Types`
6. `## Minimal Composition` or `## Basic Usage`
7. `## Required Parts` and `## Optional Parts` for compound components
8. `## Composition Order` for compound components
9. `## Variants`
10. `## Related Docs`
11. `## Edge Cases`
12. `## Common Mistakes`

### `examples.md`

Recommended order:

1. `# ComponentName Examples`
2. `## Basic`
3. `## Controlled/Stateful`
4. `## Form/Integration`
5. `## Layout/Overlay`
6. `## Error`
7. `## Disabled`
8. `## Edge`

Each scenario block should use a `###` heading with one of the shared taxonomy prefixes.

### `api.md`

Recommended order:

1. `# ComponentName API`
2. `## Root API`
3. `## Child Parts API` when applicable
4. `## Hooks` when public hooks exist
5. `## Types`
6. `## State Model`
7. `## Integration Notes`

### `anatomy.md`

Recommended order:

1. `# ComponentName Anatomy`
2. `## Overview`
3. `## Required Parts`
4. `## Optional Parts`
5. `## Composition Order`
6. `## Valid Composition Patterns`
7. `## Invalid Composition Patterns`

### `styling.md`

Recommended order:

1. `# ComponentName Styling`
2. `## Overview`
3. `## Public CSS Variables`
4. `## Part-Level Variables`
5. `## State And Variant Interaction`
6. `## Examples`
7. `## Do Not Override`

### `accessibility.md`

Recommended order:

1. `# ComponentName Accessibility`
2. `## Labeling`
3. `## Keyboard Behavior`
4. `## Focus Behavior`
5. `## Screen Reader Semantics`
6. `## Form Semantics` when relevant
7. `## Accessibility Risks`

### `comparison.md`

Recommended order:

1. `# ComponentName Comparison`
2. `## Quick Decision Rule`
3. `## Component vs Component` sections
4. `## Choose This Component When`
5. `## Do Not Choose This Component When`

### `patterns.md`

Recommended order:

1. `# ComponentName Patterns`
2. Pattern sections grouped by product flow

Each pattern should describe:

- when to use it
- composition notes
- trade-offs
- example code

### `troubleshooting.md`

Recommended order:

1. `# ComponentName Troubleshooting`
2. problem-oriented sections

Each troubleshooting item should include:

- symptom
- likely cause
- how to verify
- fix

## Doc Profiles

Every public component should be assigned to one of these profiles. The profile defines the minimum required file set for that component.

### `primitive`

Use for low-complexity building blocks with a small API surface and no meaningful [composition contract](../glossary.md#composition-contract).

Required files:

- `index.md`

Typical candidates:

- `Text`
- `Heading`
- `Separator`
- `VisuallyHidden`

### `form-control`

Use for standalone field-like controls where consumers need examples, public props, and accessibility guidance, but do not need a [compound component](../glossary.md#compound-component) anatomy file.

Required files:

- `index.md`
- `examples.md`
- `api.md`
- `accessibility.md`

Typical candidates:

- `TextField`
- `TextArea`
- `NumberField`
- `PasswordField`
- `Checkbox`
- `Radio`
- `Switch`

### `compound`

Use for components built from a root plus exported child parts with a real [composition contract](../glossary.md#composition-contract).

Required files:

- `index.md`
- `anatomy.md`
- `examples.md`
- `api.md`

Typical candidates:

- `Select`
- `Dialog`
- `Drawer`
- `Sheet`
- `Popover`
- `Calendar`

### `advanced interactive`

Use for complex interactive systems where composition, accessibility, styling, troubleshooting, and component-choice guidance all materially affect integration success.

Required files:

- `index.md`
- `anatomy.md`
- `examples.md`
- `api.md`
- `styling.md`
- `accessibility.md`
- `comparison.md`
- `patterns.md`
- `troubleshooting.md`

Typical candidates:

- `Select`
- `Dialog`
- `Calendar`
- `PhoneField`
- `DataGrid`

The profile should be declared in `index.md`, and validation should check that the component directory contains the required file set for that profile.

## Example Taxonomy

Use these scenario prefixes inside `More Examples` when applicable:

- `Basic`
- `Controlled/Stateful`
- `Form/Integration`
- `Layout/Overlay`
- `Error`
- `Disabled`
- `Edge`

## Current Reference

`Select` is the current reference implementation of the full compound-component structure.
