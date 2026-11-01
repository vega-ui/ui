# Option

## Doc Profile

`primitive`

## Summary

`Option` is the presentational selectable-row primitive reused by list-like controls. It is a `div` with `role='option'` and selected, active, size, and disabled states, but it does not manage selection logic by itself. For a working list use [Listbox](../listbox/) or [Select](../select/).

## Imports

```tsx
import { Option, type OptionProps, type OptionSize } from '@vega-ui/react';
```

## Exported Types

- `OptionProps`
- `OptionSize`

## Basic Usage

```tsx
<Option>Alpha</Option>
```

## Variants

- Size: `xs`, `sm`, `md`, `lg`, `xl`
- State: selected, active, disabled
- Content: plain label or richer icon/text row

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

- `Option` is a UI primitive, not a full select or menu system.
- A disabled `Option` does not call `onClick`.
- Parent controls still need to own active, selected, and keyboard navigation logic coherently.

## Common Mistakes

- Using `Option` alone and expecting selection state management.
- Mixing `Option` size with a parent field size that does not match.
- Forgetting to coordinate `selected` and visible active state in the parent system.
