# DayPicker Anatomy

## Overview

`DayPicker` wraps `Grid` and adds day-grid-specific context: the shown `month` (the first day of the month of the focused day, as a `YYYY-MM-DD` string), `today`, `locale`, and the `calendar` system. Layout can be static or scroller-driven.

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

The scroller composition: `DayPickerScroller` › `DayPickerScrollerContent` › `DayPickerScrollerLayout` › cell template, inside `DayPicker`. The scroller follows the month of the focused day: keyboard navigation that leaves the month scrolls to the new one, and a swipe to another month moves the focused day to the same day there. No extra state is needed; use `onChangeFocusedDate` on the root or `onChangePeriod` on the scroller when a header has to show the month.

<!-- example: day-picker/valid-composition-patterns.tsx -->
```tsx
import {
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
} from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <DayPicker aria-label='Days' locale='en-US' defaultFocusedDate='2026-11-01'>
      <DayPickerScroller>
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
