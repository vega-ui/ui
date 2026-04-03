# TextArea Accessibility

## Labeling

- Pair `TextArea` with a visible `Label`.

## Keyboard Behavior

- Keyboard behavior follows native textarea interaction.

## Focus Behavior

- Focus is on the textarea itself.
- The field draws its own focus outline.

## Screen Reader Semantics

- `TextArea` renders a native `<textarea>`.
- The control should have a visible label and optional described-by helper text.

## Form Semantics

- Use native textarea props for `name`, `required`, and value handling.
- Apply invalid semantics on the textarea when the field is truly invalid.

## Accessibility Risks

- missing visible label
- using placeholder text as the only prompt
- surfacing error only by red outline
