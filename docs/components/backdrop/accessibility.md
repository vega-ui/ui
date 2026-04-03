# Backdrop Accessibility

## Labeling

- `Backdrop` itself is not a labeled control.

## Keyboard Behavior

- `Backdrop` does not define keyboard interaction on its own.

## Focus Behavior

- Focus handling belongs to the foreground modal, drawer, or custom overlay layer.

## Screen Reader Semantics

- The backdrop is not the primary accessible surface.
- The real accessible contract belongs to the foreground dialog or overlay content.

## Form Semantics

- `Backdrop` is overlay infrastructure, not form input.

## Accessibility Risks

- assuming backdrop click handling is enough for accessible dismissal
- using a backdrop without a foreground layer that manages focus and labeling
