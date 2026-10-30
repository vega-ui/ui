---
"@vega-ui/hooks": minor
---

Add hooks for native overlays and gestures:

- `useModalDialog({ open, onChangeOpen, closedBy })` drives a native `<dialog>` as a modal from React state: it opens it with `showModal()`, keeps it mounted until its close transition ends, closes it through `onChangeOpen(false)` on a `<form method="dialog">` submit (spread the returned `onSubmit` on the dialog) so it animates out, and syncs other closes made by the browser. It returns `rendered`, which turns true once the dialog is shown: render the children only then, so the dialog itself takes focus on open and `autoFocus` on a child works. Like the native `closedby` attribute, `closedBy` (`ModalDialogClosedBy`) sets which user actions request a close: `any`, `closerequest` (the default), or `none`. Put the returned `escapeClosedBy` on the dialog's `closedby` attribute, so the browser never closes it on a repeated `Escape` when `closedBy` is `none`.
- `useDragGesture(element, { axis, shouldStart, onStart, onMove, onEnd })` tracks a one-axis pointer drag: it waits for a small movement along the axis, lets `shouldStart` decline it, captures the pointer, blocks native scrolling while dragging, reports the offset and the velocity, ends on `pointercancel`, and swallows the click that ends a drag.
- `useKeyboardInset()` returns how many pixels at the bottom of the window an on-screen keyboard covers.

`useScrollSnap` reports a snap change even when the scroll ends before the snap points are first measured, so a calendar opened and scrolled on a busy page no longer misses the new month.
