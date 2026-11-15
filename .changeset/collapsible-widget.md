---
"@vega-ui/react": major
---

`Collapsible` and `Accordion` run on `@vega-ui/core` widgets, with the same markup and look.

- A `Collapsible` the parent opens through `open`, and an `Accordion` item the parent opens through `opened`, now show their content. Before, the content stayed hidden unless the trigger was pressed first. The content animates whether the parent or the trigger opens or closes it
- `onChangeOpen(true)` is called at the press, not one frame later
- BREAKING: `CollapsibleContent` animates its height only while it opens or closes and keeps `height: auto` while open, so content that grows after opening is no longer clipped. It no longer sets the `--content-height` variable. Set the duration with `--transition-state-delay` or `animation-duration` on the content
- The content is hidden once its closing animations finish, read from the browser, instead of on `transitionend`, so it also hides when no transition runs
- `CollapsibleTrigger` and `AccordionTrigger` take button attributes such as `disabled` in their types
- The trigger runs the user's `onClick` first, and `event.preventDefault()` in it keeps the section as it is. Before, the section toggled before the user's handler ran
- Two `Accordion` items with the same `value` both follow it: both open and close together, as their `aria-expanded` already said
- `useCollapsibleContext()` returns `{ handle }` and `useAccordionContext()` returns `{ handle, size }`, where `handle` is the widget handle; the old fields are gone. The accordion context was registered under the name of the alert context, which is fixed
