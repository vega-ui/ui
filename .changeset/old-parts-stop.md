---
"@vega-ui/utils": patch
"@vega-ui/react": patch
---

`NumberField` follows `<input type="number">`:
- stepping keeps the decimals of the value and of `step`: `0.7` + `0.1` gives `0.8` (before, the mask cut `0.7999999999999999` to `0.79`)
- the wheel steps the value only when the input is focused and under the pointer; over an unfocused field it no longer blocks the page scroll
- a root `onKeyDown` runs after the built-in arrow keys instead of replacing them

`@vega-ui/utils`:
- new `addWithPrecision(value, delta)`, a sum rounded to the decimals of its operands
- new `countDecimals(value)`, the decimals of a number, also in exponent notation (`1.5e-7` → 8)
- `snapToStep` keeps the precision of steps written in exponent notation (`step={1e-7}` no longer rounds to integers)
