# DateTimeField Styling

## Overview

`DateTimeField` styling is split across the inherited `TextField` surface, the popover-mounted calendar, and a small local contract on `DateTimeFieldTriggerIconButton`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-button-size` | `DateTimeFieldTriggerIconButton` | Keeps the trigger aligned with input height. |
| `--button-color` | `DateTimeFieldTriggerIconButton` | Trigger icon color. |
| `--button-background-color-hover` | `DateTimeFieldTriggerIconButton` | Hover background for the trigger. |

## Part-Level Variables

- `DateTimeField`: inherits most visuals from `TextField`.
- `DateTimeFieldInput`: follows the same field surface model as other text-entry controls.
- `DateTimeFieldTriggerIconButton`: uses local button variables backed by theme tokens.
- `DateTimeFieldCalendar`: follows `Calendar` and `Popover` styling contracts.

## State And Variant Interaction

- Disabled state should dim the input and trigger together.
- Error styling should come from the surrounding field state.
- Time-specific semantics should remain readable even when the control is compressed into dense forms.

## Examples

```css
.scheduleTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```

```css
.compactScheduleTrigger {
  --icon-button-size: 32px;
}
```

## Do Not Override

- Do not hide focus or invalid states with custom trigger colors.
- Do not use this file to restyle the calendar layer; use `Calendar` and `Popover` contracts instead.
- Do not replace semantic theme tokens with raw palette values in field-level overrides.
