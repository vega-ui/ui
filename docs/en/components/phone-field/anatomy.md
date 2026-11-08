# PhoneField Anatomy

## Overview

`PhoneField` coordinates input masking, country state, and nested select behavior across the root field and `PhoneFieldSelect` with its Select parts.

## Required Parts

### `PhoneField`

Root provider for phone formatting and country state.

### `PhoneFieldInput`

Visible text input for the number value.

## Optional Parts

### `PhoneFieldSelect`

Country-code picker: a `Select` bound to the field country. Picking an option updates the country and moves the focus into the input.

### Select parts

Children of `PhoneFieldSelect` are the ordinary [Select](../select/anatomy.md) parts:

- `SelectHiddenSelect`: native [form participation](../../glossary.md#form-participation) for the country value
- `SelectCombobox`: visible trigger for the country picker
- `SelectValue`: current selected country or custom render content
- `SelectIcon`: visual affordance for the country trigger
- `SelectListbox`: country options container, rendered in the top layer via `popover="auto"`
- `SelectOption`: selectable country item

## Composition Order

Typical composition:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `SelectCombobox`
4. `SelectListbox`
5. `PhoneFieldInput`

## Valid Composition Patterns

<!-- example: phone-field/minimal-composition.tsx -->
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
import { useId } from 'react';

export default function MinimalComposition() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField defaultCode='US'>
        <PhoneFieldSelect>
          <SelectHiddenSelect name='country' />
          <SelectCombobox aria-label='Country'>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='US'>US</SelectOption>
            <SelectOption value='GB'>GB</SelectOption>
            <SelectOption value='DE'>DE</SelectOption>
          </SelectListbox>
        </PhoneFieldSelect>
        <PhoneFieldInput id={id} name='phone' autoComplete='tel' />
      </PhoneField>
    </div>
  );
}
```
<!-- /example -->

The `Label` names the input, the country trigger gets its own `aria-label`, and the hidden select submits the country next to the number. Without `PhoneFieldSelect` the field still formats by `code` alone.

## Invalid Composition Patterns

### Input outside `PhoneField`

This breaks shared formatting and country coordination.

### Treating the nested select as unrelated to the input

Country changes must still coordinate with the phone mask and validation model.

### Rich option rendering without keeping one selectable row

This weakens keyboard and listbox behavior.
