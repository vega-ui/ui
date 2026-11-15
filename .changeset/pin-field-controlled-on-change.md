---
'@vega-ui/react': patch
---

`onChange` of `PinFieldInput` fires on every edit of a controlled `PinField`. Before, the input took each new controlled value as its default value, and React stopped calling `onChange` for it.
