---
"@vega-ui/react": patch
---

A read-only field no longer changes from the keyboard, the wheel or its buttons, like a native `readonly` input: ArrowUp and ArrowDown do not step `TimeField`, `DateTimeField` and `NumberField`, the wheel does not step `NumberField` and its − / + buttons are disabled, and a country picked in `PhoneFieldSelect` for a read-only `PhoneFieldInput` changes only the country, not the number.
