# Tooltip Accessibility

## Labeling

Tooltip content should supplement a control, not replace its label. The trigger should already be understandable before the tooltip opens.

## Keyboard Behavior

- Keyboard users should be able to reach the same information as pointer users.
- Tooltip timing should not hide required information.

## Focus Behavior

- Opening a tooltip should not destabilize focus.
- Tooltips inside overlays should still be tested in the real stack.

## Screen Reader Semantics

- The trigger should already be meaningful.
- Tooltip content should remain supplemental.

## Form Semantics

- Tooltips are useful for optional field help, not for required validation instructions.
- If the surrounding form depends on the content, it should be visible outside the tooltip.

## Accessibility Risks

- Making the tooltip the only accessible name of a control.
- Placing required instructions only inside the tooltip.
- Putting interactive flows into tooltip content.
