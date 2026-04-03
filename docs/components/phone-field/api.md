# PhoneField API

## Root API

`PhoneField` owns the phone input and country formatting model.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `code` | `CountryCode` | `—` | No | ISO 3166-1 alpha-2 country code used to determine the phone mask format. |
| `defaultCode` | `CountryCode` | `'' as CountryCode` | No | ISO 3166-1 alpha-2 country code used to determine the phone mask format. |
| `onChangeCode` | `(code: CountryCode) => void` | `—` | No | ISO 3166-1 alpha-2 country code used to determine the phone mask format. |
| `strictMask` | `boolean` | `true` | No | enforces the phone number mask strictly — only valid characters in the correct positions are allowed. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `PhoneFieldInput`

Visible text input for the phone number.

## `PhoneFieldSelect*`

Nested country-select family built around the same field state.

- `PhoneFieldSelect`
- `PhoneFieldSelectHiddenSelect`
- `PhoneFieldSelectCombobox`
- `PhoneFieldSelectValue`
- `PhoneFieldSelectIcon`
- `PhoneFieldSelectPortal`
- `PhoneFieldSelectListbox`
- `PhoneFieldSelectOption`

## Hooks

## `usePhoneFieldContext`

Advanced hook for custom wrappers and integrations.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `PhoneFieldProps` | Root prop type | Main field integration surface. |
| `PhoneFieldInputProps` | Input part prop type | Number input behavior. |
| `PhoneFieldSelectProps` | Select root prop type | Nested country picker surface. |

## State Model

- Root state coordinates country and input formatting.
- Strict and non-strict masking affect input tolerance.
- Nested select composition should still be treated as one field family.

## Integration Notes

- Validate and normalize canonical values outside the presentation layer.
- Retest paste and autofill behavior, not only key-by-key typing.
- Keep country changes and validation logic synchronized.
