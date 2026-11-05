# DataGrid

## Doc Profile

`advanced interactive`

## Summary

`DataGrid` is a [compound component](../../glossary.md#compound-component) for keyboard-aware grid navigation across rows and cells. It is the foundation layer underneath `DataGridSelectable` and `DataGridPicker`.

## Imports

```tsx
import {
  DataGrid,
  DataGridRowGroup,
  DataGridRow,
  DataGridCell,
  type DataGridProps,
  type DataGridCellKey,
  type DataGridCoordinates,
  type DataGridWrap,
} from '@vega-ui/react';
```

## Exported Types

- `DataGridProps`
- `DataGridCellKey`
- `DataGridCoordinates`
- `DataGridWrap`
- `DataGridResolveValue`
- `DataGridExclude`
- `DataGridExcludeResolver`
- `DataGridApiRef`
- `DataGridScope`

## Minimal Composition

<!-- example: data-grid/minimal-composition.tsx -->
```tsx
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <DataGrid aria-label='Release checklist' defaultActive='0:0' className='dataGridSheet'>
      <DataGridRowGroup>
        <DataGridRow row={0}>
          <DataGridCell col={0}>Design</DataGridCell>
          <DataGridCell col={1}>Build</DataGridCell>
          <DataGridCell col={2}>Ship</DataGridCell>
        </DataGridRow>
        <DataGridRow row={1}>
          <DataGridCell col={0}>Done</DataGridCell>
          <DataGridCell col={1}>In progress</DataGridCell>
          <DataGridCell col={2}>Not started</DataGridCell>
        </DataGridRow>
      </DataGridRowGroup>
    </DataGrid>
  );
}
```
<!-- /example -->

## Required Parts

- `DataGrid`: root keyboard and active-cell model
- `DataGridRowGroup`: row grouping container
- `DataGridRow`: row registration
- `DataGridCell`: focusable or navigable cell

## Optional Parts

- custom cell content inside `DataGridCell`
- controlled active-cell logic in the parent layer
- `apiRef` for advanced focus coordination and measurement

## Composition Order

Typical composition:

1. `DataGrid`
2. `DataGridRowGroup`
3. `DataGridRow`
4. `DataGridCell`

## Variants

- Wrap modes from `DataGridWrap`
- Uncontrolled default active cell versus controlled active cell
- Plain grid usage versus selectable or picker-like derived families built above it

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

- Sparse grids need exclusion rules that still match the visible layout.
- Interactive widgets inside cells can disrupt keyboard flow.
- Large datasets may need virtualization outside the component.
- `scope` matters when multiple logical grids or paged content share one interaction model.

## Common Mistakes

- Using `DataGrid` for static tables that should stay `Table`.
- Ignoring exclusion logic when the visual layout is sparse.
- Embedding complex controls inside cells without retesting keyboard behavior.
