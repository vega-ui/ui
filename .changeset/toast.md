---
'@vega-ui/react': minor
'@vega-ui/widgets': minor
'@vega-ui/core': minor
'@vega-ui/theme-core': minor
'@vega-ui/tokens-core': minor
---

New `Toast`, `ToastRegion` and `ToastClose`, with `createToastQueue` and `useToastContext`.

- `createToastQueue<Content>()` makes a queue you keep in a module of your own, with no provider: `add(content, { timeout })` shows a toast from anywhere, React or not, and returns its key, `close(key)` closes it. A toast without `timeout` stays until it is closed.
- `ToastRegion` shows the toasts of a queue as a named `role="region"` live region in the top layer, mounted before the first toast so the screen reader reads every one. It renders its children once per toast as a template that reads the toast with `useToastContext()`, shows the `limit` newest toasts (3 by default) and keeps the older ones waiting. `placement` puts them at the top or the bottom edge, at the start, centered or at the end (`top-end` by default), always centered on a narrow screen. Over an open modal `<dialog>`, `Dialog`, `Drawer` and `Sheet` included, the region moves into the dialog, so the toasts stay above it and the user can still press them.
- The timers pause while the pointer or the focus is on the toasts, while the window has no focus and while the tab is hidden, and run on with the time they had left.
- The toasts stack as a deck that expands while the pointer or the focus is on it. A swipe in one of the `swipeDirections` (by default toward the edge the toasts sit at and the nearer side edge, which follows a right-to-left page) closes a toast once it goes far or fast enough, and resists and springs back the other way; Escape closes the focused toast, and the focus moves to the next one, or back to where it was before the toasts once the last one closes.
- `Toast` is one toast, `role="status"` by default; pass `role="alert"` for an urgent one and name it with `aria-labelledby`. `ToastClose` closes its toast after your `onClick`, unless it calls `preventDefault`, and takes your own button with `asChild`, like an Undo that also dismisses.
- The styles move with springs and fall back to a fade with reduced motion. `--toast-inset`, `--toast-gap`, `--toast-peek`, `--toast-br-ratio`, `--toast-radius` and `--toast-shadow` on the region tune the look. The state is in `data-expanded` on the region and `data-index`, `data-front`, `data-status`, `data-swiping`, `data-swipe-direction` with `--toast-index`, `--toast-offset`, `--toast-height`, `--toast-front-height`, `--toast-swipe-x`, `--toast-swipe-y` and `--toast-release-duration` on each toast.
- `@vega-ui/widgets/toast` is the framework-free queue and widget behind them.
- `@vega-ui/core` adds `act.restoreFocus()`, which focuses again the element that had the focus before it entered the widget, `act.pauseTimer(name)` and `act.resumeTimer(name)`, which keep the time a timer has left, `act.awaitAnimationsAt(key)`, which answers `browser.animationEnd` with the `key` once the animations of an item have finished, `browser.inactive` and `browser.active` when the window loses or regains the focus or the tab is hidden or shown, and `stayOnTop(container, popover)`, which keeps a popover above the other top layer elements and moves its container into the topmost modal dialog and back.

`@vega-ui/tokens-core` adds `--black-shadow-strong`, a dark shadow with a sharp edge, and the dark theme gives it to `--surface-shadow`, so menus, popovers, dialogs and toasts stand out from the page and from a surface of the same color under them; the light theme keeps its shadow.
