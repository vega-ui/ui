---
"@vega-ui/react": major
---

`Dialog`, `Drawer` and `Sheet` run on one `@vega-ui/core` modal widget, with the same markup and look.

- The user's handlers run first: `event.preventDefault()` in `onClick` of the trigger or the close button, or in `onCancel` or `onSubmit` of the content, keeps the overlay as it is. Before, the overlay acted before the user's handler
- `useDialogContext()`, `useDrawerContext()` and `useSheetContext()` return the widget `handle` instead of `open` and `changeOpen`
- The swipe of `Drawer` and the drag, the snap points and the backdrop of `Sheet` run in the widget, with the same motion: the drag writes its frame without a render, `SheetHandle` sends a command, and `useSheetContext()` returns only `{ handle }`, so `changeHeight`, `height`, `viewport`, `offsets`, `activeSnapPoint`, `changeActiveSnapPoint` and `steppedSnapPoints` are gone; `useSnapshot(handle, (state) => state.activeSnapPoint)` reads the chosen snap point. The user's `onClick` of `SheetHandle` runs first, and `event.preventDefault()` in it keeps the snap point
