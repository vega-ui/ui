# Sheet API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `snapPoints` | ``Array<`${number}px` \| number>`` | — | No | The heights the sheet rests at, like the detents of a native sheet: a fraction of the viewport height (`0.5`) or a pixel height (`'200px'`). The sheet fits its content unless `SheetContent` has a CSS height, and a snap point above its height rests at its top. Without snap points the sheet rests fully open. |
| `activeSnapPoint` | `number` | — | No | The currently active snap point (controlled), as an index into `snapPoints`. |
| `defaultSnapPoint` | `number` | — | No | The snap point the sheet opens at when uncontrolled, as an index into `snapPoints`. Defaults to the lowest one. |
| `onChangeActiveSnapPoint` | `(activeSnapPoint: number) => void` | — | No | Callback fired when the user moves the sheet to another snap point. |
| `steppedSnapPoints` | `boolean` | `false` | No | Moves at most one snap point per drag, however far or fast the drag is. |
| `defaultOpen` | `boolean` | `false` | No | Controls whether the sheet is initially open (uncontrolled). |
| `open` | `boolean` | — | No | Controls whether the sheet is currently open (controlled). |
| `onChangeOpen` | `(value: boolean) => void` | — | No | Callback fired when the open state changes. |
| `children` | `ReactNode \| ReactNode[]` | — | No | The content rendered inside the sheet. Can include any layout or form elements. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

## `SheetTrigger`

Open action for the sheet. Sets `aria-haspopup="dialog"`.

<!-- AUTO-GENERATED:PART_API:SheetTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | If true, renders the trigger as a custom element using a Slot. Allows flexible composition with custom elements like `<a>`, `<div>`, or icon buttons. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying trigger element. Useful for focus management or external control. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:SheetTrigger:end -->

## `SheetContent`

The native modal `<dialog>`.

<!-- AUTO-GENERATED:PART_API:SheetContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDialogElement>` | — | No | Ref forwarded to the native `<dialog>` element. Useful for focus management, measurement, or animation hooks. |
| `shadowed` | `boolean` | — | No | Applies a visual shadow to the sheet panel. Adds depth and separation from the background. |
| `blurred` | `boolean` | `false` | No | Blurs the page behind the sheet. |
| `overlay` | `boolean` | `true` | No | Dims the page behind the sheet. When false, the page stays visible and the sheet stays modal. |
| `closedBy` | `ModalDialogClosedBy` | `'any'` | No | Which user actions close the sheet, like the native `closedby` attribute: `any` a backdrop click, a swipe down or `Escape`, `closerequest` only `Escape`, `none` neither. |
| `container` | `Element \| DocumentFragment \| null` | `document.body` | No | The element the sheet is rendered into through a portal. |

Also accepts all `<dialog>` attributes.
<!-- AUTO-GENERATED:PART_API:SheetContent:end -->

- It sets no `id` or `aria-labelledby` itself: name it with `aria-labelledby` pointing to your heading's `id`, or with `aria-label`. `onCancel` and `onClose` run after the internal handlers. `ref` points to the `<dialog>` element.
- `blurred` (default `false`) blurs the page behind the sheet.
- `overlay` (default `true`) dims the page; `false` makes the `::backdrop` transparent while the sheet stays modal.
- `shadowed` adds the surface shadow.
- Has horizontal padding (`clamp(var(--spacing-12), 3vw, var(--spacing-16))`) and bottom padding (`var(--spacing-12)` plus the safe-area inset). A scrollable region inside is an element with `overflow: auto`.
- Closes on submit of a `<form method="dialog">` inside it, also with `closedBy='none'`. The close goes through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`.
- `closedBy` sets which user actions close the sheet, like the native `closedby` attribute: `'any'` (a backdrop click, a swipe down, or `Escape`, the default), `'closerequest'` (`Escape` only), or `'none'`. Use `closedBy='none'` for a sheet that must not be dismissed.
- A drag follows the finger, resists past the top and bottom snap points, and settles at the snap point its momentum would carry it to, so a flick can skip a snap point. With `closedBy='any'`, a drag down past the lowest snap point closes the sheet.
- Stays mounted only while open and while the close transition plays.

## `SheetHandle`

The grip at the top of the sheet. It is always a `<button>` with no name of its own, so pass `aria-label`, for example `Resize sheet`. When the sheet has several snap points it moves the sheet to the next snap point, and back to the lowest one from the top. Otherwise it is `disabled` and `aria-hidden`.

<!-- AUTO-GENERATED:PART_API:SheetHandle:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the handle `<button>`. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:SheetHandle:end -->

## `SheetClose`

Closes the sheet when clicked. It has no styles, icon, or default `aria-label`: render your own button inside it with `asChild` and label it.

<!-- AUTO-GENERATED:PART_API:SheetClose:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | If true, renders the close action as its child element using `Slot`, so any button of your own closes the sheet. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying button. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:SheetClose:end -->

- The close goes through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep the sheet open.
- Use it for a standalone close button, such as the X in a header. For buttons that answer the sheet (Cancel, Confirm, a `returnValue`), use a `<form method="dialog">`. It sets `type="button"`, with `asChild` too, so it also works inside a form of your own without submitting it; pass `type="submit"` to your own button to submit instead.

<!-- example: sheet/minimal-composition.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Order summary</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Order summary</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>2 × Flat white, 1 × Almond croissant · $13.40</Text>
        <form method='dialog' style={{ display: 'grid', marginBlockStart: 'var(--spacing-6)' }}>
          <Button type='submit' value='pay'>Pay $13.40</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Types

- `SheetProps`
- `SheetContentProps`
- `SheetCloseProps`
- `SheetTriggerProps`
- `SheetHandleProps`

## State Model

- Open state can be controlled with `open` or uncontrolled with `defaultOpen`.
- Every close request (backdrop click, `Escape`, swipe, `SheetClose` click, `<form method="dialog">` submit) goes through `onChangeOpen(false)`; a controlled sheet stays open until `open` becomes `false`. A close the browser makes without asking, such as `close()` called on the element or a forced close after repeated `Escape`, is final: it stays closed until `open` changes.
- Page scroll is locked with CSS while the sheet is open (`html:has(dialog:modal) { overflow: hidden }`), as for `Dialog` and `Drawer`.
- Snap points affect the visible interaction model, not just layout.
- The sheet fits its content up to the viewport height. Set a CSS height on `SheetContent` (`style={{ height: '80dvh' }}` or a class) to make it a fixed height. Snap points are fractions of the viewport height or pixel heights, and one above the sheet's height rests at its top, so with short content the sheet stays content-sized. Without `snapPoints` the sheet rests fully open.
- `defaultSnapPoint`, `activeSnapPoint`, and the `onChangeActiveSnapPoint` value are indexes into `snapPoints` in the order you pass them, whatever the visual order.
- The sheet opens at the lowest snap point unless `defaultSnapPoint` says otherwise, and an uncontrolled sheet reopens there.
- `onChangeActiveSnapPoint` fires only when the user moves the sheet to another snap point.
- `steppedSnapPoints` moves the sheet one snap point at most per drag and resists a drag past it.
- A flick carries the sheet past snap points further than it carries it to closing: a light flick down from the lowest snap point keeps it open, and a flick from a higher one settles at a snap point.
- `closedBy='none'` on `SheetContent` should be reserved for flows with a clear completion path.
- `useSheetContext` is available for advanced wrappers and controls. It returns `{ open, changeOpen, contentRef, height, viewport, offsets, activeSnapPoint, changeActiveSnapPoint, steppedSnapPoints }` and no longer exposes `contentId`, floating-ui `context`, `triggerProps`, `contentProps`, `transitionStatus`, or `isMounted`.
