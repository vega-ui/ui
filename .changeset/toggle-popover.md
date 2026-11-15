---
"@vega-ui/utils": minor
---

Add helpers for gestures:

- `rubberBand(overshoot, dimension, constant)` returns how far an element follows a drag past its limit, with iOS-like resistance.
- `projectMomentum(velocity, decelerationRate)` returns how far a flick travels before it stops.
- `resolveLength(length, total)` resolves a fraction of `total` or a pixel length to pixels, never more than `total`.
