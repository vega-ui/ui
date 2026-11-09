---
"@vega-ui/react": major
---

BREAKING: `CollapsibleContent` animates its height on toggle and keeps `height: auto` while open, so it no longer sets the `--content-height` variable, and `useCollapsibleContext` no longer has `onTransitionEnd`. Set the duration with `--transition-state-delay` or `animation-duration` on the content.
