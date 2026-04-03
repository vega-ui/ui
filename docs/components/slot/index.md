# Slot

## Doc Profile

`primitive`

## Summary

`Slot` is the low-level polymorphic composition primitive behind VegaUI `asChild` APIs. It clones exactly one valid React element and merges parent props into that child.

## Imports

```tsx
import { Slot, type SlotProps } from '@vega-ui/react/Slot';
```

## Exported Types

- `SlotProps<T>`

## Basic Usage

```tsx
<ButtonBase asChild>
  <a href='/pricing'>Pricing</a>
</ButtonBase>
```

## Variants

- `Slot` itself has no visual variants.
- Practical variation comes from the parent component that uses `asChild`.

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- The child must be exactly one valid React element.
- `Slot` changes rendering, not semantics; the chosen child element still defines the final HTML semantics.
- Prop merging can produce surprising behavior if parent and child both define competing handlers or attributes.

## Common Mistakes

- Using `Slot` directly when a higher-level `asChild` API already exists.
- Passing text or fragments instead of one valid element.
- Swapping semantics unintentionally by slotting the wrong element type.
