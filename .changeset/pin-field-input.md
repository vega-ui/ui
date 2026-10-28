---
"@vega-ui/react": major
---

`PinField` input reworked:

- **Breaking:** `PinFieldHiddenInput` is renamed to `PinFieldInput`, like `PasswordFieldInput` and `TextFieldInput`
- **Breaking:** `PinFieldInput` no longer takes `disabled` and `maxLength`; set them on `PinField`, so the input and the slots always agree
- `PinFieldInput` takes `value`, `defaultValue` and `onChange` like a native `<input>`; the slots follow a controlled `value` changed outside and a form reset
- `maxLength` of `PinField` is optional and defaults to `4`
- the `placeholder` of `PinField` is also set on the input
- Home and End move to the start and the end; Shift with an arrow key extends the selection natively
- the `PinField` context is named `PinFieldContext` in errors
