---
'@vega-ui/core': patch
'@vega-ui/widgets': patch
---

`command<Payload>()(name)` declares the payload a command carries: `createInput` refuses another one, and `input.is(command)` types the payload for the step, so `input.to` of `SELECT_COUNTRY` is a `PhoneCountry` without a cast. `SELECT_COUNTRY`, `SNAP_TO`, `SNAP_INDEX` and the `PICK_VALUE` of `date-field`, `date-time-field` and `date-range-field`, now each typed by its own value, carry their payload types.
