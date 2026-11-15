---
"@vega-ui/icons": patch
"@vega-ui/react": patch
---

- Flags: every rendered flag gets its own ids for masks, gradients and filters. Before, two copies of one flag shared ids, so a copy inside a hidden list made the visible one lose its gradients and filters in Chromium and Firefox
- `Badge` no longer declares the unused `--badge-padding-inline`
- `FieldsetLegend` and `FieldsetHeader` JSDoc: put the legend first in `Fieldset`, not inside `FieldsetHeader`, so it names the group
- JSDoc for `Progress.indeterminate`, `SliderTrack.ref`, `SliderRange.ref` and `Slot.children`
