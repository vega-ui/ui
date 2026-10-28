---
"@vega-ui/utils": patch
---

`mergeProps` keeps an event handler or `style` when a later props object passes `undefined` for it, so `<PopoverContent onKeyDown={props.onKeyDown}>` no longer drops the internal handler
