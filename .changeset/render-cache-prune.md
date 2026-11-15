---
'@vega-ui/core': patch
'@vega-ui/react': patch
---

A component no longer keeps what it rendered for items that left its collection. Before, a `Listbox`, `Select` or `Combobox` whose options kept changing, or a `Calendar` paged through many months, held on to every item it had ever rendered until it unmounted.
