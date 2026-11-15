---
"@vega-ui/react": major
---

`Popover` runs on a `@vega-ui/core` widget, with the same markup and look.

- `PopoverClose` is a native `popovertarget` button with `popovertargetaction="hide"`: the child given with `asChild` must be a button, `event.preventDefault()` in its `onClick` keeps the popover open, and its close is made by the browser, so it is final like a light dismiss instead of waiting for a controlled parent
- The user's `onToggle` on `PopoverContent` runs before the popover's own handler
- The children of `PopoverContent` render once the browser shows the popover and stay until its closing animations end
- `usePopoverContext()` returns `handle` and `close()` instead of `open` and `changeOpen`; `close()` hides the popover unless a controlled parent keeps `open`
