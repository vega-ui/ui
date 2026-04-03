# Drawer Comparison

## Quick Decision Rule

Choose `Drawer` when the task should stay closely connected to the current page context while still using an overlay.

## `Drawer` vs `Dialog`

Use `Drawer` when:

- the task feels like a side panel
- the user benefits from keeping page context visible

Use `Dialog` when:

- the flow should feel more modal and bounded

## `Drawer` vs `Sheet`

Use `Drawer` when:

- the panel should feel edge-mounted rather than bottom-sheet based
- desktop or wide-layout context should remain visible beside the panel

Use `Sheet` when:

- the UX is touch-first or sheet-like

## `Drawer` vs `Popover`

Use `Drawer` when:

- the content is too large or task-heavy for a floating popover

Use `Popover` when:

- the content is brief and contextual

## Choose This Component When

- a side panel fits the task
- preserving page context matters
- the content is bigger than a popover but less modal than a dialog
- the panel should read like workspace chrome rather than a transient menu

## Do Not Choose This Component When

- the flow is a short confirm modal
- the content is small and contextual
- the layout would become a cramped pseudo-page
