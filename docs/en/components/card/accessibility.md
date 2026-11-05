# Card Accessibility

## Labeling

`Card` itself is not a labeled control. The meaningful labels belong to the headings, text, links, or actions placed inside it.

## Keyboard Behavior

- A static card usually does not need focus.
- If the card becomes interactive through `asChild`, the rendered child must preserve correct semantics.

## Focus Behavior

- Non-interactive cards should not enter tab order.
- Interactive card compositions should expose clear focus treatment on the rendered interactive root.

## Screen Reader Semantics

- The card surface should not replace real headings or landmarks.
- Grouped content still needs meaningful inner structure.

## Form Semantics

- `Card` is not a form control.
- Form semantics belong to the fields placed inside the card.

## Accessibility Risks

- Treating surface styling as a substitute for information hierarchy.
- Making a card clickable without a clear interactive root.
- Using transparent cards where grouped content loses separation.
