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

Without a code the trigger shows the `placeholder` of `PhoneFieldSelectValue`, and children of `PhoneFieldSelectIcon` replace the default chevron.

<!-- example: phone-field/select-placeholder-and-custom-icon.tsx -->
```tsx
import {
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectValue,
} from '@vega-ui/react';
import { ChevronsUpDown } from '@vega-ui/icons';
import { useId } from 'react';

export default function SelectPlaceholderAndCustomIcon() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect name='country' />
          <PhoneFieldSelectCombobox aria-label='Country'>
            <PhoneFieldSelectValue placeholder='Code' />
            <PhoneFieldSelectIcon>
              <ChevronsUpDown />
            </PhoneFieldSelectIcon>
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='ES'>ES</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='IT'>IT</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='PT'>PT</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- do not assume undocumented `--phone-field-*` hooks exist
- do not style the nested select independently from the input so aggressively that the control stops reading like one field
