# Overlays

Use this page when content opens above the current page and the main choice is about interruption level, anchor behavior, and panel shape.

## Quick Decision Rules

- Use [Tooltip](../components/tooltip/) for short non-interactive hints.
- Use [Popover](../components/popover/) for brief anchored non-modal content.
- Use [Dialog](../components/dialog/) for focused modal tasks.
- Use [Drawer](../components/drawer/) for side-panel workflows that preserve page context.
- Use [Sheet](../components/sheet/) for touch-friendly or bottom-sheet panel behavior.

## By Interaction Strength

- Hint only: [Tooltip](../components/tooltip/)
- Lightweight contextual content: [Popover](../components/popover/)
- Strong modal interruption: [Dialog](../components/dialog/)
- Context-preserving side workflow: [Drawer](../components/drawer/)
- Mobile-first sliding panel: [Sheet](../components/sheet/)

## Common Misclassifications

- Do not use [Popover](../components/popover/) for modal or destructive workflows.
- Do not use [Dialog](../components/dialog/) when the content really behaves like a side panel or bottom sheet.
- Do not use [Tooltip](../components/tooltip/) for interactive content.
- Do not use [Drawer](../components/drawer/) when the task should feel centered and bounded.
- Do not use [Sheet](../components/sheet/) if snap points or sliding panel behavior are not part of the UX.

## Start Here

- Quick contextual actions: [Popover](../components/popover/)
- Confirmations and focused forms: [Dialog](../components/dialog/)
- Filters, inspectors, member panels: [Drawer](../components/drawer/)
- Checkout or mobile action panels: [Sheet](../components/sheet/)
- Supplemental hints: [Tooltip](../components/tooltip/)
