# Listbox API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `multiple` | `Multiple` | — | No | Allows selecting several options. Determines the structure of `value`: an array when true. |
| `value` | `Multiple extends true ? Value[] : Value \| null` | — | No | The currently selected value (controlled). Without `multiple`, `null` clears the selection, while `undefined` makes the list uncontrolled. |
| `defaultValue` | `ListboxValue<Value, Multiple>` | — | No | The default selected value (uncontrolled). |
| `onChangeValue` | `(value: ListboxValue<Value, Multiple>) => void` | — | No | Callback fired when the selection changes. |
| `disabled` | `boolean` | `false` | No | Prevents interaction and removes the list from the tab order. |
| `size` | `OptionSize` | `'md'` | No | Visual size of the options. |
| `typeahead` | `boolean` | `true` | No | Enables moving to an option by typing the start of its label. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the listbox element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

### ListboxOption

- `value`: the value passed to `onChangeValue` when the option is selected. Required.
- `label`: plain text for typeahead, used instead of the text of the content.
- `disabled`: makes the option unavailable.
- `size`: overrides the size of the list.

### ListboxGroup

Groups related options like a native `optgroup`. Name it with `aria-labelledby` pointing to your heading, or with `aria-label`.

### `ListboxOption`

<!-- AUTO-GENERATED:PART_API:ListboxOption:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `Value` | — | Yes | The value of this option, passed to the change callback when it is selected. |
| `label` | `string` | — | No | Plain text of this option, used instead of the text of its content for typeahead and as the text a Combobox writes into its input. |
| `children` | `ReactNode` | — | No | The content displayed for this option. Can include text, icons, or complex markup. |
| `size` | `OptionSize` | — | No | Size of the option for visual styling. |
| `disabled` | `boolean` | — | No | Disables the entire Option. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root div of the option. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:ListboxOption:end -->

### `ListboxGroup`

<!-- AUTO-GENERATED:PART_API:ListboxGroup:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the group element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:ListboxGroup:end -->

## Types

- `ListboxProps<V, M>`: `V` is the type of the values, `M` is `true` with `multiple`
- `ListboxOptionProps<V>`
- `ListboxGroupProps`
- `ListboxValue<V, M>`

## State Model

- The list owns the selection, the active option, and typeahead.
- When the active option is removed or disabled, the next enabled option becomes active, or the previous one when it was the last; like a native `select` that loses its selected option, this calls no `onChangeActive`.
- Without `multiple` the value is one option, and with `multiple` it is an array.
