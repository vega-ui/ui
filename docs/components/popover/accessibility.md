# Popover Accessibility

## Labeling

The trigger should still be understandable without the popover content. The floating content should add context, not replace the meaning of the trigger.

## Keyboard Behavior

- The trigger opens the popover from the keyboard; it must be a button.
- `Escape` and an outside click close it, and focus returns to the trigger.
- Opening does not move focus into the content; `Tab` from the trigger enters it. Safari does not move focus from the trigger into the content on `Tab`, so test keyboard access there.
- Tab order inside richer popover content should stay logical.

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
