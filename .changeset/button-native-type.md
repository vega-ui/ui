---
"@vega-ui/react": major
---

`Button` no longer defaults to `type="button"`. Like a native `<button>`, it submits the surrounding form unless `type="button"` is set, and with `asChild` it no longer passes `type` to the child element. Internal buttons of `NumberField`, `PasswordField`, `Pagination`, `Calendar`, date fields and the dialog and drawer close buttons keep `type="button"`
