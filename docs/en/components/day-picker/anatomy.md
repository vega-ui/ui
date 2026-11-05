# DayPicker Anatomy

## Overview

`DayPicker` wraps `DataGridPicker` and adds day-grid-specific context: the visible `month` (first day as a `YYYY-MM-DD` string) and the `calendar` system. Layout can be static or scroller-driven.

## Required Parts

### `DayPicker`

Required. Owns day-grid selection mode and visible period context.

## Optional Parts

### `DayPickerLayout`

Optional default day-grid renderer.

### `DayPickerCell`

Cell template. Children of `DayPickerLayout` and `DayPickerScrollerLayout` are required and rendered once per day inside a cell context read by `useDayPickerCellContext()`; usually `<DayPickerCell />`. Put custom content inside `DayPickerCell` to keep selection, focus, and disabled states.

### `DayPickerRowGroup`, `DayPickerRow`, `DayPickerItem`

Optional low-level grid composition parts.

### `DayPickerScroller`, `DayPickerScrollerContent`, `DayPickerScrollerLayout`

Optional scroller-based paging infrastructure for month navigation.

## Composition Order

1. `DayPicker`
2. optional scroller layer
3. either `DayPickerLayout` or custom row/item composition

## Valid Composition Patterns

The scroller composition: `DayPickerScroller` › `DayPickerScrollerContent` › `DayPickerScrollerLayout` › cell template, inside `DayPicker`. The scroller starts at `month` of the root and scrolls to it when it changes, so keep `month` in state and update it from `onChangePeriod`, and the root always knows the month in view.

<!-- example: day-picker/valid-composition-patterns.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValidCompositionPatterns() {
  const [month, setMonth] = useState('2026-11-01');

  return (
    <DayPicker aria-label='Days' locale='en-US' month={month}>
      <DayPickerScroller onChangePeriod={setMonth}>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout includeOverflowDays>
            <DayPickerCell />
          </DayPickerScrollerLayout>
        </DayPickerScrollerContent>
      </DayPickerScroller>
    </DayPicker>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Custom grid math replacing helper functions casually

Selection and excluded-day logic can drift from the intended calendar behavior.

### Scroller composition without a consistent period-mapping contract

Visible month and rendered month become hard to keep aligned.
