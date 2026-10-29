# Checkbox API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `variant` | `CheckboxVariant` | `'primary'` | No | Visual variant of the checkbox, for theme or context switching. |
| `size` | `CheckboxSize` | `'md'` | No | Size of the checkbox input and its visual marker. |
| `ref` | `Ref<HTMLLabelElement>` | `—` | No | Ref to the native label element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `CheckboxInput`: the native `<input type="checkbox">`. Takes `checked`, `defaultChecked`, `onChange`, `disabled`, `name`, `value` and `indeterminate`.
- `CheckboxIndicator`: visible checkbox surface.
- `CheckboxCheckedIcon`: optional checked-state icon.
- `CheckboxIndeterminateIcon`: optional indeterminate-state icon.

## Types

- `CheckboxProps`
- `CheckboxInputProps`
- `CheckboxIndicatorProps`
- `CheckboxCheckedIconProps`
- `CheckboxIndeterminateIconProps`
- `CheckboxVariant`
- `CheckboxSize`

## State Model

- Checked state lives on `CheckboxInput`, like on a native checkbox: uncontrolled through `defaultChecked`, controlled through `checked` and `onChange`.
- `indeterminate` on `CheckboxInput` sets the native `indeterminate` property. It is usually a visual partial-selection state.
- `Checkbox` owns only `size` and `variant`; `useCheckboxContext` exposes them to custom parts.
