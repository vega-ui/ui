# PhoneField Anatomy

## Overview

`PhoneField` coordinates input masking, country state, and nested select behavior across the root field and the `PhoneFieldSelect*` family.

## Required Parts

### `PhoneField`

Root provider for phone formatting and country state.

### `PhoneFieldInput`

Visible text input for the number value.

## Optional Parts

### `PhoneFieldSelect`

Nested country-code picker root.

### `PhoneFieldSelectHiddenSelect`

Native [form participation](../../glossary.md#form-participation) for the country value.

### `PhoneFieldSelectCombobox`

Visible trigger for the country picker.

### `PhoneFieldSelectValue`

Current selected country value or custom render content.

### `PhoneFieldSelectIcon`

Visual affordance for the country trigger.

### `PhoneFieldSelectListbox`

Country options container. Renders in the top layer via `popover="manual"`, so no portal part is needed.

### `PhoneFieldSelectOption`

Selectable country item.

## Composition Order

Typical composition:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `PhoneFieldSelectCombobox`
4. `PhoneFieldSelectListbox`
5. `PhoneFieldInput`

## Valid Composition Patterns

<!-- example: phone-field/minimal-composition.tsx -->
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
import { useId } from 'react';

export default function MinimalComposition() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Phone number</Label>
      <PhoneField defaultCode='US'>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect name='country' />
          <PhoneFieldSelectCombobox aria-label='Country'>
            <PhoneFieldSelectValue />
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectListbox>
            <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='GB'>GB</PhoneFieldSelectOption>
            <PhoneFieldSelectOption value='DE'>DE</PhoneFieldSelectOption>
          </PhoneFieldSelectListbox>
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
