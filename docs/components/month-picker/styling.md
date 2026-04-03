# MonthPicker Styling

## Overview

`MonthPicker` does not define a large root-specific CSS contract. Most visual behavior is inherited from the underlying picker and grid primitives plus the layout parts rendered inside the root.

## Public CSS Variables

There are no significant month-picker-specific public CSS variables in the current implementation.

Global color and surface semantics should come from [Themes](../../styling/themes.md), not from custom month-picker variables.

## Part-Level Variables

### Root

The root is behavioral and layout-neutral. It owns month selection state, not a separate style layer.

### Layout

Visual month arrangement is driven by the composed row and item grid parts plus locale formatting.

## State And Variant Interaction

- Selection, disabled, and active styling come from the underlying picker primitives.
- Grid shape changes through layout props such as `rows`, `cols`, and `start`, not through dedicated CSS variables.

## Examples

### Dense month grid

```tsx
<MonthPicker>
  <MonthPickerLayout rows={4} cols={3} start={0} />
</MonthPicker>
```

## Do Not Override

- documenting a month-picker CSS API that does not exist in source
- treating layout props as if they were design tokens
