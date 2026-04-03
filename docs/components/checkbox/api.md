# Checkbox API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `indeterminate` | `boolean` | `—` | No | Sets the checkbox to an indeterminate visual state. |
| `checked` | `boolean` | `—` | No | Controlled checked state of the checkbox. |
| `defaultChecked` | `boolean` | `—` | No | Initial checked state for uncontrolled usage. |
| `variant` | `CheckboxVariant` | `'primary'` | No | Visual variant of the checkbox, for theme or context switching. |
| `size` | `CheckboxSize` | `'md'` | No | Size of the checkbox input and its visual marker. |
| `onChangeChecked` | `(value: boolean) => void` | `—` | No | Callback function fired when the checkbox state changes. |
| `disabled` | `boolean` | `—` | No | Disables the checkbox, making it non-interactive. |
| `ref` | `Ref<HTMLLabelElement>` | `—` | No | Ref to the native label element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `CheckboxHiddenInput`: native form participation.
- `CheckboxIndicator`: visible checkbox surface.
- `CheckboxCheckedIcon`: optional checked-state icon.
- `CheckboxIndeterminateIcon`: optional indeterminate-state icon.

## Types

- `CheckboxProps`
- `CheckboxHiddenInputProps`
- `CheckboxIndicatorProps`
- `CheckboxCheckedIconProps`
- `CheckboxIndeterminateIconProps`
- `CheckboxVariant`
- `CheckboxSize`

## State Model

- `Checkbox` can be uncontrolled through `defaultChecked` or controlled through `checked` and `onChangeChecked`.
- `indeterminate` is usually a visual partial-selection state.
- `useCheckboxContext` is available for advanced wrappers and custom parts.
