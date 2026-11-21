# Toast API

## Root API

The toasts start at the queue and `ToastRegion`, which you render once; `Toast` is the root of the template the region renders for each toast.

### `ToastRegion`

<!-- AUTO-GENERATED:PART_API:ToastRegion:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `queue` | `ToastQueue<Content>` | — | Yes | The queue the region shows, made once with `createToastQueue()`. |
| `limit` | `number` | `3` | No | How many of the newest toasts are shown at once; the older ones wait until a shown one closes. |
| `placement` | `ToastPlacement` | `'top-end'` | No | Where the toasts appear: `top-start`, `top`, `top-end`, `bottom-start`, `bottom` or `bottom-end`. On a screen up to 40rem wide they are always centered. |
| `swipeDirections` | `readonly SwipeDirection[]` | `up, or down at the bottom, and toward the nearer side edge, the end edge when centered` | No | The directions a swipe closes a toast in. A swipe the other way resists and springs back. |
| `children` | `ReactNode` | — | Yes | The template of one toast: rendered once per shown toast, which reads its content with `useToastContext()`. |
| `ref` | `Ref<HTMLElement>` | — | No | Ref forwarded to the region element. |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:ToastRegion:end -->

- A `<section role="region" aria-live="polite" aria-relevant="additions text" popover="manual">`, rendered into a container of its own at the end of `<body>` and shown in the top layer before the first toast. Name it with `aria-label`.
- Over an open modal `<dialog>` it moves its container into the topmost one, and back when the dialog closes, so the toasts stay above the dialog and take the pointer and the focus.
- `data-expanded` is `true` while the pointer or the focus is on the toasts.
- `limit` and `swipeDirections` can change at any time; a lower `limit` sends the older shown toasts back to wait.

### `Toast`

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the toast element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

- A `<div role="status" aria-atomic="true">`; pass `role="alert"` for an urgent toast.
- It must be the root of the template, and it reads its toast from the region: a `Toast` rendered outside a `ToastRegion` shows nothing useful.

## Child Parts API

### `ToastClose`

<!-- AUTO-GENERATED:PART_API:ToastClose:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | If true, renders the close action as its child element using `Slot`, so any button of your own closes the toast, like an action that also dismisses it. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying button. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:ToastClose:end -->

- A `<button type="button">` with no styles of its own; with `asChild` it renders its only child, which gets the `onClick` and `type="button"`.
- Your `onClick` runs first; the toast closes after it unless it calls `event.preventDefault()`.

## Queue

### `createToastQueue<Content>()`

Returns a `ToastQueue<Content>`, a plain object with no React in it. Make it once, at the top level of a module.

| Member | Type | Description |
| --- | --- | --- |
| `add` | `(content: Content, options?: ToastOptions) => string` | Puts a toast at the front of the queue and returns its key. |
| `close` | `(key: string) => void` | Closes the toast with the key; does nothing for a key that is not in the queue. |
| `toasts` | `readonly QueuedToast<Content>[]` | The toasts in the queue, newest first, the waiting ones included. |
| `subscribe` | `(listener: () => void) => () => void` | Calls the listener after every `add` and `close`; returns the function that unsubscribes it. |

`ToastOptions` has one option, `timeout`: the time in milliseconds the toast stays shown before it closes by itself. Without it, the toast stays until it is closed.

## Hooks

### `useToastContext<Content>()`

Reads the toast the template is rendered for. Call it inside the children of `ToastRegion`.

| Field | Type | Description |
| --- | --- | --- |
| `content` | `Content` | The content passed to `add()`. |
| `key` | `string` | The key `add()` returned. |
| `index` | `number` | The place of the toast in the stack, 0 for the newest. |
| `close` | `() => void` | Closes the toast, like a `ToastClose`. |

## Types

- `ToastProps`, `ToastRegionProps<Content>` and `ToastCloseProps`: the props of the parts
- `ToastQueue<Content>`: the queue `createToastQueue()` returns
- `ToastOptions`: `{ timeout?: number }`, the options of `add()`
- `QueuedToast<Content>`: `{ key, content, timeout }`, a toast in `queue.toasts`
- `ToastContextState<Content>`: what `useToastContext()` returns
- `SwipeDirection`: `'up' | 'down' | 'left' | 'right'`

## State Model

- The queue holds the toasts, newest first; `add()` and `close()` change it, from React or from anywhere else.
- The region shows the `limit` newest toasts of the queue. The older ones wait with their timers paused, and appear as shown toasts close.
- The timer of a toast starts when it is shown, pauses while the pointer or the focus is on the toasts, while the window has no focus and while the tab is hidden, and runs on with the time it had left.
- A toast closes when its time runs out, on Escape while the focus is in it, on a swipe in one of `swipeDirections`, on a `ToastClose`, on `close()` from `useToastContext()` and on `queue.close(key)`. It plays its exit and then leaves the queue and the document.
- `data-expanded` marks the region while the deck is expanded; `data-index`, `data-front`, `data-status`, `data-swiping` and `data-swipe-direction` mark each toast, with the CSS variables in [Styling](./styling.md).

## Integration Notes

- The queue is not tied to React: an API client, a store or a service worker message handler can call `add()`. Keep the content serializable when you can, and put callbacks, like the action of an Undo, into it only when they make sense for as long as the toast is shown.
- The region renders into a container of its own, not into the React tree around it, so CSS of a parent does not reach the toasts: style them through the template and the region.
- `ToastRegion` renders nothing on the server and mounts its region after hydration.
- `@vega-ui/widgets/toast` exports `createToastQueue` and `toastRegionWidget`, the framework-free queue and behavior of the region.
