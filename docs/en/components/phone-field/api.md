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

## `PhoneFieldSelect*`

Nested country-select family built around the same field state.

- `PhoneFieldSelect`
- `PhoneFieldSelectHiddenSelect`
- `PhoneFieldSelectCombobox`
- `PhoneFieldSelectValue`
- `PhoneFieldSelectIcon`
- `PhoneFieldSelectListbox`
- `PhoneFieldSelectOption`

## `PhoneFieldSelect`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelect:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `SelectSize` | — | No | Visual size of the select control. |
| `variant` | `SelectVariant` | — | No | Visual style variant for the select control. |
| `disabled` | `boolean` | — | No | Whether the select is disabled. Prevents interaction and applies a disabled style. |
| `onChangeValue` | `(value: V \| undefined) => void` | — | No | Callback fired when an option is selected. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root element. |
| `readOnly` | `boolean` | — | No | If true, the select cannot be changed but remains focusable. |
| `typeahead` | `boolean` | `true` | No | Enables moving to an option by typing the start of its label. |
| `open` | `boolean` | — | No | Controls the open state of the Select dropdown. When provided, the Select becomes a controlled component and relies on this value to determine whether the listbox is open or closed. |
| `onChangeOpen` | `(open: boolean) => void` | — | No | Callback fired when the open state changes. Called with the next open state (`true` or `false`) whenever the Select is opened or closed by user interaction. Useful for synchronizing the Select state with external logic. |
| `defaultOpen` | `boolean` | — | No | Sets the initial open state of the Select when used in uncontrolled mode. Applied only on the first render and ignored afterward. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelect:end -->

## `PhoneFieldSelectHiddenSelect`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectHiddenSelect:start -->
Also accepts all `<select>` attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectHiddenSelect:end -->

## `PhoneFieldSelectCombobox`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectCombobox:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref to the underlying `<button>` element. Useful for focus management, positioning, and imperative access. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectCombobox:end -->

## `PhoneFieldSelectValue`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectValue:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `placeholder` | `string` | — | No | Placeholder text shown when no option is selected. Displayed when the select value is empty or undefined. Once a value is selected, the placeholder is replaced by the selected option’s content. |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref forwarded to the root span element. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectValue:end -->

## `PhoneFieldSelectIcon`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectIcon:end -->

## `PhoneFieldSelectOption`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectOption:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `CountryCode` | — | Yes | The value of this option, passed to the change callback when it is selected. |
| `label` | `string` | — | No | Plain text of this option for typeahead, used instead of the text of its content. |
| `children` | `ReactNode` | — | No | The content displayed for this option. Can include text, icons, or complex markup. |
| `size` | `OptionSize` | — | No | Size of the option for visual styling. |
| `disabled` | `boolean` | — | No | Disables the entire Option. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root div of the option. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectOption:end -->

## `PhoneFieldSelectListbox`

<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectListbox:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the listbox container element. Can be used for imperative access, for example measurements. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:PhoneFieldSelectListbox:end -->

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
