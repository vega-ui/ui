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
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectValue,
  PhoneFieldSelectIcon,
  PhoneFieldSelectPortal,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  type PhoneFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `PhoneFieldProps`
- `PhoneFieldInputProps`
- `PhoneFieldSelectProps`

## Minimal Composition

```tsx
<PhoneField>
  <PhoneFieldSelect>
    <PhoneFieldSelectHiddenSelect />
    <PhoneFieldSelectCombobox>
      <PhoneFieldSelectValue />
      <PhoneFieldSelectIcon />
    </PhoneFieldSelectCombobox>
    <PhoneFieldSelectPortal>
      <PhoneFieldSelectListbox />
    </PhoneFieldSelectPortal>
  </PhoneFieldSelect>
  <PhoneFieldInput />
</PhoneField>
```

## Required Parts

- `PhoneField`: root field state and formatting context
- `PhoneFieldInput`: actual phone number input

## Optional Parts

- `PhoneFieldSelect*`: nested country-code picker family built on the same select subsystem contract
- `PhoneFieldSelectHiddenSelect`: native [form participation](../../glossary.md#form-participation) for country code
- `PhoneFieldSelectPortal`: [portal](../../glossary.md#portal) for the country list

## Composition Order

Typical composition:

1. `PhoneField`
2. `PhoneFieldSelect`
3. `PhoneFieldSelectHiddenSelect`
4. `PhoneFieldSelectCombobox`
5. `PhoneFieldSelectPortal`
6. `PhoneFieldSelectListbox`
7. `PhoneFieldSelectOption`
8. `PhoneFieldInput`

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
