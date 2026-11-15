---
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**Removed active option and disabled selected cells.** When the active option of a `Listbox` or `Select` is removed or disabled, the next enabled option becomes active, or the previous one when it was the last, instead of no option, so the keyboard continues from the same place. A `Grid`, `DayPicker`, `MonthPicker` or `YearPicker` range from `resolveRange` leaves out the disabled cells, as the range across rendered cells already did. Like a native `select` that loses its selected option, neither calls `onChangeActive` or `onChangeValue`.
