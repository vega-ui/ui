# Tooltip Accessibility

## Labeling

Tooltip content should supplement a control, not replace its label. The trigger should already be understandable before the tooltip opens.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moving the focus to the trigger from the keyboard shows the tooltip after `delayOpen`, or at once right after another tooltip closed; moving it away hides the tooltip. |
| <kbd>Escape</kbd> | Hides the open tooltip. The focus stays on the trigger. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

A tap never shows the tooltip, so touch users do not see it; keep anything they need visible elsewhere.

## Focus Behavior

- Opening a tooltip should not destabilize focus.
- Tooltips inside overlays should still be tested in the real stack.

## Screen Reader Semantics

- The trigger should already be meaningful.
- While the tooltip is open, the trigger points to its `role="tooltip"` content through `aria-describedby`.
- Tooltip content should remain supplemental.

## Form Semantics

- Tooltips are useful for optional field help, not for required validation instructions.
- If the surrounding form depends on the content, it should be visible outside the tooltip.

## Accessibility Risks

- Making the tooltip the only accessible name of a control.
- Placing required instructions only inside the tooltip.
- Putting interactive flows into tooltip content.
