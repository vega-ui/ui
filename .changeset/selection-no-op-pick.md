---
'@vega-ui/core': patch
'@vega-ui/react': patch
---

Picking what is already selected no longer calls `onChangeValue`, like a native `<select>`. Before, `Listbox`, `Select` and `Combobox` reported the same value again when an already selected option was pressed in single or range mode, or when Mod+A was pressed with every option already selected.
