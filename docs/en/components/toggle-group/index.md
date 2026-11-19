# ToggleGroup

## Doc Profile

`advanced interactive`

## Summary

`ToggleGroup` keeps the value of its `ToggleGroupToggle` items, toggle buttons with a `value` each. By default one item is pressed at a time, as a `radiogroup` of `radio` items in the [WAI-ARIA toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/); with `multiple`, each item turns on and off by itself and the value is an array. The group is one Tab stop, and the arrow keys move the focus between its items without pressing them. Use it for a choice that applies at once, like an alignment, a view mode or a set of filters.

## Imports

```tsx
import {
  ToggleGroup,
  ToggleGroupToggle,
  type ToggleGroupProps,
  type ToggleGroupToggleProps,
  type ToggleGroupValue,
} from '@vega-ui/react';
```

## Exported Types

- `ToggleGroupProps`
- `ToggleGroupToggleProps`
- `ToggleGroupValue`

## Minimal Composition

<!-- example: toggle-group/minimal-composition.tsx -->
```tsx
import { Icon, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';
import { TextAlignCenterIcon, TextAlignEndIcon, TextAlignStartIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <ToggleGroup aria-label='Alignment' size='sm' defaultValue='start'>
      <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
      <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
      <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
    </ToggleGroup>
  );
}
```
<!-- /example -->

## Required Parts

- `ToggleGroup`: the group, named by your `aria-label` or `aria-labelledby`
- `ToggleGroupToggle`: an item of the group, with a unique `value`

## Optional Parts

- `Icon` inside an item: next to the text, or alone with `square` and an `aria-label`
- [Toolbar](../toolbar/) around the group: its items join the navigation of the toolbar

## Composition Order

1. `ToggleGroup`
2. `ToggleGroupToggle`, each with a unique `value`, in the order they are shown
3. Its content: `Icon` and text, or an `Icon` alone with `square`

## Variants

- One pressed item (default), with a `string | null` value, or each item by itself with `multiple` and a `string[]` value
- Uncontrolled through `defaultValue`, or controlled through `value` and `onChangeValue`
- Sizes through `size`: `xs`, `sm`, `md`, `lg`, `xl`, as in `Button`; `size` on an item overrides it
- Disabled through `disabled` on the group for all its items, or on an item for that item only
- Items with text, an icon and text, or an icon alone with `square` and an `aria-label`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)
- [Toggle](../toggle/)

## Edge Cases

- `ToggleGroupToggle` has no pressed state of its own: the value of the group decides which items are pressed, and the group reports changes through `onChangeValue`.
- Without `multiple`, pressing the pressed item again keeps it pressed, as a radio does: the value never goes back to `null` by a press. Start with `defaultValue={null}` for no pressed item.
- The arrow keys of both axes move the focus and wrap around the ends, and Home and End jump to the first and last item; none of them presses an item. Tab enters the group on the pressed item, or on the first enabled item when none is pressed; with `multiple`, on the item of the first value in the array. After the focus leaves the group, its Tab stop goes back to the pressed item.
- Inside a [Toolbar](../toolbar/), the group gives its Tab stop and arrow keys to the toolbar, and its items join the toolbar without `ToolbarItem`; Tab then enters the toolbar on its first item, not on the pressed item of the group.
- The group has no orientation: it is a row. Set `flex-direction: column` yourself for a column, like in a vertical toolbar.
- The group renders no hidden inputs: its value is not part of a form submission.

## Common Mistakes

- Leaving the group or an icon-only item without `aria-label`: the components never set a label themselves.
- Giving two items the same `value`: the group tells its items apart only by `value`.
- Putting a [Toggle](../toggle/), a `Button` or a link inside the group: only `ToggleGroupToggle` items are items of the group.
- Wrapping the items in `ToolbarItem` inside a [Toolbar](../toolbar/): they register with the toolbar by themselves, and a `ToolbarItem` registers them a second time.
- Using the group for a value a form submits: use [SegmentedControl](../segmented-control/), [Radio](../radio/) or [Checkbox](../checkbox/).
