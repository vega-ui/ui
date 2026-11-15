# Grid

## Doc Profile

`advanced interactive`

## Summary

`Grid` is a [compound component](../../glossary.md#compound-component) for keyboard-aware grid navigation across rows and cells. With `selection` it adds single, multiple, or range selection. `GridItem` gives the cells the VegaUI picker look, and `GridScroller` pages them. It is the foundation of the date pickers.

## Imports

```tsx
import {
  Grid,
  GridRowGroup,
  GridRow,
  GridCell,
  GridColumnHeader,
  GridRowHeader,
  GridItem,
  GridScroller,
  type GridProps,
  type GridKey,
  type GridWrap,
  type GridSelection,
  type GridKeys,
} from '@vega-ui/react';
```

## Exported Types

- `GridProps`
- `GridKey`
- `GridWrap`
- `GridIntent`
- `GridKeys<K>`: a key, an array of keys, or a predicate
- `GridKeyMatcher<K>`: the predicate `(key) => boolean`
- `GridApiRef`
- `GridSelection = 'single' | 'multiple' | 'range'`
- `GridRangePosition`
- `GridColumnHeaderProps`
- `GridRowHeaderProps`
- `GridItemProps`
- `GridItemSize`
- `GridItemVariant`
- `GridScrollerProps`

## Minimal Composition

<!-- example: grid/minimal-composition.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function MinimalComposition() {
  return (
    <Grid aria-label='Release checklist' defaultActive='0:0' className='gridSheet'>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0}>Design</GridCell>
          <GridCell col={1}>Build</GridCell>
          <GridCell col={2}>Ship</GridCell>
        </GridRow>
        <GridRow row={1}>
          <GridCell col={0}>Done</GridCell>
          <GridCell col={1}>In progress</GridCell>
          <GridCell col={2}>Not started</GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

With `selection`, cells get `aria-selected`, and a click, Enter, or Space selects them:

<!-- example: grid/selection-minimal-composition.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

export default function SelectionMinimalComposition() {
  return (
    <Grid aria-label='Quarter' selection='single' defaultActive='q1' className='selectableGrid'>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0} value='q1'>Q1</GridCell>
          <GridCell col={1} value='q2'>Q2</GridCell>
        </GridRow>
        <GridRow row={1}>
          <GridCell col={0} value='q3'>Q3</GridCell>
          <GridCell col={1} value='q4'>Q4</GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

`GridItem` inside `<GridCell asChild>` gives a cell the picker look: size, the selected and range states, and the disabled state:

<!-- example: grid/item-minimal-composition.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

export default function ItemMinimalComposition() {
  return (
    <Grid aria-label='Plan length' selection='single' wrap='horizontal' defaultActive='1m' style={{ width: 240 }}>
      <GridRowGroup>
        <GridRow row={0}>
          <GridCell col={0} value='1m' asChild>
            <GridItem>1 mo</GridItem>
          </GridCell>
          <GridCell col={1} value='6m' asChild>
            <GridItem>6 mo</GridItem>
          </GridCell>
          <GridCell col={2} value='12m' asChild>
            <GridItem>12 mo</GridItem>
          </GridCell>
        </GridRow>
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

## Required Parts

- `Grid`: root keyboard and active-cell model
- `GridRowGroup`: row grouping container
- `GridRow`: row registration
- `GridCell`: focusable or navigable cell

## Optional Parts

- custom cell content inside `GridCell`
- controlled active-cell logic in the parent layer
- `apiRef` for advanced focus coordination and measurement
- `selection` with `disabled`, `min`, `max`, comparators, and a range resolver
- `GridColumnHeader` and `GridRowHeader` for header cells (`columnheader`, `rowheader`)
- `asChild` on every part to build the grid on `table`, `tbody`, `tr`, `th`, and `td`
- interactive content inside cells: inputs, buttons, menus
- `GridItem` inside `<GridCell asChild>` for the picker look of a cell
- `GridScroller` with `IndexedSnapScrollerContent` for paged grids

## Composition Order

Typical composition:

1. `Grid`
2. optional `GridScroller` with `IndexedSnapScrollerContent`
3. `GridRowGroup`
4. `GridRow`
5. `GridColumnHeader` or `GridRowHeader` where a row needs a header
6. `GridCell`, optionally with `GridItem` as its child

## Variants

- Wrap modes from `GridWrap`
- Uncontrolled default active cell versus controlled active cell
- Selection: none (default), `single`, `multiple`, `range`
- Constraints: `exclude`, `disabled`, `min`, `max`, custom comparators
- `GridItem` size: `xs`, `sm`, `md`, `lg`, `xl`; variant: `primary`, `secondary`
- Layout: static grid or scroller-based paging

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
- Interactive content inside a cell has `tabIndex={-1}`, is reached with Enter or F2 and left with Escape; Tab leaves the grid instead of stopping on every button. A cell that is a single widget is `<GridCell asChild><button /></GridCell>`.
- A header with nothing to interact with, like a weekday name, needs `excluded`; a header with a sort button stays focusable.
- A grid that renders only part of its rows needs `aria-rowcount` on `Grid` and `aria-rowindex` on each `GridRow`; they pass through as they are.
- Large datasets may need virtualization outside the component.
- Range expansion uses pointer and keyboard logic that should be tested in the real grid shape.
- Disabled cells stay focusable and only block selection; pass them to `exclude` too to skip them. `DayPicker`, `MonthPicker`, and `YearPicker` skip unavailable dates themselves.
- `min` and `max` constrain the selectable space, not just the visible layout.

## Common Mistakes

- Using `Grid` for static tables that should stay `Table`.
- Ignoring exclusion logic when the visual layout is sparse.
- Giving every button inside the cells its own tab stop instead of relying on Enter, F2, and Escape.
- Leaving a static header focusable without `excluded`.
- Using selection without a stable key model.
- Forgetting that range logic depends on `compare` and `resolveRange`.
- Rebuilding the selected, range, and disabled look by hand when `GridItem` already has it.
