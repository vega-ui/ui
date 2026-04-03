# Dialog Accessibility

## Labeling

`Dialog` should present a clear title so users understand the modal context immediately.

Recommended pattern:

- `DialogTitle` inside `DialogHeader`

## Keyboard Behavior

- the trigger should open the dialog from the keyboard
- focus should move into the dialog when it opens
- `Escape` should close the active dialog
- nested dialogs should close in reverse order

## Focus Behavior

- focus should enter the dialog when it opens
- closing should restore focus to a sensible trigger
- nested dialog stacks should preserve predictable focus restoration

## Screen Reader Semantics

- the dialog should have a clear title
- the body content should make sense as one modal unit
- close controls should remain explicit when dismissal matters

## Form Semantics

When the dialog contains fields, treat it as a normal form boundary and retest keyboard submit, close, and focus-return behavior in the real flow.

## Accessibility Risks

- opening a dialog without a meaningful title
- using nested dialogs without retesting focus restoration
- putting long content into a dialog without a usable scroll strategy
- relying only on click-away dismissal for important flows
