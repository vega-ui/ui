# Sheet Accessibility

## Labeling

Give the sheet a clear title or equivalent visible context. Non-closable sheets should explain why the user is in the flow and how to complete it.

## Keyboard Behavior

- The trigger should open the sheet from the keyboard.
- `Escape` should close closable sheets.
- Focus should remain predictable across snap-point changes.

## Focus Behavior

- Focus should move into the sheet on open.
- Focus should restore sensibly on close.

## Screen Reader Semantics

- The sheet should read as one coherent overlay surface.
- Non-closable sheets need especially clear purpose.

## Form Semantics

- If the sheet contains a form, required fields and error messaging should remain visible at every snap point.
- Gesture-friendly layout should not hide the real submit and dismissal semantics.

## Accessibility Risks

- Relying only on gesture understanding.
- Snap points that create unusable partially visible content.
- Non-closable flows without clear completion path.
