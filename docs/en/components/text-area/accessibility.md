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
- The error look follows `aria-invalid='true'` on the textarea or `:user-invalid`. Set `aria-invalid` for errors only your app knows; native constraints such as `required` and `minLength` mark the field on their own once the user edits it or tries to submit.

## Accessibility Risks

- missing visible label
- using placeholder text as the only prompt
- surfacing error only by red outline
