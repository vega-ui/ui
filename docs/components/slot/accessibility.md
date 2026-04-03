# Slot Accessibility

## Labeling

- `Slot` does not create accessible labels itself.

## Keyboard Behavior

- Keyboard behavior depends entirely on the slotted child element.

## Focus Behavior

- Focus behavior also depends on the slotted child.

## Screen Reader Semantics

- `Slot` does not change the chosen element’s semantics by itself.
- Choosing the wrong child element can silently break semantics.

## Form Semantics

- `Slot` can preserve or change form semantics depending on the slotted child element.

## Accessibility Risks

- changing a semantic button into a non-semantic element accidentally
- assuming styling and semantics are the same thing
