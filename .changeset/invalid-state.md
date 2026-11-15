---
"@vega-ui/react": major
---

Fields show the error state from the native semantics of their control instead of an `error` prop.

- **Breaking:** the `error` prop of `TextField`, `TextArea` and `PinField`, and so of `DateField`, `DateRangeField`, `DateTimeField`, `TimeField`, `NumberField`, `PhoneField` and `PasswordField`, is removed, and so is their `data-error` attribute. A field shows the error state when its control has `aria-invalid="true"`, for an error only the app knows, or fails native validation after the user edited it or tried to submit the form (`:user-invalid`), for `required`, `pattern`, `min`, `max` or `setCustomValidity`
- **Breaking:** `PinFieldInput` no longer sets `aria-invalid` itself; pass it to the input like to any other field
- **Breaking:** the `error` prop of `HelperText` is renamed to `invalid`, and its `data-error` attribute to `data-invalid`
- `HelperText` shows its own tertiary and error colors; the color of `Text` used to override them
- `TimeField`, `DateField`, `DateTimeField`, `DateRangeField`, `NumberField`, `PhoneField` and `PinField` dispatch `change` when the user leaves the input after changing its text, like a native input; a pick in the calendar or a step that already dispatched `change` is not reported again. The browser does not count a text these fields write as an edit of the user, so `:user-invalid` stays off for them in Chromium and WebKit: the input gets `data-user-edited` instead, and a form reset removes it. Style an invalid field the user has left with `:is(:user-invalid, [data-user-edited]:invalid)`
- `Checkbox`, `CheckboxCard`, `Radio`, `Switch`, `Select` and `Slider` show the error state the same way: `aria-invalid="true"` on `CheckboxInput`, the `Radio` input, `SwitchInput`, `SelectCombobox` or `SliderThumbInput`, or `:user-invalid` of the native control, like a `required` checkbox or a `required` `SelectHiddenSelect` after a submit attempt
