# Toast Styling

## Overview

`ToastRegion` places the toasts: in the top-right corner, or centered at the top on a screen up to 40rem wide, 22rem wide and inset from the edges and the safe area. `Toast` is a compact card on the surface of the floating components, `--surface-secondary` like `Menu` and `Tooltip`, with `--toast-shadow`, with 8px of padding, 16px before the text and corners rounded around an `xs` button; the layout inside it is yours, like a flex row of a title, an action and a dismiss button. The toasts stack as a deck: the front toast in full, the older ones scaled down behind it with only their edges peeking out, until the pointer or the focus on the toasts expands them into a list. They move with springs, follow a swipe and fall back to a fade with reduced motion. `ToastClose` has no look of its own: render your own `Button` inside it with `asChild`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--toast-inset` | `ToastRegion` | Distance of the region from the edges of the viewport, at least the safe area; 16px by default. A toast that enters or leaves moves by it too. |
| `--toast-gap` | `ToastRegion`, `Toast` | Gap between the toasts of the expanded list; 8px by default. |
| `--toast-peek` | `ToastRegion`, `Toast` | How far each older toast peeks out below the front one in the collapsed deck; 12px by default. |
| `--toast-br-ratio` | `ToastRegion`, `Toast` | Roundness of the toasts, like `--button-br-ratio`; `--br-ratio` by default. |
| `--toast-radius` | `ToastRegion`, `Toast` | Corner radius of the toasts; by default rounded around an `xs` button and its 8px of padding with `--toast-br-ratio`. |
| `--toast-shadow` | `ToastRegion`, `Toast` | Shadow of the toasts; `--surface-shadow` with a closer shadow that tells the cards of the deck apart. |
| `--duration-spring` | `Toast` | Duration of the spring that moves, scales and resizes the toasts. |
| `--ease-spring` | `Toast` | The spring curve of that motion. |
| `--duration-exit` | `Toast` | Duration of the exit of a toast, and of the fade with reduced motion. |
| `--ease-exit` | `Toast` | The curve of the exit. |

## Part-Level Variables

The region sets these on each `Toast` while it is shown. Read them in your styles; do not set them.

| Variable | Purpose |
| --- | --- |
| `--toast-index` | The place of the toast in the stack, 0 for the newest. |
| `--toast-offset` | The sum of the heights of the newer toasts, in px: the position of the toast in the expanded list, without the gaps. |
| `--toast-height` | The height of the content of the toast, in px. |
| `--toast-front-height` | The height of the front toast, in px; the collapsed deck takes the height of the front toast. |
| `--toast-swipe-x` / `--toast-swipe-y` | How far the toast follows a swipe on its axis, in px, rubber-banded in a direction that does not close it. |
| `--toast-release-duration` | The duration of the throw after a swipe that closes the toast, from the speed of the finger. |

## State And Variant Interaction

- `data-expanded="true"` on the region while the pointer or the focus is on the toasts, `"false"` otherwise.
- `data-placement` on the region: `top-start`, `top`, `top-end`, `bottom-start`, `bottom` or `bottom-end`, from the `placement` prop. At the bottom the deck grows upward, toasts enter from below and a swipe down takes them off the screen.
- `data-index` on each toast, the same as `--toast-index`, and `data-front="true"` on the front toast while it is open.
- `data-status="open"` while the toast is shown, `"closing"` while it plays its exit.
- `data-swiping="true"` while a swipe drags the toast, and `data-swipe-direction` (`up`, `down`, `left` or `right`) once a swipe has closed it and throws it out.
- `[role='alert']` on the toasts you render as alerts, to give them a look of their own.
- `@media (prefers-reduced-motion: reduce)`: the parts replace the slide, the scale and the throw with a fade.

## Examples

Pass `className='notifications'` to `ToastRegion` for more room around and between the toasts, smaller corners, a tint on the toasts you render with `role='alert'`, and a grabbing cursor while a toast is dragged:

<!-- example: toast/styling-examples.css -->
```css
.notifications {
  --toast-inset: var(--spacing-12);
  --toast-gap: var(--spacing-6);
  --toast-peek: var(--spacing-8);
  --toast-radius: var(--radius-4);
}

.notifications > [role='alert'] {
  background: color-mix(in oklch, var(--color-error) 10%, var(--surface-primary));
}

.notifications > [data-swiping='true'] {
  cursor: grabbing;
}
```
<!-- /example -->

## Do Not Override

- Do not set `translate`, `scale`, `transition`, `max-block-size`, `overflow` or `clip-path` on `Toast`: they place the toast in the deck, expand it without its text spilling out, keep the shadow of a toast off its neighbors in the expanded list, follow the swipe and play the exit.
- Do not set `position`, `inset`, `display` or `pointer-events` on the region: it is a fixed grid that lets the clicks through between the toasts. Change `placement` or `--toast-inset` instead.
- Do not set `display: none` or `visibility: hidden` on a toast to hide it: close it, so its timer stops and the focus moves on.
- Do not set `user-select` back to `text` on the toasts: a mouse swipe would select their text in WebKit.
- Do not make the background of the toasts transparent without a backdrop: the toasts are above the page and the dialogs, and their text needs a surface to stay readable.
