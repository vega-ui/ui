# Switch API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `SwitchVariant` | `'primary'` | No | Visual variant of the checkbox, for theme or context switching. |
| `size` | `SwitchSize` | `'md'` | No | Size of the checkbox input and its visual marker. |
| `ref` | `Ref<HTMLLabelElement>` | — | No | Ref to the native label element. |

Also accepts all `<label>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SwitchInput`: native checked state and form participation.
- `SwitchIndicator`: visible switch surface.

### `SwitchInput`

<!-- AUTO-GENERATED:PART_API:SwitchInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:SwitchInput:end -->

### `SwitchIndicator`

<!-- AUTO-GENERATED:PART_API:SwitchIndicator:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SwitchIndicator:end -->

## Types

- `SwitchProps`
- `SwitchInputProps`
- `SwitchIndicatorProps`
- `SwitchVariant`
- `SwitchSize`

## State Model

- The visible root mostly provides size and variant context.
- Checked and disabled semantics typically live on `SwitchInput`.
- `useSwitchContext` is available for advanced wrappers and custom compositions.
