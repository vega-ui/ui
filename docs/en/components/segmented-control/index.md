# SegmentedControl

## Doc Profile

`advanced interactive`

## Summary

`SegmentedControl` is a [compound component](../../glossary.md#compound-component) for short, always-visible exclusive option sets, with item-level native radio inputs and an animated selected-state indicator. It is the visibility-first exclusive-choice control when options should stay comparable at a glance.

## Imports

```tsx
import {
  SegmentedControl,
  SegmentedControlItem,
  SegmentedControlIndicator,
  SegmentedControlItemInput,
  type SegmentedControlProps,
  type SegmentedControlSize,
  type SegmentedControlVariant,
} from '@vega-ui/react';
```

## Exported Types

- `SegmentedControlProps`
- `SegmentedControlItemProps`
- `SegmentedControlIndicatorProps`
- `SegmentedControlItemInputProps`
- `SegmentedControlSize`
- `SegmentedControlVariant`

## Minimal Composition

<!-- example: segmented-control/minimal-composition.tsx -->
```tsx
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <SegmentedControl name='billing-period' defaultValue='monthly' aria-label='Billing period'>
      <SegmentedControlItem value='monthly'>
        <SegmentedControlItemInput />
        Monthly
      </SegmentedControlItem>
      <SegmentedControlItem value='yearly'>
        <SegmentedControlItemInput />
        Yearly
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MySegmentedControl` passes its props to `SegmentedControl`, typed by the value of its items, and adds the indicator after its items; `MySegmentedControlItem` passes its props to the item and adds the radio before its content. See [Component recipes](../../recipes.md).

<!-- example: segmented-control/recipe.tsx -->
```tsx
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  type SegmentedControlItemProps,
  type SegmentedControlProps,
  type SegmentedControlValue,
} from '@vega-ui/react';

export function MySegmentedControl<Value extends SegmentedControlValue>({ children, ...props }: SegmentedControlProps<Value>) {
  return (
    <SegmentedControl {...props}>
      {children}
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}

export function MySegmentedControlItem({ children, ...props }: SegmentedControlItemProps) {
  return (
    <SegmentedControlItem {...props}>
      <SegmentedControlItemInput />
      {children}
    </SegmentedControlItem>
  );
}

export default function Recipe() {
  return (
    <MySegmentedControl name='report-range' defaultValue='month' aria-label='Report range'>
      <MySegmentedControlItem value='week'>Week</MySegmentedControlItem>
      <MySegmentedControlItem value='month'>Month</MySegmentedControlItem>
      <MySegmentedControlItem value='quarter'>Quarter</MySegmentedControlItem>
    </MySegmentedControl>
  );
}
```
<!-- /example -->

## Required Parts

- `SegmentedControl`: root selection and indicator owner
- `SegmentedControlItem`: visible selectable segment
- `SegmentedControlItemInput`: native radio inside every item — focus, arrow keys, selection and form value
- `SegmentedControlIndicator`: selected-state surface

## Optional Parts

- None

## Composition Order

1. `SegmentedControl`
2. `SegmentedControlItem`
3. `SegmentedControlItemInput`
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
- Leaving out `SegmentedControlItemInput`, which is the actual radio control.
- Letting labels vary too much in length and breaking segment balance.
