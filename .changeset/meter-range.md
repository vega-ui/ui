---
"@vega-ui/react": patch
---

`MeterTrack` fills relative to `min` and `max` like the native `<meter>`, and the fill is clamped to the range. Previously `min` was ignored and values outside the range overflowed. The `max` JSDoc now states the actual default of `1`.
