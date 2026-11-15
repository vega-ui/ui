---
'@vega-ui/react': major
---

The undocumented deep entry points `@vega-ui/react/Listbox/contexts`, `@vega-ui/react/SnapScroller/contexts` and `@vega-ui/react/TextField/contexts` are removed: code shared by several components no longer lives in one component's folder. `useListboxContext` and `useSnapScrollerContext` stay exported from `@vega-ui/react`.
