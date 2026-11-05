# PasswordField Accessibility

## Labeling

- Pair the field with a visible `Label`.
- The toggle button needs a fixed accessible label such as "Show password"; its state is announced through `aria-pressed`.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the toggle button, shows or hides the password and flips `aria-pressed`. The focus stays on the button. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | From the toggle button, returns the focus to the input. The toggle is a separate tab stop after the input. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard input stays native to the input.

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
