# Radio Styling

## Overview

`Radio` styling is driven by a small input-level variable surface for size, border color, and focus outline. It stays closer to a native input than the more composable checkbox or switch controls.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--radio-size` | `Radio` | Visual control size. |
| `--radio-border-color` | `Radio` | Current border color. |
| `--focus-color` | `Radio` | Focus outline color. |
| `--transition-state-delay` | `Radio` | State transition timing. |
| `--radio-border-color-hover` | `Radio` | Border color on hover. |
| `--radio-border-color-active` | `Radio` | Border color while pressed. |

## Part-Level Variables

- `Radio`: owns the entire visual surface as one styled native input.

## State And Variant Interaction

- `size` maps to different spacing tokens.
- `variant` changes the checked-state color family.
- Disabled state changes background and checked treatment together.

## Examples

<!-- example: radio/examples.css -->
```css
.brandRadio {
  --focus-color: var(--fills-primary);
}
```
<!-- /example -->

<!-- example: radio/styling-examples.css -->
```css
.compactRadio {
  --radio-size: 14px;
}
```
<!-- /example -->

## Do Not Override

- Do not remove the focus outline without a replacement.
- Do not weaken the checked-state border width until selection becomes hard to distinguish.
- Do not use raw palette overrides where semantic tokens already exist.
