# Meter Accessibility

## Labeling

Meters should usually have nearby text that explains what is being measured.

## Keyboard Behavior

- Static meters usually do not need focus.

## Focus Behavior

- `Meter` is not typically focusable unless wrapped into a larger interactive pattern.

## Screen Reader Semantics

- The root uses `role='meter'`.
- Use `valueText` when the raw numeric value is not enough to explain the measurement.
- Threshold-based color changes should still be explained by text or context.

## Form Semantics

- `Meter` is not a form control.

## Accessibility Risks

- Showing a meter without saying what the value means.
- Relying only on semantic color shifts.
- Using meter for async completion rather than measurement.
