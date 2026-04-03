# CalendarBase Styling

## Overview

`CalendarBase` styling is mostly layout-driven. It sets the outer shell and lets shared controls inherit size and variant through context rather than exposing a large component-local CSS API.

## Public CSS Variables

There are no significant public `--calendar-base-*` variables in the current implementation.

The shared parts primarily consume existing system tokens:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--spacing-6` | root gap | vertical spacing between calendar sections |
| `--label-tertiary` | weekday label | muted weekday tone |
| `--spacing-18` | weekday label | minimum label height |

For the theme layer behind these values, see [Themes](../../styling/themes.md) and [Tokens](../../styling/tokens.md).

## Part-Level Variables

### Root

Uses grid layout and optional `compact` width behavior.

### Header

Uses flex row layout with small padding.

### Week Labels

Use a 7-column grid and centered muted text.

`CalendarBasePickerButton` and `CalendarBaseControlIconButton` mostly inherit their visual contract from shared button primitives.

## State And Variant Interaction

- Size and variant flow into the shared button and text primitives through context.
- `compact` constrains width to `min-content`.
- `CalendarBase` should stay visually aligned with the picker layer rendered inside it rather than introducing a separate visual theme.

## Examples

### Compact calendar shell

```tsx
<CalendarBase compact>
  <CalendarBaseHeader />
</CalendarBase>
```

## Do Not Override

- inventing a separate calendar-base token API when the implementation relies mostly on shared primitives
- styling base parts in ways that break consistency with the rest of the calendar family
