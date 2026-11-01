# Listbox API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `multiple` | `M` | `—` | No | Allows selecting several options. |
| `value` | `M extends true ? V[] : V \\| null` | `—` | No | currently selected value (controlled). |
| `defaultValue` | `ListboxValue<V, M>` | `—` | No | default selected value (uncontrolled). |
| `onChangeValue` | `(value: ListboxValue<V, M>) => void` | `—` | No | Callback fired when the selection changes. |
| `disabled` | `boolean` | `—` | No | Prevents interaction and removes the list from the tab order. |
| `size` | `OptionSize` | `'md'` | No | Visual size of the options. |
| `typeahead` | `boolean` | `true` | No | Enables moving to an option by typing the start of its label. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref forwarded to the listbox element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

### ListboxOption

- `value`: the value passed to `onChangeValue` when the option is selected. Required.
- `label`: plain text for typeahead, used instead of the text of the content.
- `disabled`: makes the option unavailable.
- `size`: overrides the size of the list.

### ListboxGroup

Groups related options like a native `optgroup`. Name it with `aria-labelledby` pointing to your heading, or with `aria-label`.

## Types

- `ListboxProps<V, M>`: `V` is the type of the values, `M` is `true` with `multiple`
- `ListboxOptionProps<V>`
- `ListboxGroupProps`
- `ListboxValue<V, M>`

## State Model

- The list owns the selection, the active option, and typeahead.
- Without `multiple` the value is one option, and with `multiple` it is an array.
