# DataGridPicker

## Doc Profile

`advanced interactive`

## Summary

`DataGridPicker` is the visual picker layer built on top of `DataGridSelectable`. It keeps the same selection engine while adding shared picker size and variant semantics for dense grids such as dates, months, years, and custom matrices.

## Imports

```tsx
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  DataGridPickerScroller,
  DataGridPickerScrollerContent,
  type DataGridPickerItemProps,
  type DataGridPickerProps,
  type DataGridPickerRowGroupProps,
  type DataGridPickerRowProps,
  type DataGridPickerScrollerContentProps,
  type DataGridPickerScrollerProps,
} from '@vega-ui/react';
```

## Exported Types

- `DataGridPickerProps<K, S>`
- `DataGridPickerItemProps`
- `DataGridPickerRowProps`
- `DataGridPickerRowGroupProps`
- `DataGridPickerScrollerProps`
- `DataGridPickerScrollerContentProps`

## Minimal Composition

```tsx
<DataGridPicker>
  <DataGridPickerRowGroup>
    <DataGridPickerRow row={0}>
      <DataGridPickerItem col={0} value='jan'>Jan</DataGridPickerItem>
      <DataGridPickerItem col={1} value='feb'>Feb</DataGridPickerItem>
    </DataGridPickerRow>
  </DataGridPickerRowGroup>
</DataGridPicker>
```

## Required Parts

- `DataGridPicker`: root picker behavior plus size and variant context
- `DataGridPickerRowGroup`
- `DataGridPickerRow`
- `DataGridPickerItem`

## Optional Parts

- `DataGridPickerScroller`
- `DataGridPickerScrollerContent`

## Composition Order

1. `DataGridPicker`
2. optional `DataGridPickerScroller`
3. `DataGridPickerScrollerContent` when scrolling is used
4. `DataGridPickerRowGroup`
5. `DataGridPickerRow`
6. `DataGridPickerItem`

## Variants

- Variant: `primary`, `secondary`
- Size: `xs`, `sm`, `md`, `lg`, `xl`
- Selection: `single`, `multiple`, `range`
- Layout: static grid or scroller-based paging

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

- Verify active, focused, and selected states independently.
- Scrollable pickers should preserve keyboard navigation and visible focus.
- Scoped row groups matter in paged scroller compositions.

## Common Mistakes

- Treating picker items as plain layout nodes without selection semantics.
- Forgetting to test scroll and keyboard interaction together.
- Rebuilding item styling manually when the picker layer already defines the intended visual semantics.
