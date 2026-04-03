# Option

## Doc Profile

`primitive`

## Summary

`Option` is the presentational selectable-row primitive reused by list-like controls. It is a button-like `role='option'` surface with selected, focusable, size, and disabled states, but it does not manage selection logic by itself.

## Imports

```tsx
import { Option, type OptionProps, type OptionSize } from '@vega-ui/react';
```

## Exported Types

- `OptionProps<V>`
- `OptionSize`

## Basic Usage

```tsx
<Option value='alpha'>Alpha</Option>
```

## Variants

- Size: `sm`, `md`, `lg`
- State: selected, focusable, disabled
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
- `value` should stay scalar and stable.
- Parent controls still need to own active, selected, and keyboard navigation logic coherently.

## Common Mistakes

- Using `Option` alone and expecting selection state management.
- Mixing `Option` size with a parent field size that does not match.
- Forgetting to coordinate `selected` and visible active state in the parent system.
