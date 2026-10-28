---
"@vega-ui/react": patch
---

`Spinner` has `role="progressbar"` without a value, like a native `<progress>` without `value`, so screen readers announce it as a busy indicator. Name it with `aria-label` or `aria-labelledby`; set `aria-hidden` when it only decorates something that already announces the loading state.
