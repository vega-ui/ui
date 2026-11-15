---
"@vega-ui/react": major
---

- `Switch` moves its thumb by the writing direction: in a right-to-left page the thumb of a checked switch stays inside the track at its left end instead of sliding out of it
- **Breaking:** the `--switch-indicator-transform` custom property of `Switch` is replaced by `--switch-indicator-offset`, the distance of the thumb from the inline start of the track
