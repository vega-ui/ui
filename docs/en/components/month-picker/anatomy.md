# MonthPicker Anatomy

## Overview

`MonthPicker` wraps `DataGridPicker` for month values and exposes row, item, and layout parts for static month grids.

## Required Parts

### `MonthPicker`

Required. Owns the month selection state model through `DataGridPicker`.

## Optional Parts

### `MonthPickerLayout`

Optional default month-grid renderer.

### `MonthPickerCell`

Cell template. Children of `MonthPickerLayout` are required and rendered once per month inside a cell context read by `useMonthPickerCellContext()`; usually `<MonthPickerCell />`. Put custom content inside `MonthPickerCell` to keep selection, focus, and disabled states.

### `MonthPickerRowGroup`, `MonthPickerRow`, `MonthPickerItem`

Optional low-level month-grid composition parts.

## Composition Order

1. `MonthPicker`
2. either `MonthPickerLayout` or custom row/item composition

## Valid Composition Patterns

The explicit parts: `MonthPickerRowGroup` › `MonthPickerRow` › `MonthPickerItem`, built from `createMonthPickerGrid`. `MonthPickerLayout` with a `MonthPickerCell` template renders the same structure; see [Minimal Composition](./index.md#minimal-composition).

<!-- example: month-picker/custom-grid-rendering.tsx -->
```tsx
import {
  MonthPicker,
  MonthPickerItem,
  MonthPickerRow,
  MonthPickerRowGroup,
  createMonthPickerGrid,
} from '@vega-ui/react';

const YEAR = '2026-01-01';
const narrowFormat = new Intl.DateTimeFormat('en-US', { month: 'narrow', timeZone: 'UTC' });
const longFormat = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
const rows = createMonthPickerGrid({ year: YEAR, cols: 6 });

export default function CustomGridRendering() {
  return (
    <MonthPicker aria-label='Month, 2026' locale='en-US' year={YEAR} style={{ width: '100%' }}>
      <MonthPickerRowGroup>
        {rows.map(({ row, data }) => (
          <MonthPickerRow key={row} row={row}>
            {data.map(({ col, month }) => (
              <MonthPickerItem key={month} col={col} value={month} aria-label={longFormat.format(new Date(month))}>
                {narrowFormat.format(new Date(month))}
              </MonthPickerItem>
            ))}
          </MonthPickerRow>
        ))}
      </MonthPickerRowGroup>
    </MonthPicker>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Month labels hardcoded inconsistently with the rest of the app

Localization and date semantics drift apart.

### Layout rebuilt without helper functions

Month ordering and selection semantics become easier to break.
