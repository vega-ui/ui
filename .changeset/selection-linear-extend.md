---
'@vega-ui/core': patch
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**Extending a large multiple selection.** Shift + arrows, Shift + Home / End and a drag in a `Listbox` with `multiple` or a multiple `Grid` took time that grew with the square of the selected options: Shift + Mod + Home with 10 000 options selected took about 6 s. The `selection` fragment now looks selected keys up in a set, so the same step takes a few milliseconds.
