# PinField Accessibility

## Labeling

- Pair the field with a visible `Label`.
- The hidden input is the semantic form control and should carry form-related attributes.

## Keyboard Behavior

- Keyboard input is handled through the hidden input.
- Arrow keys move the active slot position.

## Focus Behavior

- Focus lands on the hidden input while visible slots reflect the active state.
- Blur clears the active slot indicator.

## Screen Reader Semantics

- The hidden input keeps the field accessible to assistive technology and browser autofill.
- Visible slots are presentation for the segmented view of the same value.

## Form Semantics

- Put `name`, `required`, and other form props on `PinFieldHiddenInput`.
- Keep slot count aligned with `maxLength`.

## Accessibility Risks

- omitting the hidden input
- relying only on visible slots without a real backing control
- unclear labeling for OTP or verification flows
