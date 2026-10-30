---
"@vega-ui/utils": minor
---

Add helpers for native overlays and gestures:

- `togglePopover(element, force)` shows or hides a `popover` element and does nothing when the Popover API is not supported.
- `rubberBand(overshoot, dimension, constant)` returns how far an element follows a drag past its limit, with iOS-like resistance.
- `projectMomentum(velocity, decelerationRate)` returns how far a flick travels before it stops.
- `findScrollableAncestor(element, boundary)` returns the closest vertically scrollable element up to a boundary.
- `createWarmUp(duration)` creates a shared window that lets the next element skip its delay, and `tooltipWarmUp` is the one tooltips share.
- `isBackdropPoint(dialog, { target, clientX, clientY })` tells whether a press on a modal `<dialog>` landed on its `::backdrop`.
- `isTextInteraction(target)` tells whether a press is meant for text: it lands in a form field or editable content, or text is selected.
- `resolveLength(length, total)` resolves a fraction of `total` or a pixel length to pixels, never more than `total`.
