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

<!-- example: slot/basic-usage.tsx -->
```tsx
import type { HTMLAttributes } from 'react';
import { Slot } from '@vega-ui/react';

interface TagProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean
}

const tagStyle = {
  display: 'inline-flex',
  padding: 'var(--spacing-1) var(--spacing-5)',
  border: 'none',
  borderRadius: 999,
  background: 'var(--fills-secondary)',
  color: 'var(--label-primary)',
  font: 'inherit',
  fontSize: 'var(--font-size-2)',
  textDecoration: 'none',
  cursor: 'pointer',
};

function Tag({ asChild, children, ...props }: TagProps) {
  if (asChild) {
    return <Slot style={tagStyle} {...props}>{children}</Slot>;
  }

  return <span style={tagStyle} {...props}>{children}</span>;
}

export default function BasicUsage() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
      <Tag>Design</Tag>
      <Tag asChild>
        <a href='/tags/accessibility'>Accessibility</a>
      </Tag>
      <Tag asChild>
        <button type='button' onClick={() => alert('Filtering by React')}>React</button>
      </Tag>
    </div>
  );
}
```
<!-- /example -->

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
