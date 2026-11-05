# ComponentName

Use this file for the primary entry page of every component.

## Recommended Sections

## Doc Profile

Use exactly one of:

- `primitive`
- `form-control`
- `compound`
- `advanced interactive`

## Summary

One short paragraph describing the component’s role in the design system.

## Imports

```tsx
import { ComponentName } from '@vega-ui/react';
```

## Exported Types

- `ComponentProps`
- `ComponentVariant`
- `ComponentSize`

List only public types that matter to consumers.

## Minimal Composition

Use `Basic Usage` for simple components and `Minimal Composition` for compound components.

```tsx
// minimal working example
```

## Required Parts

Add only for compound components.

- `Root`: what it owns
- `ChildPart`: what it renders

## Optional Parts

Add only for compound components.

- `OptionalPart`: when it helps and when it can be omitted

## Composition Order

Add only for compound components.

1. `Root`
2. `Required child`
3. `Optional child`

## Variants

- visual variants
- size variants
- behavior variants when relevant

## Related Docs

Link to any additional files that exist for the component:

- `anatomy.md`
- `examples.md`
- `api.md`
- `styling.md`
- `accessibility.md`
- `comparison.md`
- `patterns.md`
- `troubleshooting.md`

## Edge Cases

- controlled vs uncontrolled behavior
- disabled vs read-only behavior
- overlay, form, or async integration notes

## Common Mistakes

- predictable integration errors
- unsupported value shapes
- missing composition parts

## Guidance

- Keep `index.md` short and navigable.
- Put the minimal safe composition here, not every scenario.
- Move heavier patterns, API tables, and diagnostics into dedicated files.
