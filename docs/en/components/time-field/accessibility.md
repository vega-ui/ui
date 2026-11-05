# TimeField Accessibility

## Labeling

- Pair `TimeFieldInput` with a visible `Label`.
- The label should make the time format expectation clear when needed.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>↑</kbd> / <kbd>↓</kbd> | With the caret in the hours: steps them by one. In the minutes or seconds: steps them by `step` (1 by default). A segment wraps around its range without changing the others. `step={0}` turns stepping off. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard entry remains native text input behavior shaped by the mask.

## Focus Behavior

- Focus lands on the input and uses inherited `TextField` focus styling.

## Screen Reader Semantics

- The control is still a native input.
- Users may need explicit helper copy for the expected time format.

## Form Semantics

- Put `name` and `required` on `TimeFieldInput`, and `value` or `defaultValue` on `TimeField`.
- Keep bounds and format aligned with the submitted value format.

## Accessibility Risks

- unclear 24-hour vs seconds expectations
- invalid range communicated only by visuals
- missing visible label
