# TimeField Accessibility

## Labeling

- Pair `TimeFieldInput` with a visible `Label`.
- The label should make the time format expectation clear when needed.

## Keyboard Behavior

- Keyboard entry remains native text input behavior shaped by the mask.

## Focus Behavior

- Focus lands on the input and uses inherited `TextField` focus styling.

## Screen Reader Semantics

- The control is still a native input.
- Users may need explicit helper copy for the expected time format.

## Form Semantics

- Put `name`, `required`, and value props on `TimeFieldInput`.
- Keep bounds and format aligned with the submitted value format.

## Accessibility Risks

- unclear 24-hour vs seconds expectations
- invalid range communicated only by visuals
- missing visible label
