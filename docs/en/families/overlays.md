# Overlays

Use this page when content opens above the current page and the main choice is about interruption level, anchor behavior, and panel shape.

## Quick Decision Rules

- Use [Tooltip](../components/tooltip/) for short non-interactive hints.
- Use [Popover](../components/popover/) for brief anchored non-modal content.
- Use [Menu](../components/menu/) for a list of actions or view options opened from a button.
- Use [ContextMenu](../components/context-menu/) for the same kind of list opened by a right click or a long touch, as a shortcut to actions that are also on a button.
- Use [Dialog](../components/dialog/) for focused modal tasks.
- Use [Drawer](../components/drawer/) for side-panel workflows that preserve page context.
- Use [Sheet](../components/sheet/) for touch-friendly or bottom-sheet panel behavior.

## By Interaction Strength

- Hint only: [Tooltip](../components/tooltip/)
- Lightweight contextual content: [Popover](../components/popover/)
- List of commands behind a button: [Menu](../components/menu/)
- Shortcut to commands at the pointer: [ContextMenu](../components/context-menu/)
- Strong modal interruption: [Dialog](../components/dialog/)
- Context-preserving side workflow: [Drawer](../components/drawer/)
- Mobile-first sliding panel: [Sheet](../components/sheet/)

## Common Misclassifications

- Do not use [Popover](../components/popover/) for modal or destructive workflows.
- Do not use [Menu](../components/menu/) for content with fields or other controls, or to pick a form value.
- Do not use [ContextMenu](../components/context-menu/) as the only way to an action: a right click is not discoverable, so keep the action on a button or a [Menu](../components/menu/) too.
- Do not use [Dialog](../components/dialog/) when the content really behaves like a side panel or bottom sheet.
- Do not use [Tooltip](../components/tooltip/) for interactive content.
- Do not use [Drawer](../components/drawer/) when the task should feel centered and bounded.
- Do not use [Sheet](../components/sheet/) if snap points or sliding panel behavior are not part of the UX.

## Start Here

- Row, edit or account actions: [Menu](../components/menu/)
- The same actions on a right click or a long touch: [ContextMenu](../components/context-menu/)
- Quick contextual content: [Popover](../components/popover/)
- Confirmations and focused forms: [Dialog](../components/dialog/)
- Filters, inspectors, member panels: [Drawer](../components/drawer/)
- Checkout or mobile action panels: [Sheet](../components/sheet/)
- Supplemental hints: [Tooltip](../components/tooltip/)
