# YearPicker Styling

## Overview

`YearPicker` does not define a large root-specific CSS contract. Visual behavior comes from the underlying picker and grid primitives plus the composed year layout and scroller parts.

## Public CSS Variables

There are no significant year-picker-specific public CSS variables in the current implementation.

Theme semantics should come from [Themes](../../styling/themes.md) and [CSS Variables](../../styling/css-variables.md), not from ad hoc `--year-picker-*` overrides.

## Part-Level Variables

### Root

The root is primarily behavioral and context-driven. It owns visible year range and selection state.

### Layout / Scroller Content

Grid and scroller presentation come from the composed row, item, and scroller parts rather than a dedicated root style module.

## State And Variant Interaction

- Selection, variant, and disabled appearance come from underlying picker primitives.
- Visible year changes affect rendered content rather than a dedicated styling layer.
- Scroller paging changes the visible window, but not the base visual semantics of each year cell.

## Examples

### Scroller-based year paging

```tsx
<YearPicker>
  <YearPickerScroller>
    <YearPickerScrollerContent>
      <YearPickerScrollerLayout />
    </YearPickerScrollerContent>
  </YearPickerScroller>
</YearPicker>
```

## Do Not Override

- inventing a year-picker styling API not present in source
- assuming scroller behavior is controlled by styling rather than mapping logic
