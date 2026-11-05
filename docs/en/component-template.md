# Component Documentation Template

See `docs/components/structure.md` for the canonical file layout and section order.

## Summary

One short paragraph describing the component’s role in the design system.

## Imports

```tsx
import { ComponentName } from '@vega-ui/react';
```

## Exported Types

- `ComponentProps`
- `ComponentSize`
- Other public helper types or subcomponents

## Basic Usage

```tsx
// Minimal working example
```

## More Examples

### Basic: alternate common path

```tsx
// Another common usage path
```

### Controlled/Stateful: external state or imperative control

```tsx
// Controlled or stateful example when applicable
```

### Form/Integration: composition with labels, forms, or related components

```tsx
// Integration example when applicable
```

### Layout/Overlay: embedded usage in layout containers or overlays

```tsx
// Layout or overlay example when applicable
```

### Error: validation or failure state

```tsx
// Error example when applicable
```

### Disabled: unavailable or locked state

```tsx
// Disabled example when applicable
```

### Edge: loading, fallback, excluded, destructive, or other boundary case

```tsx
// Edge example when applicable
```

## Variants

- `variantName`: when to use it
- `sizeName`: when to use it
- Composition variants if the component exposes child parts

## Composition

Describe whether the component is standalone or requires child slots, portals, hidden inputs, triggers, and so on.

## Key Props

- `propName`: what changes in behavior
- `propName`: controlled or uncontrolled semantics

## Edge Cases

- Disabled or read-only behavior
- Controlled state synchronization
- Overlay or portal integration
- Accessibility notes

## Common Mistakes

- Passing unsupported value shapes
- Using the low-level primitive instead of the high-level component
- Missing required accessibility attributes such as labels or hidden inputs

## Related Files

- `packages/ui/src/ComponentName/ComponentName.tsx`
- `packages/ui/src/ComponentName/ComponentName.stories.tsx`
- `packages/ui/src/ComponentName/__tests__/...`
