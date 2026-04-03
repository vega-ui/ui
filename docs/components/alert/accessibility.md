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

## Form Semantics

- Alerts are feedback surfaces, not form controls.
- Use alerts to explain form state, not to replace field-level validation entirely.

## Accessibility Risks

- Using color alone to convey severity.
- Vague alert titles like "Warning" without meaningful content.
- Putting too many actions into a small feedback surface.
