# Collapsible Accessibility

## Labeling

The trigger should clearly describe the content it controls. Avoid generic labels like "Details" when the hidden region has a task-specific purpose.

## Keyboard Behavior

- The trigger should be reachable in normal tab order.
- Trigger activation should toggle the content region.
- If `asChild` is used, the rendered child still needs to preserve interactive semantics.

## Focus Behavior

- Focus should remain on the trigger when the section opens or closes.
- Opening the section should not unexpectedly move focus into the content.
- Collapsible content inside overlays should still be tested in the real stack.

## Screen Reader Semantics

- `CollapsibleTrigger` should expose expanded state and point to the controlled region through `aria-controls`.
- The content region should have a stable ID.
- The visible trigger text should make sense even when the section is collapsed.

## Form Semantics

- If the content contains optional form controls, labels and errors belong to those controls rather than to the root.
- Hidden validation states should not become invisible without another outer signal.

## Accessibility Risks

- `asChild` rendering that drops button-like behavior.
- Trigger labels that are too vague to explain the hidden region.
- Important form errors hidden inside collapsed content without a visible summary.
