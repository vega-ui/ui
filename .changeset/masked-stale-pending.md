---
'@vega-ui/react': patch
---

A date or time field forgets a picked value its controlling parent turned down once the focus leaves. Before, if the parent later set the same value itself, the field dispatched `input` and `change` as if the user had picked it and marked itself as edited by the user, so `:user-invalid` styles could show up.
