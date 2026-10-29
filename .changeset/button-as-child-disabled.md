---
"@vega-ui/react": patch
---

`ButtonBase` (and `Button`, `IconButton` and other buttons built on it) no longer sets the native `disabled` attribute on the child element with `asChild`. The child owns its disabled state: a disabled link is an `<a>` without `href`, with `aria-disabled="true"` for the disabled styling and announcement.
