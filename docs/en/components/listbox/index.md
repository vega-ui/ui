# Listbox

## Doc Profile

`form-control`

## Summary

`Listbox` is an always visible list to choose one or several options from, like a native `select` with `size`. The focus stays on the list, which points to the active option with `aria-activedescendant`.

## Imports

```tsx
import { Listbox, ListboxGroup, ListboxOption, type ListboxGroupProps, type ListboxOptionProps, type ListboxProps, type ListboxValue } from '@vega-ui/react';
```

## Exported Types

- `ListboxProps`
- `ListboxOptionProps`
- `ListboxGroupProps`
- `ListboxValue`

## Basic Usage

<!-- example: listbox/basic-usage.tsx -->
```tsx
import { Listbox, ListboxOption } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Listbox aria-label='Delivery method' defaultValue='courier' style={{ width: '100%', maxWidth: 280, border: '1px solid var(--separator-opaque)' }}>
      <ListboxOption value='pickup'>Pickup point</ListboxOption>
      <ListboxOption value='courier'>Courier to the door</ListboxOption>
      <ListboxOption value='locker'>Parcel locker</ListboxOption>
    </Listbox>
  );
}
```
<!-- /example -->

## Variants

- Selection: one value, or an array with `multiple`
- Size: `xs`, `sm`, `md`, `lg`, `xl`
- Content: plain text, or markup with `label` for typeahead

## Related Docs

- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [Anatomy](./anatomy.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)
- [Select](../select/)
- [Option](../option/)

## Edge Cases

- `value={null}` clears a controlled single list, while `undefined` makes it uncontrolled.
- A disabled list disables all its options, whatever their own `disabled` is.
- Options are read from the DOM on each key press, so filtering and adding them needs no registration.
- The height is plain CSS on the list, which scrolls by itself.

## Common Mistakes

- Leaving the list without `aria-label` or `aria-labelledby`.
- Giving two options the same `value`.
- Using `Listbox` for a compact form field, where [Select](../select/) fits better.
