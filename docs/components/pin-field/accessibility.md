# PinField Accessibility

## Labeling

- Pair the field with a visible `Label`.
- `PinFieldInput` is the semantic form control and should carry form-related attributes.

## Keyboard Behavior

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

## Accessibility Risks

- omitting `PinFieldInput`
- relying only on visible slots without a real backing control
- unclear labeling for OTP or verification flows
