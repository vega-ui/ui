# Toast Anatomy

## Overview

`Toast` is split into a queue, a region and a template. The queue is a plain object outside React that holds the toasts, newest first. `ToastRegion` subscribes to the queue, shows its toasts in the top layer, and renders its children once per toast; the children are the template, a component of yours with `Toast` at its root that reads the toast with `useToastContext()`. `ToastClose` closes the toast it is in. There is no provider: the queue is what connects the code that adds a toast with the region that shows it.

## Required Parts

### `createToastQueue()`

Makes a queue of toasts with content of your type: `createToastQueue<Notice>()`. `add(content, { timeout })` puts a toast at the front and returns its key, `close(key)` closes it, `toasts` lists them newest first, and `subscribe(listener)` reports every change. It has no React in it, so a store, a request handler or a test adds toasts too. Make it once in a module; two queues are two independent stacks.

### `ToastRegion`

Renders `<section role="region" aria-live="polite" aria-relevant="additions text" popover="manual">` into a container of its own at the end of `<body>`, shown in the top layer from the start. It takes the `queue`, the `limit` of toasts shown at once, the `swipeDirections` that close a toast, all HTML attributes and a `ref`. Name it with `aria-label`. Its children are rendered once per shown toast, each with the context of its toast; render nothing else inside it. Over an open modal dialog it moves its container into that dialog, and back when the dialog closes.

### `Toast`

Renders `<div role="status" aria-atomic="true">` for one toast, with the timer, the swipe and the exit of that toast. It must be the root of the template. Pass `role="alert"` for an urgent toast, and name it with `aria-labelledby` pointing at your title. It takes all `<div>` attributes and a `ref`.

## Optional Parts

### `ToastClose`

Renders a `<button type="button">` that closes its toast after your `onClick`, unless it calls `event.preventDefault()`. It has no styles of its own: with `asChild` it renders your own button, like a `Button` with "Undo", which runs its action and dismisses the toast, or a `Button` with `square` and an icon, named with `aria-label`.

### `useToastContext()`

Reads the toast in the template: `content`, the value passed to `add()`, typed with `useToastContext<Notice>()`; `key`, the key `add()` returned; `index`, the place in the stack, 0 for the newest; and `close()`, which closes the toast like a `ToastClose`.

## Composition Order

1. The queue, in a module outside any component
2. `ToastRegion`, once, with the queue and `aria-label`
3. The template component as its only child
4. `Toast` at the root of the template
5. The content of the toast and its `ToastClose` buttons inside `Toast`

## Valid Composition Patterns

The queue lives in its own module and the region is rendered once; the template is one component that reads the content of each toast and decides its role, its name, its icon and its actions. The action of a notice is a `ToastClose` with `asChild` around a `Button`, so it runs and dismisses the toast in one press, and the dismiss button is a `Button` with `square` and an icon, named by a prop.

See the recipe in [Your Own Component](./index.md#your-own-component).

## Invalid Composition Patterns

### A queue made in a component

`createToastQueue()` inside a component makes a new, empty queue on every render, and the toasts added to the old one are lost. Make the queue once at the top level of a module.

### Several regions for one queue

Each `ToastRegion` shows every toast of its queue: two regions for one queue show each toast twice and announce it twice. Render one region per queue.

### `Toast` outside the template

`Toast` reads its toast from the region. A `Toast` rendered anywhere else has no toast to show and no timer; add the toast to the queue instead.

### Something other than `Toast` at the root of the template

The region places, stacks and swipes the `Toast` elements it finds as its children. A wrapper around `Toast`, or text next to it, breaks the stack: keep `Toast` the root element of the template.

### A toast without a name

A `role="alert"` or `role="status"` without `aria-labelledby` has no name when the user reaches it with the focus or a screen reader. The components never set a label themselves: point `aria-labelledby` at the title.
