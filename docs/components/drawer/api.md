# Drawer API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `defaultOpen` | `boolean` | `false` | No | Controls whether the drawer is default open. |
| `open` | `boolean` | `—` | No | Controls whether the drawer is open. |
| `onChangeOpen` | `(value: boolean) => void` | `—` | No | Callback fired when the drawer's open state changes. |
| `position` | `DrawerPosition` | `'end'` | No | Defines from which side of the screen the drawer appears. |
| `children` | `ReactNode` | `—` | No | content to display inside the drawer. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

## `DrawerTrigger`

Open action for the drawer. Sets `aria-haspopup="dialog"` and `aria-expanded`.

## `DrawerContent`

The native modal `<dialog>`, positioned by the root `position`.

- Accepts `<dialog>` attributes. It sets no `id` or `aria-labelledby` itself: name it with `aria-labelledby` pointing to your heading's `id`, or with `aria-label`. `onCancel` and `onClose` run after the internal handlers. `ref` points to the `<dialog>` element.
- `blurred` (default `true`) blurs the page behind the drawer.
- `overlay` (default `true`) dims the page; `false` makes the `::backdrop` transparent while the drawer stays modal.
- `shadowed` adds the surface shadow; `fullWidth` and `fullHeight` stretch the panel.
- `closedBy` sets which user actions close the drawer, like the native `closedby` attribute: `'any'` (a backdrop click, a touch swipe toward its edge, or `Escape`, the default), `'closerequest'` (`Escape` only), or `'none'`.
- Closes on submit of a `<form method="dialog">` inside it, also with `closedBy='none'`. The close goes through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`.
- With `closedBy='any'`, a touch swipe toward the drawer's edge drags it and closes it past half its size or on a flick. Mouse drags are left for text selection.
- Stays mounted only while open and while the close transition plays.

## `DrawerClose`

Closes the drawer when clicked. It has no styles, icon, or default `aria-label`: render your own button inside it with `asChild` and label it.

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child element through `Slot` instead of a `<button type="button">`. |
| `ref` | `Ref<HTMLButtonElement>` | `—` | Forwarded to the button. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | `—` | Runs after the internal handler that calls `onChangeOpen(false)`. |

- Accepts all `<button>` attributes.
- The close goes through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep the drawer open.
- Use it for a standalone close button, such as the X in a header. For buttons that answer the drawer (Cancel, Confirm, a `returnValue`), use a `<form method="dialog">`. It renders `type="button"`, so it also works inside a form of your own without submitting it.

```tsx
import type { CSSProperties } from 'react';

<DrawerClose asChild>
  <IconButton
    aria-label='Close'
    variant='secondary'
    appearance='ghost'
    style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
  >
    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
  </IconButton>
</DrawerClose>
```

## Hooks

## `useDrawerContext`

Returns `{ open, changeOpen, position }` for advanced wrappers and custom controls.

## Types

- `DrawerProps`
- `DrawerTriggerProps`
- `DrawerContentProps`
- `DrawerCloseProps`

## State Model

- Open state can be controlled with `open` or uncontrolled with `defaultOpen`.
- Every close request (backdrop click, swipe, `Escape`, `DrawerClose` click, `<form method="dialog">` submit) goes through `onChangeOpen(false)`; a controlled drawer stays open until `open` becomes `false`.
- `closedBy='none'` on `DrawerContent` disables backdrop click, swipe, and `Escape`; close it with a button in a `<form method="dialog">` or by changing `open`.
- `position` uses logical sides that follow the writing direction: `'top-start'`, `'top'`, `'top-end'`, `'end-start'`, `'end'`, `'end-end'`, `'bottom-start'`, `'bottom'`, `'bottom-end'`, `'start-start'`, `'start'`, `'start-end'`. In right-to-left text `end` is the left side.
- Page scroll is locked while the drawer is open.
- The drawer is always modal; `overlay={false}` only hides the dimming.
