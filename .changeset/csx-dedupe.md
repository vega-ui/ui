---
"@vega-ui/utils": patch
---

`csx` removes repeated class names inside multi-class arguments and extra whitespace: `csx('btn primary', 'btn')` returns `'btn primary'`
