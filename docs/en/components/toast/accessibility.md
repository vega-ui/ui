# Toast Accessibility

## Labeling

- Name `ToastRegion` with `aria-label`, like "Notifications". It is a `region` landmark, and a screen reader lists it by that name; the components never set a label themselves. When you add a hotkey, name it there too, like "Notifications, F8".
- Name each `Toast` with `aria-labelledby` pointing at its title, made with `useId()` in the template.
- Name an icon-only `ToastClose`, like a `Button` with `square` and a cross, with `aria-label`, like "Dismiss".
- Keep the text of an action specific, like "Undo" or "Try again", rather than "OK" or "Click here".

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Escape</kbd> | With the focus in a toast: closes that toast, and only that toast, so a dialog around the toasts stays open. The focus moves into the next toast, or back to where it was before the toasts once the last one closes. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On a `ToastClose`: runs your `onClick`, like an Undo, and closes the toast unless the handler calls `preventDefault()`. It is a native `<button>`, or your own with `asChild`. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus through the buttons of the toasts like through any buttons. The toasts come last in the Tab order of the page, or of a modal dialog they are shown over. While the focus is in the toasts, the deck is expanded and the timers are paused. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- A new toast never takes the focus: the user is not interrupted, and a screen reader announces it through the live region instead.
- The region renders at the end of `<body>`, or at the end of the topmost modal dialog while one is open, so its buttons come last in the Tab order. Over a modal dialog the toasts stay focusable while the page behind the dialog is inert.
- No hotkey that moves the focus to the toasts is built in; add one of your own with the [hotkey recipe](./patterns.md#a-hotkey-to-the-newest-toast).
- While the focus is inside the toasts, the deck is expanded and the timers are paused.
- When the focused toast closes, the focus moves into the next toast, to its first focusable element. When the last one closes, the focus goes back to the element that had it before the focus entered the toasts.

## Screen Reader Semantics

- `ToastRegion` is a named `region` with `aria-live="polite"` and `aria-relevant="additions text"`. It is in the document before the first toast, so the screen reader reads the first toast as well as the next ones.
- `Toast` is a `status` with `aria-atomic="true"`, read in full and politely, after what the screen reader is saying. Pass `role="alert"` for an urgent toast, like an error, read at once.
- The older toasts behind the front one in the collapsed deck stay in the accessibility tree, with their buttons; their content is only faded out.
- The toasts that wait beyond `limit` are not rendered and are announced when they are shown.

## Accessibility Risks

- An action that is only in a toast: a toast can time out, be swiped away or be missed, and a user who needs more time than the timeout cannot reach it ([WCAG 2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable)). Keep every action reachable in the page too.
- A short timeout on a long text or an error: the timers pause while the user is on the toasts, but a screen reader user who does not move to them hears the text once. Give errors no timeout.
- Too many toasts, or `role="alert"` on news that can wait: every alert interrupts the screen reader.
- Text the user must copy, like a code: the toasts are `user-select: none`.
- A toast that moves the focus into itself: it takes the user away from their work; let the user move to the toasts with Tab or a hotkey instead.
