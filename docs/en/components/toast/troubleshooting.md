# Toast Troubleshooting

## No Toast Appears

### Symptom

`add()` runs, but nothing is shown.

### Likely Cause

No `ToastRegion` shows that queue: it is not rendered, it is rendered with another queue, or the queue is made inside a component, so `add()` and the region use two different queues.

### How To Verify

- Check that `queue.toasts` grows after `add()`.
- Check that the page has a `section[role="region"]` with your `aria-label` at the end of `<body>`.

### Fix

- Make the queue once at the top level of a module, import it where you add toasts and where you render the region, and render one `ToastRegion` for it near the root of the app.

## The Toast Does Not Close By Itself

### Symptom

A toast stays on the screen.

### Likely Cause

It has no `timeout`: the queue has no default, and such a toast stays until it is closed. Or its timer is paused: the pointer is on the toasts, the focus is inside them, the window has no focus or the tab is hidden. A page in an iframe without the focus, like a preview, keeps its toasts.

### How To Verify

- Check the `timeout` passed to `add()`, or the `timeout` of the toast in `queue.toasts`.
- Move the pointer away from the toasts, move the focus out of them, and click into the page.

### Fix

- Pass `{ timeout }` to `add()` for toasts that should close by themselves; leave it out for errors.
- Nothing to fix for a paused timer: it runs on with the time it had left when the user is back.

## The Toast Is Behind A Dialog Or Cannot Be Pressed

### Symptom

A toast shown while a modal dialog is open is behind it, or a click on it does nothing.

### Likely Cause

The dialog is not a modal `<dialog>` in the top layer, like a dialog of another library made of a `<div>` with a high `z-index`, so the region does not move into it. Or the page behind a modal is inert and the region did not follow, like after the dialog element was moved by your code.

### How To Verify

- Check that the dialog is a `<dialog>` opened with `showModal()`: it matches `:modal`.
- Check that the `section[role="region"]` of the toasts is inside that `<dialog>` while it is open.

### Fix

- Use [Dialog](../dialog/), [Drawer](../drawer/) or [Sheet](../sheet/), or any `<dialog>` opened with `showModal()`.

## The Focus Goes To The Page After The Last Toast

### Symptom

After the last toast closes from the keyboard, the focus is on `<body>`.

### Likely Cause

The element that had the focus before the toasts is gone, like a row that was removed, or was disabled by the action.

### How To Verify

- Check whether the element focused before you moved into the toasts is still in the document and enabled.

### Fix

- Keep the control that starts the action in place, like a toolbar button that archives the open item, or move the focus yourself in the action of the `ToastClose` when its target is gone.

## The Deck Jumps Or The Toasts Overlap

### Symptom

The toasts overlap in the expanded list, or jump while they enter.

### Likely Cause

The template is not a single `Toast` at its root, or your styles set `translate`, `scale`, `transition` or `max-block-size` on it, which the stack uses to place and size the toasts.

### How To Verify

- Inspect the region: each child should be a `Toast` element with `data-index` and the `--toast-*` variables.
- Look for your own `translate`, `scale`, `transition` or `max-block-size` on the toasts.

### Fix

- Keep `Toast` the root of the template, put your layout inside it, and change the spacing with `--toast-gap` and `--toast-peek` on the region.
