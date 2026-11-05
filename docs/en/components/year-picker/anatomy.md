# YearPicker Anatomy

## Overview

`YearPicker` wraps `DataGridPicker` for year values and can render either static year grids or scroller-driven paged year ranges.

## Required Parts

### `YearPicker`

Required. Owns year selection behavior and visible year context.

## Optional Parts

### `YearPickerLayout`

Optional default year-grid renderer.

### `YearPickerCell`

Cell template. Children of `YearPickerLayout` and `YearPickerScrollerLayout` are required and rendered once per year inside a cell context read by `useYearPickerCellContext()`; usually `<YearPickerCell />`. Put custom content inside `YearPickerCell` to keep selection, focus, and disabled states.

### `YearPickerRowGroup`, `YearPickerRow`, `YearPickerItem`

Optional low-level grid composition parts.

### `YearPickerScroller`, `YearPickerScrollerContent`, `YearPickerScrollerLayout`

Optional paged year-range scroller infrastructure.

## Composition Order

1. `YearPicker`
2. optional scroller layer
3. either `YearPickerLayout` or custom row/item composition

## Valid Composition Patterns

The scroller composition: `YearPickerScroller` › `YearPickerScrollerContent` › `YearPickerScrollerLayout` › cell template, inside `YearPicker`. Keep `year` in state and update it from `onChangePeriod`, so the root always knows the page in view.

<!-- example: year-picker/valid-composition-patterns.tsx -->
```tsx
import {
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValidCompositionPatterns() {
  const [year, setYear] = useState('2026-01-01');

  return (
    <YearPicker aria-label='Year' locale='en-US' year={year}>
      <YearPickerScroller onChangePeriod={setYear}>
        <YearPickerScrollerContent>
          <YearPickerScrollerLayout>
            <YearPickerCell />
          </YearPickerScrollerLayout>
        </YearPickerScrollerContent>
      </YearPickerScroller>
    </YearPicker>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Scroller `period` that differs from the layout page size

The user sees one period while the paging logic thinks it is on another.

### Custom layouts that ignore the provided year helpers

Year ordering and paging semantics become harder to keep correct.
