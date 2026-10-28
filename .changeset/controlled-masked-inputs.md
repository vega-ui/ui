---
"@vega-ui/react": patch
---

Masked inputs work as controlled inputs: `DateFieldInput`, `DateTimeFieldInput`, `DateRangeFieldInput`, `NumberFieldInput` and `PhoneFieldInput` with `value` and `onChange` no longer lose keystrokes, and their fields follow a `value` changed outside. The increment and decrement buttons of `NumberField` also follow changes of `min` and `max`.
