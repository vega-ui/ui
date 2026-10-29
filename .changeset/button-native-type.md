---
"@vega-ui/react": major
---

`Button` and `IconButton` no longer default to `type="button"`. Like a native `<button>`, they submit the surrounding form unless `type="button"` is set, and with `asChild` they no longer pass `type` to the child element. Internal buttons of `NumberField`, `PasswordField`, `Pagination`, `Calendar`, date fields and the dialog and drawer close buttons keep `type="button"`
