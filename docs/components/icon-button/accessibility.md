# IconButton Accessibility

## Labeling

Always provide an explicit accessible label because visible text is usually absent.

## Keyboard Behavior

- Icon buttons should be reachable in normal tab order.
- The action should remain understandable from the accessible name alone.

## Focus Behavior

- Focus should land on the interactive root.
- Visible focus styling should remain intact after custom styling.

## Screen Reader Semantics

- The accessible name should come from `aria-label` or equivalent supported labeling.
- Decorative icons should not be the only source of meaning.

## Form Semantics

- `type='button'` is the default.
- Use `type='submit'` only when an icon-only submit action is still clear in context.

## Accessibility Risks

- Missing `aria-label`.
- Icon-only destructive actions whose meaning is not obvious.
- Replacing clear text actions with icon-only affordances too early.
