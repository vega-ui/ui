# Button Accessibility

## Labeling

Button text should describe the action clearly. If the content is icon-only, use `IconButton` with an explicit `aria-label` instead.

## Keyboard Behavior

- Buttons should be reachable in normal tab order.
- The pressed action should remain obvious from the text.
- Polymorphic `asChild` usage should preserve a keyboard-usable interactive element.

## Focus Behavior

- Focus should land on the interactive root.
- Visible focus treatment should remain intact after custom styling.

## Screen Reader Semantics

- The accessible name should come from visible text or supported labeling.
- A button should remain a button unless the consumer intentionally switches semantics through `asChild`.

## Form Semantics

- `type='button'` is the default and avoids accidental submission.
- Use `type='submit'` deliberately when the button belongs to a form submit flow.

## Accessibility Risks

- Ambiguous text like "Continue" without surrounding context.
- Using `asChild` with a child that loses interactive semantics.
- Replacing text with a spinner or icon without preserving understandable meaning.
