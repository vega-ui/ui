# Popover Accessibility

## Labeling

The trigger should still be understandable without the popover content. The floating content should add context, not replace the meaning of the trigger.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger: opens or closes the popover. The focus stays on the trigger. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | From the trigger of an open popover, `Tab` moves the focus into its content, which follows the trigger in the tab order. Leaving the content with the focus does not close the popover. |
| <kbd>Escape</kbd> | Closes the popover. If the focus was inside, it returns to the trigger. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

The trigger must be a button. Safari does not move focus from the trigger into the content on `Tab`, so test keyboard access there.

## Focus Behavior

- Focus should move predictably between trigger and content.
- Nested popovers stack: opening a nested popover keeps its parent open.
- Nested popovers should be tested as a real integration case.

## Screen Reader Semantics

- Content should remain contextual and concise.
- The trigger should not depend on popover content as its only meaning.

## Form Semantics

- If a popover contains a tiny form, labels and submit actions still belong inside the popover content itself.
- Popovers are a poor fit for long validation-heavy forms.

## Accessibility Risks

- Using the popover as the only source of critical instructions.
- Hiding modal-like tasks in a non-modal popover.
- Nested popovers without retesting focus order.
