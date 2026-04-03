# DateRangeField Styling

## Overview

`DateRangeField` styling is split across the inherited `TextField` surface, the popover-mounted calendar, and a small local contract on `DateRangeFieldTriggerIconButton`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-button-size` | `DateRangeFieldTriggerIconButton` | Keeps the trigger aligned with input height. |
| `--button-color` | `DateRangeFieldTriggerIconButton` | Trigger icon color. |
| `--button-background-color-hover` | `DateRangeFieldTriggerIconButton` | Hover background for the trigger. |

## Part-Level Variables

- `DateRangeField`: inherits most visuals from `TextField`.
- `DateRangeFieldInput`: follows the same field surface model as other text-entry controls.
- `DateRangeFieldTriggerIconButton`: uses local button variables backed by theme tokens.
- `DateRangeFieldCalendar`: follows `Calendar` and `Popover` styling contracts.

## State And Variant Interaction

- Disabled state should dim the input and trigger together.
- Error styling should come from the surrounding field state instead of one-off trigger overrides.
- Range-specific styling should remain legible when both start and end values are partially filled.

## Examples

```css
.analyticsRangeTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```

```css
.compactRangeTrigger {
  --icon-button-size: 32px;
}
```

## Do Not Override

- Do not hide focus or invalid states with custom trigger colors.
- Do not restyle the calendar in this layer; that belongs to `Calendar` and `Popover`.
- Do not replace semantic theme tokens with raw palette values in field-level overrides.
