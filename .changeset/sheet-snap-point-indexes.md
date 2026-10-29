---
"@vega-ui/react": major
---

BREAKING: `Sheet` `activeSnapPoint` and the `onChangeActiveSnapPoint` value are now indexes into `snapPoints` in the order you pass them, like `defaultSnapPoint`. They used to point into the snap points sorted by position. `onChangeActiveSnapPoint` no longer fires on mount when `defaultSnapPoint` is set, and the sheet opens at `defaultSnapPoint` on the first frame.

With `steppedSnapPoints`, an edge swipe down no longer closes a `Sheet` with `closable={false}`, and a closing swipe no longer also moves to the next snap point.
