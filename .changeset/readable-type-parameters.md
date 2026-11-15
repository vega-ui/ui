---
'@vega-ui/core': patch
'@vega-ui/widgets': patch
'@vega-ui/react': patch
'@vega-ui/hooks': patch
'@vega-ui/utils': patch
---

**Readable type parameters.** Generic types and functions name their type parameters in words (`Key`, `State`, `Value`, `SelectionMode`, `Multiple`) instead of single letters, so editor hints and the API tables read as `CalendarValue<SelectionMode>` instead of `CalendarValue<S>`. Nothing else changes.
