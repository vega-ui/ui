# Link Accessibility

## Labeling

Link text should describe the destination or result of navigation clearly. Avoid vague text such as "Click here".

## Keyboard Behavior

- Links should be reachable in normal tab order.
- The destination should remain understandable from the link text alone whenever possible.

## Focus Behavior

- Focus should land on the anchor or link-like root.
- Visible focus treatment should remain intact inside running text and dense layouts.

## Screen Reader Semantics

- A link should remain a link unless the consumer intentionally changes semantics through `asChild`.
- Inline links should still read naturally within surrounding copy.

## Form Semantics

- Links are navigational, not form controls.
- Supporting navigation links in forms should stay clearly secondary to submit actions.

## Accessibility Risks

- Vague link text.
- Using links for actions that mutate state.
- Styling a link like a button without preserving navigation semantics.
