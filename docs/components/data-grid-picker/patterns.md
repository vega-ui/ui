# DataGridPicker Patterns

## Dense Choice Matrix

When to use:
Present many short options in a grid where the picker shape is part of the product experience.

Composition notes:
Use `DataGridPickerItem` for every selectable cell and let the picker layer own active and selected styling.

Trade-offs:
The layout is space-efficient, but each item needs strong visual clarity because labels are short.

```tsx
<DataGridPicker size='sm'>
  <DataGridPickerRowGroup>
    <DataGridPickerRow row={0}>
      <DataGridPickerItem col={0} value='q1'>Q1</DataGridPickerItem>
      <DataGridPickerItem col={1} value='q2'>Q2</DataGridPickerItem>
    </DataGridPickerRow>
    <DataGridPickerRow row={1}>
      <DataGridPickerItem col={0} value='q3'>Q3</DataGridPickerItem>
      <DataGridPickerItem col={1} value='q4'>Q4</DataGridPickerItem>
    </DataGridPickerRow>
  </DataGridPickerRowGroup>
</DataGridPicker>
```

## Paged Picker

When to use:
The choice set is large enough that it should be paged horizontally.

Composition notes:
Wrap the grid in `DataGridPickerScroller` and use row-group scope to keep page identity stable.

Trade-offs:
You gain density and swipe-like paging, but focus and active-state restoration become more important.

```tsx
<DataGridPicker>
  <DataGridPickerScroller>
    <DataGridPickerScrollerContent>
      <DataGridPickerRowGroup scope={pageIndex}>
        <DataGridPickerRow row={0}>
          <DataGridPickerItem col={0} value={`${pageIndex}:0:0`}>😀</DataGridPickerItem>
          <DataGridPickerItem col={1} value={`${pageIndex}:0:1`}>🚀</DataGridPickerItem>
        </DataGridPickerRow>
        <DataGridPickerRow row={1}>
          <DataGridPickerItem col={0} value={`${pageIndex}:1:0`}>🌍</DataGridPickerItem>
          <DataGridPickerItem col={1} value={`${pageIndex}:1:1`}>✨</DataGridPickerItem>
        </DataGridPickerRow>
      </DataGridPickerRowGroup>
    </DataGridPickerScrollerContent>
  </DataGridPickerScroller>
</DataGridPicker>
```
