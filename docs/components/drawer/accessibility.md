# Drawer Accessibility

## Labeling

Use `DrawerTitle` in normal product flows so users can orient quickly inside the panel. If the drawer owns a focused task, the title should describe that task directly.

## Keyboard Behavior

- The trigger should open the drawer from the keyboard.
- `Escape` should close the active drawer when the flow is dismissible.
- Nested drawers should close in reverse order.

## Focus Behavior

- Focus should move into the drawer on open.
- Focus should return sensibly to the original trigger or equivalent action on close.
- Nested drawer stacks need real integration testing instead of isolated assumptions.

## Screen Reader Semantics

- The drawer should expose a clear panel purpose.
- Long panels should still read as one coherent overlay task rather than a disconnected page fragment.

## Form Semantics

- Drawers often contain forms, but the form semantics belong to the controls inside the panel.
- Error states and required fields should remain visible even when the panel scrolls.

## Accessibility Risks

- Missing title on a task-oriented drawer.
- Long content with poor scroll affordance.
- Nested overlays without retesting focus restoration.
