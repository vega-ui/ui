# Grid Anatomy

## Overview

`Grid` owns the active-cell model, wrap behavior, exclusion logic, and keyboard navigation across rows and cells.

## Required Parts

### `Grid`

Root provider for active-cell coordination.

### `GridRowGroup`

Grouping container for rows.

### `GridRow`

Row registration unit.

### `GridCell`

Cell registration and navigation unit.

## Optional Parts

### Controlled active-cell state

The parent can own the active cell for richer product flows.

### `GridColumnHeader` and `GridRowHeader`

Header cells with `role="columnheader"` and `role="rowheader"`, placed in a `GridRow` with a `col` like cells. They take part in the keyboard navigation, so a sort button in a header is reachable, and are never selected. Pass `excluded` to a header with nothing to interact with, like a weekday name.

### Interactive cell content

Inputs, buttons, and menus inside a cell follow the WAI-ARIA grid pattern: they have `tabIndex={-1}`, and the cell keeps the grid focus; Enter or F2 moves the focus to its first focusable element, Tab cycles inside the cell, and Escape returns the focus to the cell. Keys pressed inside the content, like arrows in an input, stay with the content. Tab on a cell leaves the grid instead of stopping on every button inside it. A cell that is itself a single widget is `<GridCell asChild><button /></GridCell>`.

### `asChild`

`Grid`, `GridRowGroup`, `GridRow`, `GridCell`, and the headers render their child element instead of a `div`, so the grid can be built on `table`, `tbody`, `tr`, `th`, and `td` with the native table layout.

### `apiRef`

Optional imperative bridge: `focus(key)` moves focus to a cell, also to one that renders later.

### Selection

`selection` turns on single, multiple, or range selection: cells get `aria-selected`, and a click, Enter, or Space selects them. `disabled`, `min`, and `max` constrain it; `compare` and `resolveRange` adapt it to the key model.

### `GridItem`

The picker look of a cell, with no behavior of its own: `size`, `variant`, the selected state, the range from start to end, and the disabled state. Place it inside `<GridCell asChild>`, which gives it the role, focus, `aria-selected`, `aria-disabled`, and `data-range`.

### `GridScroller` with `IndexedSnapScrollerContent`

Page the grid with a snap scroller. Each page is an `IndexedSnapScrollerContent` and reads its `index` from `useIndexedSnapScrollerContext`; when a page snaps into view and the active cell is not on it, its first available cell becomes the active cell.

## Composition Order

Typical composition:

1. `Grid`
2. `GridRow` with `GridColumnHeader`s, when columns have headers
3. `GridRowGroup`
4. `GridRow`
5. `GridRowHeader`, when rows have headers
6. `GridCell`

## Valid Composition Patterns

Give the grid an accessible name. `defaultActive` (or a controlled `active`) picks the first tab stop; without it the tab stop is the first selected cell, otherwise the first focusable cell.

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

## Invalid Composition Patterns

### Cells without matching row or column structure

This breaks navigation assumptions and active-cell math.

### Sparse layouts without exclusion logic

The keyboard model may still try to navigate through visual gaps.

### Treating `Grid` as a visual table only

`Grid` is a keyboard-navigation system, not just a layout primitive.

### A header row numbered like a body row

Headers and cells of the same `row` merge into one row for the keyboard. Number the header row apart, for example `row={-1}`.

### A static header without `excluded`

The keyboard stops on a header with nothing to do. Pass `excluded`.

### Unstable cell keys with selection

Selected and active cells drift when the keys change between renders.
