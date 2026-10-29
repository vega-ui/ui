# Switch API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `variant` | `SwitchVariant` | `'primary'` | No | Visual variant of the checkbox, for theme or context switching. |
| `size` | `SwitchSize` | `'md'` | No | Size of the checkbox input and its visual marker. |
| `ref` | `Ref<HTMLLabelElement>` | `—` | No | Ref to the native label element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SwitchInput`: native checked state and form participation.
- `SwitchIndicator`: visible switch surface.

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
