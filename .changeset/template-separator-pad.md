---
"@vega-ui/react": patch
---

`DateField`, `DateTimeField`, `DateRangeField` and `TimeField` complete a one-digit segment with a leading zero when a separator follows it, typed, pasted or filled in by the browser: `1.2.2026` becomes `01.02.2026` and `9:30` becomes `09:30`, as in a native input. The separator used to be dropped, so the digits after it slid into the segment and the text turned into another date or time, like `12.13.26` or `23:0`.
