# PinField Accessibility

## Labeling

- Pair the field with a visible `Label`.
- `PinFieldInput` is the semantic form control and should carry form-related attributes.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Backspace</kbd> | Deletes the character before the caret. The focus stays in the field, it is one input behind the slots. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard input is handled through `PinFieldInput`.
- Arrow keys move the active slot position; Up and Home go to the start, Down and End to the end.
- Shift with an arrow key extends the selection natively.

## Focus Behavior

- Focus lands on `PinFieldInput` while visible slots reflect the active state.
- Blur clears the active slot indicator.

## Screen Reader Semantics

- `PinFieldInput` keeps the field accessible to assistive technology and browser autofill.
- Visible slots are presentation for the segmented view of the same value.

## Form Semantics

- Put `name`, `required`, and other form props on `PinFieldInput`.
- Keep slot count aligned with `maxLength`.
- The field never sets `aria-invalid`. Set it on `PinFieldInput` together with your error message, for example a wrong code; a native constraint such as `required` or `minLength` marks the slots through `:user-invalid` or `[data-user-edited]:invalid`.

## Accessibility Risks

- omitting `PinFieldInput`
- relying only on visible slots without a real backing control
- unclear labeling for OTP or verification flows
