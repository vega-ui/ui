# DayPicker Styling

## Overview

`DayPicker` does not define a large component-local CSS surface. Most visual behavior is inherited from `DataGridPicker`, `CalendarBase`, and the exported item and layout primitives it composes.

## Public CSS Variables

There are no significant day-picker-specific public CSS variables in the current implementation.

Theme-level color and surface behavior should come from [Themes](../../styling/themes.md) and [Tokens](../../styling/tokens.md), not from custom `--day-picker-*` variables.

## Part-Level Variables

### Root

The root is primarily behavioral, not visual. It coordinates date math, selection mode, and visible period.

### Layout / Scroller Content

Visual layout comes from composed grid and scroller parts rather than a dedicated root style module.

Day-cell appearance comes from the underlying picker item primitives and calendar shared parts.

## State And Variant Interaction

- Selection, disabled, and active appearance primarily come from the underlying picker primitives.
- Period changes affect rendered grid content, not a separate style token layer.
- Custom item rendering should preserve visible affordances for selected, unavailable, and out-of-period days.

## Examples

### Scroller-driven day picker

```tsx
<DayPicker>
  <DayPickerScroller>
    <DayPickerScrollerContent>
      <DayPickerScrollerLayout />
    </DayPickerScrollerContent>
  </DayPickerScroller>
</DayPicker>
```

## Do Not Override

- inventing a day-picker token contract that is not present in source
- assuming the root alone owns all visual styling
