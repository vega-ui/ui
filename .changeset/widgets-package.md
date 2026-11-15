---
"@vega-ui/widgets": minor
---

New package `@vega-ui/widgets` holds the widgets that `@vega-ui/react` components run on: the state, steps and output of each component on `@vega-ui/core`, with no dependency on React or the DOM, so an adapter for another framework can reuse them and a test can run them in node.

- One entry point per widget and no root import: `@vega-ui/widgets/select`, `@vega-ui/widgets/date-range-field`, and the shared widgets `grid`, `listbox`, `dates` (the day, month and year pickers), `modal-dialog` and `snap-scroller`. An entry point exports everything an adapter needs to drive its widget, like the `PICK_VALUE` command of a date field; the helpers the widgets share, like the masks and the drag, are not an entry point
- The package is `0.x`: the shape of a widget can change in a minor release
