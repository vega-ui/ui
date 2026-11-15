---
"@vega-ui/react": major
---

`Tooltip` runs on a `@vega-ui/core` widget, with the same markup and look.

- `group` says which tooltips warm each other up, so the next one opens without `delayOpen`: all tooltips share one group by default, and `createTooltipGroup()` makes a separate one, like for the tooltips of one toolbar. `TooltipGroup` is its type
- The user's handlers on `TooltipTrigger` and `TooltipContent` run before the tooltip's own: `event.preventDefault()` in `onKeyDown` keeps the tooltip open on `Escape`
- `useTooltipContext()` returns the widget `handle` instead of `open`, `changeOpen`, `show`, `showNow`, `hide`, `hideAfterDelay` and `cancelHide`; `useSnapshot(handle, (state) => state.open)` reads the open state
