---
'@vega-ui/core': patch
'@vega-ui/react': patch
---

Every option key gets its own element id. Before, keys like `a.b` and `a_b` got the same id, so `aria-activedescendant` in `Listbox`, `Select` and `Combobox` could point a screen reader to the wrong option, and keys with `'`, `(`, `)`, `!`, `~` or `*` produced ids with those characters.
