# PhoneField API

## Root API

`PhoneField` owns the phone input and country formatting model.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Controlled phone number in E.164, like `"+79123456789"`: the digits typed so far after `+` and the calling code, `''` while the field has no digit after the calling code. The input shows it formatted. |
| `defaultValue` | `string` | `''` | No | Initial phone number for uncontrolled usage, like `value`. Defaults to `''`. Its country is selected unless `country` is set. |
| `onChangeValue` | `(value: string) => void` | — | No | Called with the phone number in E.164 when the user changes it. |
| `country` | `PhoneCountry` | — | No | Controlled ISO 3166-1 alpha-2 country, like `"US"`: the country selected in `PhoneFieldSelect` and the calling code a strict mask starts an empty field with. A change of it never changes the number. |
| `defaultCountry` | `PhoneCountry` | `''` | No | Initial country for uncontrolled usage, like `country`. |
| `onChangeCountry` | `(country: PhoneCountry) => void` | — | No | Called with the country when the user picks one in `PhoneFieldSelect` or types a number of another country. |
| `strictMask` | `boolean` | `true` | No | If true, enforces the phone number mask strictly — only valid characters in the correct positions are allowed, and the calling code stays in front of the number. |
| `numbering` | `PhoneNumbering` | `phoneNumbering` | No | Phone numbering plan the field reads, checks and formats numbers with. Defaults to `phoneNumbering` of `@vega-ui/i18n` on libphonenumber; another engine can be passed as an object of the same interface. |
| `disabled` | `boolean` | — | No | Disables the field like a native `disabled` input: the input and the country select are disabled, and the number is not submitted. |
| `size` | `TextFieldSize` | — | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to wrapper element Useful for programmatic control, focus, or integration. |

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

A `Select` bound to the field country: its value is the PhoneField `country`, picking an option writes the calling code of the country into the input, reports `onChangeCountry` and `onChangeValue` and moves the focus into the input, and its size and `disabled` come from the field. Put the ordinary [Select](../select/api.md) parts inside it (`SelectHiddenSelect`, `SelectCombobox`, `SelectValue`, `SelectIcon`, `SelectListbox`, `SelectOption`), or skip it and drive `country` and `onChangeCountry` from a control of your own.

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelect:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `SelectSize` | — | No | Visual size of the select control. |
| `disabled` | `boolean` | — | No | Whether the select is disabled. Prevents interaction and applies a disabled style. |
| `readOnly` | `boolean` | — | No | If true, the select cannot be changed but remains focusable. |
| `variant` | `SelectVariant` | — | No | Visual style variant for the select control. |
| `onChangeValue` | `(value: V \| null) => void` | — | No | Callback fired when an option is selected. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root element. |
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
- `value` is the number in E.164, like `"+79123456789"`: while typing, the digits typed so far (`"+7912"`), and `''` while the field has no digit after the calling code. The input shows it formatted, like `+7 912 345-67-89`.
- `country` is a hint: the country shown in `PhoneFieldSelect` and the calling code a strict mask starts an empty field with. A change of it from outside never changes the number or the text and calls no `onChangeValue`.
- A pick in `PhoneFieldSelect` is an edit of the user: it writes the calling code of the picked country into the input and reports `onChangeCountry` and `onChangeValue` (with `''`) in the same action, even when `country` is controlled and the parent keeps the old country. A typed number of another country reports its country through `onChangeCountry`.
- Strict and non-strict masking affect input tolerance. A strict mask keeps the calling code the number starts with in front of it, and a form reset brings back the calling code of the default country. Without `strictMask` the field takes an international number: the text starts with `+` and the first digits are the calling code, so `2015550123` is read as `+20…`, not as a number of the selected country.
- A number too short or too long for its country makes `PhoneFieldInput` invalid through `setCustomValidity` with the message of the browser, so `:invalid`, `:user-invalid`, `reportValidity()` and the form submit check work natively. An empty number is valid unless the input is `required`; a `required` input that shows only the calling code, like `+7 `, is invalid with the message of an empty field.
- `PhoneFieldInput` submits the shown text under its `name`, like a native input. To submit the number in E.164, keep it from `onChangeValue` and render a hidden input of your own. `disabled` on `PhoneField`, or a disabled `<fieldset>` around it, disables the input and the country select and leaves the number out of the form.
- Nested select composition should still be treated as one field family.
- The browser does not count a text written by the field as an edit of the user, so the field reports the edit itself: when the user leaves `PhoneFieldInput` after changing its text, the input fires a native `change` event and gets `data-user-edited`. A country picked in `PhoneFieldSelect` fires `change` at once and is not reported again on leaving. A value set through `value` does not mark the field, and a form reset removes the attribute.

## Integration Notes

- The field gives the number in E.164 and checks only its length; validate it by your product rules, for example with `isValidPhoneNumber` from `libphonenumber-js`, outside the presentation layer.
- Retest paste and autofill behavior, not only key-by-key typing.
- Keep country changes and validation logic synchronized.
