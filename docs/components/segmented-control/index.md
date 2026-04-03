# SegmentedControl

## Doc Profile

`advanced interactive`

## Summary

`SegmentedControl` is a [compound component](../../glossary.md#compound-component) for short, always-visible exclusive option sets, with item-level hidden inputs and an animated selected-state indicator. It is the visibility-first exclusive-choice control when options should stay comparable at a glance.

## Imports

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
  SegmentedControlItemHiddenInput,
  type SegmentedControlProps,
  type SegmentedControlSize,
  type SegmentedControlVariant,
} from '@vega-ui/react';
```

## Exported Types

- `SegmentedControlProps`
- `SegmentedControlItemProps`
- `SegmentedControlIndicatorProps`
- `SegmentedControlItemHiddenInputProps`
- `SegmentedControlSize`
- `SegmentedControlVariant`

## Minimal Composition

```tsx
<SegmentedControl name='view' defaultValue='week'>
  <SegmentedControlItem value='day'>
    <SegmentedControlItemHiddenInput />
    Day
  </SegmentedControlItem>
  <SegmentedControlItem value='week'>
    <SegmentedControlItemHiddenInput />
    Week
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```

## Required Parts

- `SegmentedControl`: root selection and indicator owner
- `SegmentedControlItem`: visible selectable segment
- `SegmentedControlIndicator`: selected-state surface

## Optional Parts

- `SegmentedControlItemHiddenInput`: native radio semantics and form participation

## Composition Order

1. `SegmentedControl`
2. `SegmentedControlItem`
3. `SegmentedControlItemHiddenInput`
4. visible item content
5. `SegmentedControlIndicator`

## Variants

- Sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Variants: `primary`, `secondary`
- States: selected, unselected, disabled

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Hidden inputs matter for native form and radio-group semantics.
- Long or highly uneven labels can break visual balance.
- Use `Select` when the option set is no longer small and always-visible.
- If each option needs title, description, or card-like content, `SegmentedControl` is usually too dense for the job.

## Common Mistakes

- Using segmented control for large option sets.
- Omitting hidden inputs in native form flows.
- Letting labels vary too much in length and breaking segment balance.
