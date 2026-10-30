# Sheet API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `snapPoints` | `Array<`${number}px` \\| number>` | `—` | No | heights the sheet rests at, like the detents of a native sheet: a fraction of the viewport height (`0.5`) or a pixel height (`'200px'`). |
| `activeSnapPoint` | `number` | `—` | No | currently active snap point (controlled), as an index into `snapPoints`. |
| `defaultSnapPoint` | `number` | `—` | No | snap point the sheet opens at when uncontrolled, as an index into `snapPoints`. |
| `onChangeActiveSnapPoint` | `(activeSnapPoint: number) => void` | `—` | No | Callback fired when the user moves the sheet to another snap point. |
| `steppedSnapPoints` | `boolean` | `false` | No | Moves at most one snap point per drag, however far or fast the drag is. |
| `defaultOpen` | `boolean` | `false` | No | Controls whether the sheet is initially open (uncontrolled). |
| `open` | `boolean` | `—` | No | Controls whether the sheet is currently open (controlled). |
| `onChangeOpen` | `(value: boolean) => void` | `—` | No | Callback fired when the open state changes. |
| `children` | `ReactNode \\| ReactNode[]` | `—` | No | content rendered inside the sheet. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

## `SheetTrigger`

Open action for the sheet. Sets `aria-haspopup="dialog"` and `aria-expanded`.

## `SheetContent`

The native modal `<dialog>`.

- Accepts `<dialog>` attributes. It sets no `id` or `aria-labelledby` itself: name it with `aria-labelledby` pointing to your heading's `id`, or with `aria-label`. `onCancel` and `onClose` run after the internal handlers. `ref` points to the `<dialog>` element.
- `blurred` (default `true`) blurs the page behind the sheet.
- `overlay` (default `true`) dims the page; `false` makes the `::backdrop` transparent while the sheet stays modal.
- `shadowed` adds the surface shadow.
- Has horizontal padding (`clamp(var(--spacing-12), 3vw, var(--spacing-16))`) and bottom padding (`var(--spacing-12)` plus the safe-area inset). A scrollable region inside is an element with `overflow: auto`.
- Closes on submit of a `<form method="dialog">` inside it, also with `closedBy='none'`. The close goes through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`.
- `closedBy` sets which user actions close the sheet, like the native `closedby` attribute: `'any'` (a backdrop click, a swipe down, or `Escape`, the default), `'closerequest'` (`Escape` only), or `'none'`. Use `closedBy='none'` for a sheet that must not be dismissed.
- A drag follows the finger, resists past the top and bottom snap points, and settles at the snap point its momentum would carry it to, so a flick can skip a snap point. With `closedBy='any'`, a drag down past the lowest snap point closes the sheet.
- Stays mounted only while open and while the close transition plays.

## `SheetHandle`

The grip at the top of the sheet. It is always a `<button>` with no name of its own, so pass `aria-label`, for example `Resize sheet`. When the sheet has several snap points it moves the sheet to the next snap point, and back to the lowest one from the top. Otherwise it is `disabled` and `aria-hidden`.

## `SheetClose`

Closes the sheet when clicked. It has no styles, icon, or default `aria-label`: render your own button inside it with `asChild` and label it.

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child element through `Slot` instead of a `<button type="button">`. |
| `ref` | `Ref<HTMLButtonElement>` | `—` | Forwarded to the button. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | `—` | Runs after the internal handler that calls `onChangeOpen(false)`. |

- Accepts all `<button>` attributes.
- The close goes through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep the sheet open.
- Use it for a standalone close button, such as the X in a header. For buttons that answer the sheet (Cancel, Confirm, a `returnValue`), use a `<form method="dialog">`. It renders `type="button"`, so it also works inside a form of your own without submitting it.

```tsx
import type { CSSProperties } from 'react';

<SheetClose asChild>
  <IconButton
    aria-label='Close'
    variant='secondary'
    appearance='ghost'
    style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
  >
    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
  </IconButton>
</SheetClose>
```

## Types

- `SheetProps`
- `SheetContentProps`
- `SheetCloseProps`
- `SheetTriggerProps`
- `SheetHandleProps`

## State Model

- Open state can be controlled with `open` or uncontrolled with `defaultOpen`.
- Every close request (backdrop click, `Escape`, swipe, `SheetClose` click, `<form method="dialog">` submit) goes through `onChangeOpen(false)`; a controlled sheet stays open until `open` becomes `false`.
- Page scroll is locked with CSS while the sheet is open (`html:has(dialog:modal) { overflow: hidden }`), as for `Dialog` and `Drawer`.
- Snap points affect the visible interaction model, not just layout.
- The sheet fits its content up to the viewport height. Set a CSS height on `SheetContent` (`style={{ height: '80dvh' }}` or a class) to make it a fixed height. Snap points are fractions of the viewport height or pixel heights, and one above the sheet's height rests at its top, so with short content the sheet stays content-sized. Without `snapPoints` the sheet rests fully open.
- `defaultSnapPoint`, `activeSnapPoint`, and the `onChangeActiveSnapPoint` value are indexes into `snapPoints` in the order you pass them, whatever the visual order.
- The sheet opens at the lowest snap point unless `defaultSnapPoint` says otherwise, and an uncontrolled sheet reopens there.
- `onChangeActiveSnapPoint` fires only when the user moves the sheet to another snap point.
- `steppedSnapPoints` moves the sheet one snap point at most per drag.
- `closedBy='none'` on `SheetContent` should be reserved for flows with a clear completion path.
- `useSheetContext` is available for advanced wrappers and controls. It returns `{ open, changeOpen, contentRef, height, viewport, offsets, activeSnapPoint, changeActiveSnapPoint, steppedSnapPoints }` and no longer exposes `contentId`, floating-ui `context`, `triggerProps`, `contentProps`, `transitionStatus`, or `isMounted`.
