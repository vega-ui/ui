# DataGrid Styling

## Overview

`DataGrid` styling is intentionally minimal. Most complexity lives in behavior and composition, not in a large component-local variable surface.

## Public CSS Variables

The current root implementation does not expose a stable `--data-grid-*` variable set. Styling mostly comes from cell and row content plus surrounding layout.

| Variable | Used By | Purpose |
| --- | --- | --- |
| grid layout properties | root grid | overall row flow |
| cell-level local styles | `DataGridCell` | width, height, local spacing |

## Part-Level Variables

### Root

The root [DataGrid style](../../../../packages/ui/src/DataGrid/style.module.css) only declares the base grid layout.

### Cells

Most visual tuning happens at the cell level through local styles or custom child content rather than documented root-level variables.

## State And Variant Interaction

- wrap and exclusion are behavior contracts, not styling variants
- active-cell visibility depends more on content and focus styling than on root tokens

## Examples

### Cell-size tuning at usage site

Fixed 44px cells come from the usage site: the row sets `grid-auto-columns`, the cell sets its height, and `:focus-visible` keeps the active cell visible. The class names live in the example stylesheet below.

<!-- example: data-grid/cell-size-tuning-at-usage-site.tsx -->
```tsx
import {
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
} from '@vega-ui/react';
import './examples.css';

const keys = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3']];

export default function CellSizeTuningAtUsageSite() {
  return (
    <DataGrid aria-label='Keypad' defaultActive='1:1' className='dataGridSheet dataGridCompact'>
      <DataGridRowGroup>
        {keys.map((row, rowIndex) => (
          <DataGridRow key={row[0]} row={rowIndex}>
            {row.map((key, col) => (
              <DataGridCell key={key} col={col}>{key}</DataGridCell>
            ))}
          </DataGridRow>
        ))}
      </DataGridRowGroup>
    </DataGrid>
  );
}
```
<!-- /example -->

### Example stylesheet

Shared by the DataGrid examples: borders, header styling, focus ring, the dimmed look of excluded cells, and the sticky header row.

<!-- example: data-grid/examples.css -->
```css
.dataGridSheet {
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-3);
  overflow: hidden;
  background: var(--surface-primary);
  font-size: var(--font-size-2);
  font-variant-numeric: tabular-nums;
  color: var(--label-primary);
}

.dataGridSheet [role='row'] + [role='row'] {
  border-block-start: 1px solid var(--separator-non-opaque);
}

.dataGridSheet [role='gridcell'],
.dataGridSheet [role='columnheader'],
.dataGridSheet [role='rowheader'] {
  min-block-size: var(--spacing-20);
  padding-inline: var(--spacing-4);
  outline-offset: -2px;
}

.dataGridSheet [role='columnheader'],
.dataGridSheet [role='rowheader'] {
  color: var(--label-secondary);
  font-weight: 500;
}

.dataGridSheet [role='rowheader'],
.dataGridSheetWideFirst [role='columnheader']:first-child {
  justify-content: flex-start;
}

.dataGridSheet :focus-visible {
  outline: 2px solid var(--focus-color);
}

.dataGridSheet [aria-disabled='true'] {
  color: var(--label-quaternary);
  background: var(--fills-quaternary);
}

.dataGridSheetWideFirst [role='row'] {
  grid-template-columns: 120px;
}

.dataGridScroll {
  max-block-size: 280px;
  overflow: auto;
  scroll-padding-block-start: var(--spacing-20);
}

.dataGridStickyRow {
  position: sticky;
  inset-block-start: 0;
  z-index: 1;
  background: var(--surface-primary);
}

.dataGridDays {
  inline-size: fit-content;
}

.dataGridDays [role='gridcell'],
.dataGridDays [role='rowheader'] {
  min-block-size: var(--spacing-14);
  padding: 0;
  font-size: var(--font-size-1);
}

.dataGridDays [role='rowheader'] {
  padding-inline: var(--spacing-4);
}

.dataGridDays [role='row'] {
  grid-auto-columns: var(--spacing-14);
  grid-template-columns: var(--spacing-24);
}

.dataGridCompact {
  inline-size: fit-content;
}

.dataGridCompact [role='row'] {
  grid-auto-columns: 44px;
}

.dataGridCompact [role='gridcell'] {
  block-size: 44px;
  padding: 0;
}

.dataGridScrollX {
  overflow-x: auto;
  scroll-padding-inline-start: var(--spacing-24);
  border: 1px solid var(--separator-opaque);
  border-radius: var(--radius-3);
}

.dataGridScrollX .dataGridSheet {
  overflow: visible;
  border: none;
  border-radius: 0;
}

.dataGridDays [role='rowheader'] {
  position: sticky;
  inset-inline-start: 0;
  z-index: 1;
  background: var(--surface-primary);
}
```
<!-- /example -->

## Do Not Override

- do not invent undocumented `--data-grid-*` hooks as if they were public API
- do not restyle cells so aggressively that active-cell visibility disappears
