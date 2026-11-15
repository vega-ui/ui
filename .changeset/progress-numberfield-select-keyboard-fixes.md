---
"@vega-ui/react": patch
---

- `Progress`: the fill starts at `min` instead of zero, so `min={50} max={150} value={100}` fills half of the track. New CSS variable `--progress-min`
- `MeterStack`: segments are measured against `max - min`, and the `max` description now says its default is 1. New CSS variable `--meter-stack-min`
- `YearPicker` scroller and the years view of `Calendar`: Ctrl+Home and Ctrl+End go to the first and last year of the visible page
- `NumberFieldInput` has `role="spinbutton"` and `aria-valuenow`; `aria-valuemin` and `aria-valuemax` appear only when `min` and `max` are set. Queries by `role="textbox"` in your tests now need `spinbutton`
- `NumberField`: PageUp and PageDown change the value by ten steps; Home and End go to `min` and `max` when they are set and stay native otherwise
- `PageControl`: ArrowRight on the last item moves to the first one and ArrowLeft on the first item moves to the last one, as in the WAI-ARIA tabs pattern
