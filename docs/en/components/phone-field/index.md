# PhoneField

## Doc Profile

`advanced interactive`

## Summary

`PhoneField` is a [compound component](../../glossary.md#compound-component) that combines a masked phone input with a nested country-code `Select`. It is the consumer-facing phone-entry layer, not just a loose `Select` plus `TextField` pairing.

## Imports

```tsx
import {
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  SelectHiddenSelect,
  SelectCombobox,
  SelectValue,
  SelectIcon,
  SelectListbox,
  SelectOption,
  type PhoneFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `PhoneFieldProps`
- `PhoneFieldInputProps`
- `PhoneFieldSelectProps`

## Minimal Composition

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

## Required Parts

- `PhoneField`: root field state and formatting context
- `PhoneFieldInput`: actual phone number input

## Optional Parts

- `PhoneFieldSelect`: a `Select` bound to the field country; put the [Select](../select/index.md) parts inside it
- `SelectHiddenSelect`: native [form participation](../../glossary.md#form-participation) for country code

## Composition Order

Typical composition:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `SelectHiddenSelect`
4. `SelectCombobox`
5. `SelectListbox`
6. `SelectOption`
7. `PhoneFieldInput`

Instead of `PhoneFieldSelect` you can put any control of your own next to the field (a plain `Select`, a `Combobox`, buttons) and drive it with controlled `code` and `onChangeCode`. When `code` changes from outside, the field writes the new calling code into the input itself and reports it through `onChangeValue`. Like a native input whose `value` is set from code, it does not fire `input` and `change` events then; those fire only when the country is picked in `PhoneFieldSelect`.

## Variants

- Input-only usage versus full country-select composition
- `strictMask` versus lenient input
- Controlled input value versus uncontrolled form usage

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Country changes can require reformatting and revalidation.
- Strict masking and paste behavior should both be tested.
- Persist canonical values at the feature boundary, not only the displayed formatted string.
- Autofill, pasted values, and partially typed international prefixes should be tested together, not as isolated cases.

## Common Mistakes

- Treating only the visible formatted string as the [source of truth](../../glossary.md#source-of-truth).
- Ignoring country changes in validation logic.
- Testing typing flow only and skipping paste or autofill.
