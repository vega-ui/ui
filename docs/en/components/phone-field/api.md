# PhoneField API

## Root API

`PhoneField` owns the phone input and country formatting model.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Controlled phone number, as the text of the input. |
| `defaultValue` | `string` | `''` | No | Initial phone number for uncontrolled usage. Defaults to `''`. Its country is selected unless `code` is set. |
| `onChangeValue` | `(value: string) => void` | — | No | Called with the phone number when it changes. |
| `code` | `CountryCode` | — | No | ISO 3166-1 alpha-2 country code used to determine the phone mask format. Example: 'US', 'RU', 'FR'. |
| `defaultCode` | `CountryCode` | `''` | No | ISO 3166-1 alpha-2 country code used to determine the phone mask format. Example: 'US', 'RU', 'FR'. |
| `onChangeCode` | `(code: CountryCode) => void` | — | No | ISO 3166-1 alpha-2 country code used to determine the phone mask format. Example: 'US', 'RU', 'FR'. |
| `strictMask` | `boolean` | `true` | No | If true, enforces the phone number mask strictly — only valid characters in the correct positions are allowed. |
| `size` | `TextFieldSize` | — | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to wrapper element Useful for programmatic control, focus, or integration. |
| `error` | `boolean` | — | No | Shows the input in an error state. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `PhoneFieldInput`

Visible text input for the phone number.

<!-- AUTO-GENERATED:PART_API:PhoneFieldInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldInput:end -->

## `PhoneFieldSelect`

A `Select` bound to the field country: its value is the PhoneField `code`, picking an option updates the country and moves the focus into the input, and its size comes from the field. Put the ordinary [Select](../select/api.md) parts inside it (`SelectHiddenSelect`, `SelectCombobox`, `SelectValue`, `SelectIcon`, `SelectListbox`, `SelectOption`), or skip it and drive `code` and `onChangeCode` from a control of your own.

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelect:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `SelectSize` | — | No | Visual size of the select control. |
| `variant` | `SelectVariant` | — | No | Visual style variant for the select control. |
| `disabled` | `boolean` | — | No | Whether the select is disabled. Prevents interaction and applies a disabled style. |
| `onChangeValue` | `(value: V \| null) => void` | — | No | Callback fired when an option is selected. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root element. |
| `readOnly` | `boolean` | — | No | If true, the select cannot be changed but remains focusable. |
| `typeahead` | `boolean` | `true` | No | Enables moving to an option by typing the start of its label. |
| `open` | `boolean` | — | No | Controls the open state of the Select dropdown. When provided, the Select becomes a controlled component and relies on this value to determine whether the listbox is open or closed. |
| `onChangeOpen` | `(open: boolean) => void` | — | No | Callback fired when the open state changes. Called with the next open state (`true` or `false`) whenever the Select is opened or closed by user interaction. Useful for synchronizing the Select state with external logic. |
| `defaultOpen` | `boolean` | — | No | Sets the initial open state of the Select when used in uncontrolled mode. Applied only on the first render and ignored afterward. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelect:end -->

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
