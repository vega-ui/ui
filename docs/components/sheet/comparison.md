# Sheet Comparison

## Quick Decision Rule

Choose `Sheet` when the UX should feel like a touch-friendly or bottom-sheet interaction rather than a side drawer or centered modal.

## `Sheet` vs `Dialog`

Use `Sheet` when:

- the presentation should feel sliding and touch-friendly
- content should emerge from the screen edge rather than appear as a centered modal

Use `Dialog` when:

- a centered modal is more appropriate

## `Sheet` vs `Drawer`

Use `Sheet` when:

- bottom-sheet interaction or snap points matter

Use `Drawer` when:

- the panel should read as side-mounted

## Choose This Component When

- snap points matter
- mobile-like panel behavior is intended
- gesture and bottom-entry metaphors are part of the UX

## Do Not Choose This Component When

- the task is just a normal confirm modal
- side-panel semantics fit better
