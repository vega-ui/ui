---
"@vega-ui/utils": patch
---

`BiMap` handles `undefined` keys and values: `deleteByKey` and `deleteByValue` remove such entries instead of returning `false`, and `set` no longer leaves a stale entry behind when the previous key or value was `undefined`.
