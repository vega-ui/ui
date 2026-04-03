# DateField Styling

## Overview

`DateField` styling is split across the inherited `TextField` surface, the optional popover-mounted calendar, and a small local contract on `DateFieldTriggerIconButton`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-button-size` | `DateFieldTriggerIconButton` | Keeps the trigger aligned with input height. |
| `--button-color` | `DateFieldTriggerIconButton` | Trigger icon color. |
| `--button-background-color-hover` | `DateFieldTriggerIconButton` | Hover background for the trigger. |

## Part-Level Variables

- `DateField`: inherits most field visuals from `TextField`.
- `DateFieldInput`: uses the same field surface and text treatment as other text-entry controls.
- `DateFieldTriggerIconButton`: defines local button variables that reference theme tokens such as `--text-color` and `--fills-quaternary-hover`.
- `DateFieldCalendar`: mostly follows `Calendar` and `Popover` styling contracts instead of a separate field-local variable set.

## State And Variant Interaction

- `disabled` should dim both typed input and trigger affordance consistently.
- Error styling should come from the surrounding field state instead of ad-hoc trigger overrides.
- Theme-level tokens should drive the look before any component-local overrides.

## Examples

```css
.billingDateFieldTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```

```css
.compactDateFieldTrigger {
  --icon-button-size: 32px;
}
```

## Do Not Override

- Do not force trigger colors that hide focus or invalid states.
- Do not restyle the calendar here; use `Calendar` or `Popover` contracts for that layer.
- Do not replace semantic theme tokens with raw palette values inside field-level overrides.
