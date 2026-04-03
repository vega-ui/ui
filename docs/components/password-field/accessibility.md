# PasswordField Accessibility

## Labeling

- Pair the field with a visible `Label`.
- The toggle button needs an explicit accessible label.

## Keyboard Behavior

- Keyboard input stays native to the input.
- The toggle button should remain keyboard reachable and operable.

## Focus Behavior

- Toggling visibility should preserve or return focus to the input.

## Screen Reader Semantics

- The actual control is still a native input.
- The toggle should announce its purpose clearly.

## Form Semantics

- Submit, `name`, `required`, and autocomplete behavior belong to `PasswordFieldInput`.
- Use `autoComplete='current-password'` or `autoComplete='new-password'` intentionally.

## Accessibility Risks

- unlabeled toggle button
- helper text or strength hints without actual validation semantics
- custom icon-only affordances that are unclear to assistive technology
