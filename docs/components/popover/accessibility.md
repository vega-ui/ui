# Popover Accessibility

## Labeling

The trigger should still be understandable without the popover content. The floating content should add context, not replace the meaning of the trigger.

## Keyboard Behavior

- The trigger should open the popover from the keyboard.
- `Escape` should close it.
- Tab order inside richer popover content should stay logical.

## Focus Behavior

- Focus should move predictably between trigger and content.
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
