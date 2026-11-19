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

The country picker is built from the ordinary [Select](../select/styling.md) parts, so `SelectCombobox`, `SelectListbox`, and `SelectOption` are styled as in `Select`. `PhoneFieldSelect` sets `--select-combobox-gap` to `var(--spacing-6)` to keep the code close to the icon on every size. When an option holds a flag or name next to a calling code, set its spacing yourself, for example `style={{ justifyContent: 'space-between', gap: 'var(--spacing-6)' }}` on `SelectOption`.

## State And Variant Interaction

- `strictMask` changes behavior more than styling
- the error look (`aria-invalid='true'`, `:user-invalid` or `[data-user-edited]:invalid` on `PhoneFieldInput`) and `disabled` should stay aligned with shared field semantics
- custom selected-country rendering affects density and alignment

`PhoneField` writes the text of `PhoneFieldInput` itself, and Chromium and WebKit do not count that text as an edit of the user, so the input does not match `:user-invalid` after it. A number too short or too long for its country matches `:invalid` by itself. In your own CSS, pair `:user-invalid` with `[data-user-edited]:invalid`:

```css
.contact-phone:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

## Examples

### Theme-level field tuning

The field has no `--phone-field-*` variables, so a theme class retunes the shared field tokens for everything inside it.

<!-- example: phone-field/theme-level-field-tuning.css -->
```css
.brand-theme {
  --fills-tertiary: color-mix(in oklch, var(--color-blue-accent-500) 6%, transparent);
  --focus-color: var(--color-blue-accent-400);
}
```
<!-- /example -->

### Select placeholder and custom icon

Without a country the trigger shows the `placeholder` of `SelectValue`, and `SelectIcon` shows the icon passed as its children.

<!-- example: phone-field/select-placeholder-and-custom-icon.tsx -->
```tsx
import {
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { ChevronsUpDownIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function SelectPlaceholderAndCustomIcon() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField>
        <PhoneFieldSelect>
          <SelectHiddenSelect name='country' />
          <SelectCombobox aria-label='Country'>
            <SelectValue placeholder='Code' />
            <SelectIcon>
              <ChevronsUpDownIcon />
            </SelectIcon>
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='ES'>ES</SelectOption>
            <SelectOption value='IT'>IT</SelectOption>
            <SelectOption value='PT'>PT</SelectOption>
          </SelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput name='phone' id={id} autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- do not assume undocumented `--phone-field-*` hooks exist
- do not style the nested select independently from the input so aggressively that the control stops reading like one field
