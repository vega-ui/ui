---
"@vega-ui/hooks": minor
---

Add hooks for gestures and the on-screen keyboard:

- `useDragGesture(element, { axis, shouldStart, onStart, onMove, onEnd })` tracks a one-axis pointer drag: it waits for a small movement along the axis, lets `shouldStart` decline it, captures the pointer, blocks native scrolling while dragging, reports the offset and the velocity, ends on `pointercancel`, and swallows the click that ends a drag.
- `useKeyboardInset()` returns how many pixels at the bottom of the window an on-screen keyboard covers.

`useScrollSnap` reports a snap change even when the scroll ends before the snap points are first measured, so a calendar opened and scrolled on a busy page no longer misses the new month.
