---
'@vega-ui/react': patch
---

`Select` hides its open list when it becomes `disabled` or `readOnly`, like a native `<select>`, and keeps following the browser while disabled. Before, the list stayed open, a close by the browser was ignored so `onChangeOpen(false)` never came, and the list opened again by itself once the select was enabled.
