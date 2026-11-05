# VisuallyHidden Accessibility

## Labeling

- `VisuallyHidden` is specifically useful for accessibility-only labels and descriptions.

## Keyboard Behavior

- The component itself has no keyboard behavior.

## Focus Behavior

- Hidden content should generally not become focusable unless that is an explicit and tested pattern.

## Screen Reader Semantics

- The content remains in the accessibility tree.
- Use it to supplement the visible UI, not to replace all visible meaning.

## Form Semantics

- Helpful for hidden descriptions or control names that are referenced by ARIA attributes.

## Accessibility Risks

- overusing hidden-only labeling instead of improving visible clarity
- leaving hidden text out of sync with the real UI state
