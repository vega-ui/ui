# YearPicker Anatomy

## Overview

`YearPicker` wraps `Grid` for year values and can render either static year grids or scroller-driven paged year ranges.

## Required Parts

### `YearPicker`

Required. Owns year selection behavior and the focused year, which decides the page in view.

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

The scroller composition: `YearPickerScroller` › `YearPickerScrollerContent` › `YearPickerScrollerLayout` › cell template, inside `YearPicker`. Pages start at the first focused year, and scrolling to another page moves the focus there, so the root always knows the page in view. Use `onChangePeriod` only to label the page.

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
    <YearPicker aria-label='Year' locale='en-US' focusedDate={year} onChangeFocusedDate={setYear}>
      <YearPickerScroller>
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

### `period` that differs from the layout page size

The user sees one period while the paging logic thinks it is on another.

### Custom layouts that ignore the provided year helpers

Year ordering and paging semantics become harder to keep correct.
