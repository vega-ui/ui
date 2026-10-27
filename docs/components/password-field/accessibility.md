# PasswordField Accessibility

## Labeling

- Pair the field with a visible `Label`.
- The toggle button needs a fixed accessible label such as "Show password"; its state is announced through `aria-pressed`.

## Keyboard Behavior

- Keyboard input stays native to the input.
- The toggle button should remain keyboard reachable and operable.

## Focus Behavior

- Toggling keeps the focus on the toggle button, so keyboard and screen reader users hear the new state and mobile keyboards do not open.

## Screen Reader Semantics

- The actual control is still a native input.
- The toggle is announced as a toggle button, pressed while the password is shown.

## Form Semantics

- Submit, `name`, `required`, and autocomplete behavior belong to `PasswordFieldInput`.
- Use `autoComplete='current-password'` or `autoComplete='new-password'` intentionally.

## Accessibility Risks

- unlabeled toggle button
- helper text or strength hints without actual validation semantics
- custom icon-only affordances that are unclear to assistive technology
