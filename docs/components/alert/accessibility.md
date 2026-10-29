# Alert Accessibility

## Labeling

Alert titles and content should remain understandable without relying only on icon or color.

## Keyboard Behavior

- A static alert usually does not need focus.
- Interactive controls placed inside the alert should remain individually keyboard reachable.

## Focus Behavior

- Focus behavior belongs to any controls inside the alert, not to the alert root itself.

## Screen Reader Semantics

- The text should communicate the message clearly without color.
- Title and content hierarchy should remain meaningful even if the icon is ignored.
- `Alert` has no live region role by default, because `variant` describes the look, not how urgent the message is.
- An alert that appears after a user action and needs immediate attention takes `role='alert'`. Screen readers announce it as soon as it is rendered.
- A non-urgent result of an action goes into a `role='status'` container that stays mounted, with the alert rendered inside it. A polite live region added together with its text is often not announced.
- A static alert that is part of the page from the start takes no role, so it does not interrupt the user on every page load.

## Form Semantics

- Alerts are feedback surfaces, not form controls.
- Use alerts to explain form state, not to replace field-level validation entirely.

## Accessibility Risks

- Adding `role='alert'` to static alerts, which interrupts screen reader users on page load.
- Using color alone to convey severity.
- Vague alert titles like "Warning" without meaningful content.
- Putting too many actions into a small feedback surface.
