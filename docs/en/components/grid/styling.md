# Grid Styling

## Overview

`Grid` styling is intentionally minimal. Most complexity lives in behavior and composition, not in a large component-local variable surface.

## Public CSS Variables

The root and `GridCell` expose no variables of their own; styling mostly comes from cell and row content plus surrounding layout. `GridItem`, the picker look of a cell, exposes the `--grid-item-*` set.

| Variable | Used By | Purpose |
| --- | --- | --- |
| grid layout properties | root grid | overall row flow |
| cell-level local styles | `GridCell` | width, height, local spacing |
| `--grid-item-size` | `GridItem` | Item size. |
| `--grid-item-br-ratio` | `GridItem` | Radius ratio of an item. |
| `--grid-item-color` | `GridItem` | Item text color. |
| `--grid-item-background-color` | `GridItem` | Item background. |
| `--grid-item-background-color-hover` | `GridItem` | Item background on hover. |
| `--grid-item-background-color-active` | `GridItem` | Item background while pressed. |
| `--grid-item-selected-color` | `GridItem` | Text color of the selected item. |
| `--grid-item-selected-background-color` | `GridItem` | Background of the selected item. |
| `--grid-item-selected-background-color-hover` | `GridItem` | Background of the selected item on hover. |
| `--grid-item-selected-background-color-active` | `GridItem` | Background of the selected item while pressed. |
| `--grid-item-range-background-color` | `GridItem` | Background of items inside a selected range. |
| `--grid-item-range-background-color-hover` | `GridItem` | Range item background on hover. |
| `--grid-item-range-background-color-active` | `GridItem` | Range item background while pressed. |

## Part-Level Variables

### Root

The root [Grid style](../../../../packages/ui/src/Grid/style.module.css) only declares the base grid layout.

### Cells

Most visual tuning happens at the cell level through local styles or custom child content rather than documented root-level variables.

### Items

`GridItem` styles the `aria-selected`, `aria-disabled`, and `data-range` attributes it receives from `<GridCell asChild>`. `size` and `variant` are set on every item; the date pickers pass their own `size` and `variant` to their items. Each item reads `--grid-item-size` and `--grid-item-br-ratio` from its own element, so set them on the items, not on the root.

## State And Variant Interaction

- wrap and exclusion are behavior contracts, not styling variants
- active-cell visibility depends more on content and focus styling than on root tokens
- with `selection` cells expose `aria-selected`, and disabled cells `aria-disabled`; `GridCell` has no selected look of its own, so style those attributes or put a `GridItem` inside
- in a range, `GridCell` sets `data-range` to `start`, `between`, or `end`
- scroller composition changes layout and paging, not the colors of the items

## Examples

### Cell-size tuning at usage site

Fixed 44px cells come from the usage site: the row sets `grid-auto-columns`, the cell sets its height, and `:focus-visible` keeps the active cell visible. The class names live in the example stylesheet below.

<!-- example: grid/cell-size-tuning-at-usage-site.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const keys = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']];

export default function CellSizeTuningAtUsageSite() {
  return (
    <Grid aria-label='Keypad' defaultActive='1:1' className='gridSheet gridCompact'>
      <GridRowGroup>
        {keys.map((row, rowIndex) => (
          <GridRow key={row[0]} row={rowIndex}>
            {row.map((key, col) => (
              <GridCell key={key} col={col}>{key}</GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Custom cell shell on top of selectable behavior

A seat map styled entirely from the outside: with `selection` the cell exposes `aria-selected` and `aria-disabled`, and the stylesheet targets them together with `:focus-visible`. Disabled cells also get `pointer-events: none`, like `GridItem` does.

<!-- example: grid/custom-cell-shell-on-top-of-selectable-behavior.tsx -->
```tsx
import {
  Grid,
  GridCell,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const rows = ['A', 'B', 'C'];
const seats = [1, 2, 3, 4, 5, 6];
const taken = ['A3', 'A4', 'B1', 'C6'];

export default function CustomCellShellOnTopOfSelectableBehavior() {
  return (
    <Grid
      aria-label='Seats'
      selection='multiple'
      disabled={taken}
      defaultValue={['B3', 'B4']}
      defaultActive='B3'
      className='selectableGrid seatMap'
    >
      <GridRowGroup>
        {rows.map((row, rowIndex) => (
          <GridRow key={row} row={rowIndex}>
            {seats.map((seat, col) => (
              <GridCell key={seat} col={col} value={`${row}${seat}`}>
                {`${row}${seat}`}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Brand-colored picker matrix

`variant='primary'` switches the selected color to the brand palette and `size='lg'` enlarges the items. The round shape comes from `--grid-item-br-ratio` set on every `GridItem`.

<!-- example: grid/brand-colored-picker-matrix.tsx -->
```tsx
import { type CSSProperties } from 'react';
import {
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
} from '@vega-ui/react';

const amounts = [[5, 10, 15], [20, 50, 100]];
const roundItem = { '--grid-item-br-ratio': 0.5 } as CSSProperties;

export default function BrandColoredPickerMatrix() {
  return (
    <Grid
      aria-label='Tip amount, USD'
      selection='single'
      wrap='horizontal'
      defaultValue={15}
      defaultActive={15}
      style={{ width: 240 }}
    >
      <GridRowGroup>
        {amounts.map((row, rowIndex) => (
          <GridRow key={rowIndex} row={rowIndex}>
            {row.map((amount, col) => (
              <GridCell key={amount} col={col} value={amount} asChild>
                <GridItem variant='primary' size='lg' style={roundItem}>${amount}</GridItem>
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    </Grid>
  );
}
```
<!-- /example -->

### Example stylesheet

Shared by the Grid examples: borders, header styling, focus ring, the dimmed look of excluded cells, the sticky header row, and the selected and disabled looks of the selection examples.

<!-- example: grid/examples.css -->
```css
.gridSheet {
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-3);
  overflow: hidden;
  background: var(--surface-primary);
  font-size: var(--font-size-2);
  font-variant-numeric: tabular-nums;
  color: var(--label-primary);
}

.gridSheet [role='row'] + [role='row'] {
  border-block-start: 1px solid var(--separator-non-opaque);
}

.gridSheet [role='gridcell'],
.gridSheet [role='columnheader'],
.gridSheet [role='rowheader'] {
  min-block-size: var(--spacing-20);
  padding-inline: var(--spacing-4);
  outline-offset: -2px;
}

.gridSheet [role='columnheader'],
.gridSheet [role='rowheader'] {
  color: var(--label-secondary);
  font-weight: 500;
}

.gridSheet [role='rowheader'],
.gridSheetWideFirst [role='columnheader']:first-child {
  justify-content: flex-start;
}

.gridSheet :focus-visible {
  outline: 2px solid var(--focus-color);
}

.gridSheet [aria-disabled='true'] {
  color: var(--label-quaternary);
  background: var(--fills-quaternary);
}

.gridSheetWideFirst [role='row'] {
  grid-template-columns: 120px;
}

.gridScroll {
  max-block-size: 280px;
  overflow: auto;
  scroll-padding-block-start: var(--spacing-20);
}

.gridStickyRow {
  position: sticky;
  inset-block-start: 0;
  z-index: 1;
  background: var(--surface-primary);
}

.gridDays {
  inline-size: fit-content;
}

.gridDays [role='gridcell'],
.gridDays [role='rowheader'] {
  min-block-size: var(--spacing-14);
  padding: 0;
  font-size: var(--font-size-1);
}

.gridDays [role='rowheader'] {
  padding-inline: var(--spacing-4);
}

.gridDays [role='row'] {
  grid-auto-columns: var(--spacing-14);
  grid-template-columns: var(--spacing-24);
}

.gridCompact {
  inline-size: fit-content;
}

.gridCompact [role='row'] {
  grid-auto-columns: 44px;
}

.gridCompact [role='gridcell'] {
  block-size: 44px;
  padding: 0;
}

.gridScrollX {
  overflow-x: auto;
  scroll-padding-inline-start: var(--spacing-24);
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-3);
}

.gridScrollX .gridSheet {
  overflow: visible;
  border: none;
  border-radius: 0;
}

.gridDays [role='rowheader'] {
  position: sticky;
  inset-inline-start: 0;
  z-index: 1;
  background: var(--surface-primary);
}

.selectableGrid {
  inline-size: fit-content;
  gap: var(--spacing-2);
  font-size: var(--font-size-2);
  color: var(--label-primary);
}

.selectableGrid [role='row'] {
  gap: var(--spacing-2);
  grid-auto-columns: minmax(64px, auto);
}

.selectableGrid [role='gridcell'],
.selectableGrid [role='columnheader'],
.selectableGrid [role='rowheader'] {
  min-block-size: var(--spacing-20);
  padding-inline: var(--spacing-4);
  border-radius: var(--radius-2);
}

.selectableGrid [role='gridcell'] {
  cursor: pointer;
  background: var(--fills-tertiary);
}

.selectableGrid [role='gridcell']:hover {
  background: var(--fills-tertiary-hover);
}

.selectableGrid [role='columnheader'],
.selectableGrid [role='rowheader'] {
  color: var(--label-secondary);
  font-weight: 500;
}

.selectableGrid [role='gridcell'][aria-selected='true'] {
  color: var(--color-white);
  background: var(--color-primary-500);
}

.selectableGrid [role='gridcell'][aria-disabled='true'] {
  cursor: not-allowed;
  color: var(--label-quaternary);
  background: transparent;
  text-decoration: line-through;
  pointer-events: none;
}

.selectableGrid [role='gridcell']:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

.selectableGrid [role='rowheader'],
.selectableGrid [role='columnheader'] {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.seatMap [role='row'] {
  grid-auto-columns: 36px;
}

.seatMap [role='gridcell'] {
  block-size: 36px;
  padding: 0;
  border-radius: var(--radius-2) var(--radius-2) var(--radius-1) var(--radius-1);
  border-block-end: 3px solid var(--separator-opaque);
}

.seatMap [role='gridcell'][aria-selected='true'] {
  border-block-end-color: var(--color-primary-700);
}

.selectableGrid:has([role='rowheader']) [role='row'] {
  grid-template-columns: var(--spacing-40);
}

.selectableGrid [role='rowheader'],
.selectableGrid:has([role='rowheader']) [role='columnheader']:first-child {
  padding-inline-start: 0;
}

.selectableGrid [role='columnheader'] {
  justify-content: center;
}

.selectableGrid:has([role='rowheader']) [role='columnheader']:first-child {
  justify-content: flex-start;
}

.gridTable {
  inline-size: min(100%, 480px);
  border-spacing: 0;
}

.gridTable th,
.gridTable td {
  block-size: var(--spacing-20);
  text-align: start;
  vertical-align: middle;
}

.gridTable thead th {
  padding-inline: var(--spacing-2);
}

.gridTable tbody > tr > * {
  border-block-start: 1px solid var(--separator-non-opaque);
}

.gridTable .gridNumeric {
  text-align: end;
}

.gridEditable [role='gridcell'] {
  padding-inline: var(--spacing-2);
}

.gridEditable .gridNumeric {
  justify-content: flex-end;
  padding-inline: var(--spacing-4);
}

.gridCellInput {
  inline-size: 100%;
  min-inline-size: 0;
  block-size: var(--spacing-14);
  padding-inline: var(--spacing-2);
  border: 0;
  border-radius: var(--radius-2);
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: end;
}

.gridCellInput:hover {
  background: var(--fills-quaternary);
}

.symbolPalette {
  inline-size: 100%;
}

.symbolPalette [role='row'] {
  grid-auto-columns: 1fr;
}

.symbolPalette button {
  border: 0;
  color: inherit;
  font: inherit;
  font-size: var(--font-size-4);
}

.calculator {
  display: grid;
  gap: var(--spacing-6);
  inline-size: min(100%, 280px);
  padding: var(--spacing-6);
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-4);
  background: var(--surface-primary);
}

.calculatorScreen {
  display: grid;
  justify-items: end;
  gap: var(--spacing-1);
  padding-inline: var(--spacing-2);
  font-variant-numeric: tabular-nums;
}

.calculatorExpression {
  min-block-size: 1lh;
  font-size: var(--font-size-2);
  color: var(--label-secondary);
  white-space: pre;
}

.calculatorDisplay {
  max-inline-size: 100%;
  overflow: hidden;
  font-size: var(--font-size-7);
  font-weight: 500;
  color: var(--label-primary);
  text-overflow: ellipsis;
}

.calculatorKeys [role='rowgroup'] {
  display: grid;
  gap: var(--spacing-3);
}

.calculatorKeys [role='row'] {
  gap: var(--spacing-3);
  grid-auto-columns: 1fr;
}

.calculatorKeys button {
  block-size: var(--spacing-24);
  border: 0;
  border-radius: var(--radius-3);
  background: var(--fills-tertiary);
  color: var(--label-primary);
  font: inherit;
  font-size: var(--font-size-4);
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}

.calculatorKeys button:hover {
  background: var(--fills-tertiary-hover);
}

.calculatorKeys button:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

.calculatorKeys [data-kind='function'] {
  color: var(--label-secondary);
}

.calculatorKeys [data-kind='operator'] {
  color: var(--color-primary-500);
}

.calculatorKeys [data-kind='equals'] {
  background: var(--color-primary-500);
  color: var(--color-white);
}

.calculatorKeys [data-kind='equals']:hover {
  background: var(--color-primary-600);
}

.teamAccess [role='row'] {
  grid-template-columns: 44px minmax(96px, 1fr) 132px 72px 64px 80px;
}

.teamAccess [role='rowheader'],
.teamAccess [role='columnheader']:nth-child(2) {
  justify-content: flex-start;
  color: var(--label-primary);
}

.teamAccessRole > * {
  flex: 1;
}

.teamAccess [role='combobox'] {
  inline-size: 100%;
}

.teamAccessActions {
  gap: var(--spacing-1);
}
```
<!-- /example -->

## Do Not Override

- do not invent undocumented `--grid-*` hooks as if they were public API; only `--grid-item-*` of `GridItem` is public
- do not treat paging logic as a CSS concern
- do not restyle cells so aggressively that active-cell visibility disappears
- do not hide the selected or disabled state of cells
