---
"@vega-ui/react": patch
---

Backdrop, PopoverContent and SelectListbox use the `--z-index-overlay` / `--z-index-popover` tokens instead of a hardcoded `z-index: 1`, so popovers and listboxes open above dialogs, drawers and sheets. The backdrop fade now uses `--transition-state-delay`, matching the overlay unmount timing so the fade-out is no longer cut off.
