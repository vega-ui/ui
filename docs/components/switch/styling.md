# Switch Styling

## Overview

`Switch` styling is split across the root label-like track and the visible indicator thumb. State changes are coordinated through root-level CSS variables and hidden-input state selectors.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--switch-size` | `Switch`, `SwitchIndicator` | Overall control size. |
| `--switch-background-color` | `Switch` | Current track color. |
| `--switch-indicator-size` | `SwitchIndicator` | Thumb size. |
| `--switch-indicator-transform` | `SwitchIndicator` | Thumb position. |

## Part-Level Variables

- `Switch`: root track, spacing, size, and checked-state color model.
- `SwitchIndicator`: thumb surface and animated position.
- `SwitchHiddenInput`: semantic state carrier for checked, disabled, and focus behavior.

## State And Variant Interaction

- `variant` changes the checked-state color family.
- Active state slightly stretches and shifts the indicator.
- Disabled state overrides track and thumb styling together.

## Examples

```css
.brandSwitch {
  --switch-size: 28px;
}
```

```css
.softSwitch {
  --switch-background-color: var(--fills-secondary);
}
```

## Do Not Override

- Do not hide focus visibility on the track.
- Do not weaken the checked versus unchecked contrast until state becomes ambiguous.
- Do not override the indicator transform logic without retesting interaction states.
