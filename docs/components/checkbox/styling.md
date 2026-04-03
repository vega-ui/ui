# Checkbox Styling

## Overview

`Checkbox` styling is split across the root label state model and the visible indicator surface. Checked, indeterminate, disabled, and focus behavior are coordinated through root-level CSS variables.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--checkbox-size` | `Checkbox`, `CheckboxIndicator` | Visual size. |
| `--checkbox-border-color` | `Checkbox`, `CheckboxIndicator` | Current border color. |
| `--checkbox-background-color` | `Checkbox`, `CheckboxIndicator` | Current background color. |
| `--checkbox-color` | `CheckboxIndicator` | Icon color. |
| `--checkbox-outline` | `CheckboxIndicator` | Focus outline. |

## Part-Level Variables

- `Checkbox`: root state owner for checked, indeterminate, disabled, and variant styles.
- `CheckboxIndicator`: visible control surface.
- `CheckboxCheckedIcon` and `CheckboxIndeterminateIcon`: icon rendering inside the indicator.

## State And Variant Interaction

- `variant` changes the checked and indeterminate color family.
- Disabled state overrides both background and border semantics.
- Focus lives on the hidden input but is rendered through the indicator.

## Examples

```css
.brandCheckbox {
  --checkbox-br-ratio: 0.25;
}
```

```css
.compactCheckbox {
  --checkbox-size: 14px;
}
```

## Do Not Override

- Do not remove the focus outline without a replacement.
- Do not hide the difference between unchecked and checked or indeterminate states.
- Do not force custom colors that weaken disabled-state readability.
