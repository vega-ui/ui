# Progress Accessibility

## Labeling

Progress bars should usually have visible surrounding text that explains what is progressing.

## Keyboard Behavior

- Static progress indicators usually do not need focus.

## Focus Behavior

- `Progress` is not typically focusable unless the surrounding pattern makes it interactive.

## Screen Reader Semantics

- The root uses `role='progressbar'`.
- Use `valueText` when the plain numeric value is not enough to explain the state.
- Indeterminate progress still needs descriptive context in surrounding copy.

## Form Semantics

- `Progress` is not a form control.

## Accessibility Risks

- Showing progress without saying what is progressing.
- Using determinate values that do not match the real task state.
- Using progress for static descriptive measurements.
