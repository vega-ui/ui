# Label Accessibility

## Labeling

- Use `htmlFor` when the control is rendered separately.
- Wrapping the control inside `Label` is also valid for checkbox-like compositions.

## Keyboard Behavior

- `Label` has no custom keyboard behavior.
- Keyboard interaction is owned by the associated control.

## Focus Behavior

- Clicking the label should move focus to the associated control when native label association is intact.

## Screen Reader Semantics

- `Label` renders a native `<label>`.
- Assistive technology uses it to name the associated input when correctly connected.

## Form Semantics

- Prefer a visible `Label` over relying on placeholder text.
- Keep one clear label-to-control relationship.

## Accessibility Risks

- missing `htmlFor` when the control is rendered separately
- using one label for multiple unrelated controls
- placing links or buttons inside the label without testing click behavior
