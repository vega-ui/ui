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

### `PhoneFieldSelectPortal`

[Portal](../../glossary.md#portal) mount for the country listbox.

### `PhoneFieldSelectListbox`

Country options container.

### `PhoneFieldSelectOption`

Selectable country item.

## Composition Order

Typical composition:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `PhoneFieldSelectCombobox`
4. `PhoneFieldSelectPortal`
5. `PhoneFieldSelectListbox`
6. `PhoneFieldInput`

## Valid Composition Patterns

```tsx
<PhoneField>
  <PhoneFieldSelect>
    <PhoneFieldSelectHiddenSelect />
    <PhoneFieldSelectCombobox>
      <PhoneFieldSelectValue />
      <PhoneFieldSelectIcon />
    </PhoneFieldSelectCombobox>
    <PhoneFieldSelectPortal>
      <PhoneFieldSelectListbox>
        <PhoneFieldSelectOption value='US'>United States</PhoneFieldSelectOption>
        <PhoneFieldSelectOption value='GB'>United Kingdom</PhoneFieldSelectOption>
        <PhoneFieldSelectOption value='DE'>Germany</PhoneFieldSelectOption>
      </PhoneFieldSelectListbox>
    </PhoneFieldSelectPortal>
  </PhoneFieldSelect>
  <PhoneFieldInput />
</PhoneField>
```

## Invalid Composition Patterns

### Input outside `PhoneField`

This breaks shared formatting and country coordination.

### Treating the nested select as unrelated to the input

Country changes must still coordinate with the phone mask and validation model.

### Rich option rendering without keeping one selectable row

This weakens keyboard and listbox behavior.
