---
'@vega-ui/core': patch
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**Shift + arrows after the parent changed the selection.** In a multiple `Grid` or `Listbox`, a Shift + arrow after the parent wrote a new value continued the previous extension and dropped the new value: with `[a, b]` extended by Shift + →, a parent value `['g', 'h']` and one more Shift + → gave `[a, b, c]`. The extension now continues only while the value is the one it produced, so the same keys give `[g, h, b, c]`.
