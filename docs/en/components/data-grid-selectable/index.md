# DataGridSelectable

## Doc Profile

`advanced interactive`

## Summary

`DataGridSelectable` extends `DataGrid` with active-cell management and single, multiple, or range selection. It is the behavioral selection layer underneath higher-level picker subsystems.

## Imports

```tsx
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
  type DataGridDisabled,
  type DataGridSelectableCellProps,
  type DataGridSelectableProps,
  type DataGridSelectableRowGroupProps,
  type DataGridSelectableRowProps,
  type DataGridSelection,
} from '@vega-ui/react';
```

## Exported Types

- `DataGridSelectableProps<K, S>`
- `DataGridSelectableRowGroupProps`
- `DataGridSelectableRowProps`
- `DataGridSelectableCellProps`
- `DataGridSelection = 'single' | 'multiple' | 'range'`
- `DataGridDisabled<K>`

## Minimal Composition

<!-- example: data-grid-selectable/minimal-composition.tsx -->
```tsx
import {
  DataGridSelectable,
  DataGridSelectableCell,
  DataGridSelectableRow,
  DataGridSelectableRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <DataGridSelectable aria-label='Quarter' defaultActive='q1' className='selectableGrid'>
      <DataGridSelectableRowGroup>
        <DataGridSelectableRow row={0}>
          <DataGridSelectableCell col={0} cellKey='q1'>Q1</DataGridSelectableCell>
          <DataGridSelectableCell col={1} cellKey='q2'>Q2</DataGridSelectableCell>
        </DataGridSelectableRow>
        <DataGridSelectableRow row={1}>
          <DataGridSelectableCell col={0} cellKey='q3'>Q3</DataGridSelectableCell>
          <DataGridSelectableCell col={1} cellKey='q4'>Q4</DataGridSelectableCell>
        </DataGridSelectableRow>
      </DataGridSelectableRowGroup>
    </DataGridSelectable>
  );
}
```
<!-- /example -->

## Required Parts

- `DataGridSelectable`: root selection engine and active-cell coordinator
- `DataGridSelectableRowGroup`: row grouping scope
- `DataGridSelectableRow`: one row in the grid
- `DataGridSelectableCell`: selectable cell surface

## Optional Parts

- custom `apiRef`, comparators, range resolver, and disabled maps for advanced behaviors

## Composition Order

1. `DataGridSelectable`
2. `DataGridSelectableRowGroup`
3. `DataGridSelectableRow`
4. `DataGridSelectableCell`

## Variants

- Selection: `single`, `multiple`, `range`
- Navigation wrapping: `horizontal`, `vertical`, `both`
- Constraints: `disabled`, `exclude`, `from`, `to`, custom comparators

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

- Range expansion uses pointer and keyboard logic that should be tested in the real grid shape.
- `excludeDisabled` changes how disabled cells affect navigation and range resolution.
- `from` and `to` constrain the selectable space, not just the visible layout.

## Common Mistakes

- Using complex selection semantics without a stable key model.
- Forgetting that range logic depends on compare and resolve-range behavior.
- Treating it like a presentational grid instead of a selection engine.
