---
"@vega-ui/react": major
---

`PageControl` runs on a `@vega-ui/core` widget:

- The arrows follow the text direction, so they are mirrored in right-to-left, where the items are laid out from right to left. Before, → always moved to the next index, which is the item on the left in right-to-left.
- Home and End activate the first and the last item.
- The arrows skip a gap in the `index` values and a disabled item. Before, they stopped at a missing index and activated a disabled item they could not focus.
- A press activates an item on pointer down instead of on click.
- The user's handlers run before the control's, and `event.preventDefault()` in `onKeyDown` stops the keyboard navigation.
- `usePageControlContext()` no longer returns `itemRef`.
