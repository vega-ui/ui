---
'@vega-ui/react': patch
---

`data-status` on `PopoverContent` tells whether the popover is shown. Before, it followed `open`, so a controlled popover the browser closed by an outside click or `Escape` kept `data-status="open"` while hidden, and styles keyed on `data-status="close"` did not apply.
