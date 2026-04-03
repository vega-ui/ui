# TextField Accessibility

## Labeling

- Pair `TextFieldInput` with a visible `Label`.
- The label should target the input, not the wrapper.

## Keyboard Behavior

- Keyboard behavior is native to the input element and any optional prefix/suffix controls.

## Focus Behavior

- Focus lands on `TextFieldInput`, not on `TextField`.
- The wrapper draws focus styling when the input is focused.

## Screen Reader Semantics

- The meaningful control is the native input.
- Prefix and suffix content should not interfere with the field’s accessible name.

## Form Semantics

- Use `name`, `value`, `defaultValue`, `required`, and similar form props on `TextFieldInput`.
- Use wrapper `error` only for visual presentation; keep invalid semantics on the input when needed.

## Accessibility Risks

- missing visible label
- error visuals without invalid semantics on the input
- too many adjacent controls inside one field row
