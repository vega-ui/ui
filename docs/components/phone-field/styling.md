# PhoneField Styling

## Overview

`PhoneField` styling is split across the input plus the nested country-select family. Most visual behavior comes from shared field tokens and the nested select styling model.

## Public CSS Variables

The current implementation exposes very few explicit `--phone-field-*` variables. Most styling hooks come from shared field tokens and the nested select parts.

| Variable | Used By | Purpose |
| --- | --- | --- |
| shared field tokens | `PhoneFieldInput` | input size and text styling |
| spacing tokens | select parts | trigger and option layout |

## Part-Level Variables

### Input

The input follows the shared field styling model used by other text-entry controls.

### Select Family

`PhoneFieldSelectCombobox`, `PhoneFieldSelectListbox`, and `PhoneFieldSelectOption` expose layout hooks closer to the `Select` family than to a standalone `PhoneField` token surface.

## State And Variant Interaction

- `strictMask` changes behavior more than styling
- `error` and `disabled` states should stay aligned with shared field semantics
- custom selected-country rendering affects density and alignment

## Examples

### Theme-level field tuning

```css
.brand-theme {
  --fills-tertiary: rgba(30, 58, 138, 0.05);
  --focus-color: var(--color-blue-accent-400);
}
```

## Do Not Override

- do not assume undocumented `--phone-field-*` hooks exist
- do not style the nested select independently from the input so aggressively that the control stops reading like one field
