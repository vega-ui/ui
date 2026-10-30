# Dialog API

## Root API

`Dialog` is the root state container for modal behavior.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | `—` | No | the modal is currently open. |
| `defaultOpen` | `boolean` | `false` | No | the modal is default open. |
| `onChangeOpen` | `(state: boolean) => void` | `—` | No | Callback fired when the modal's open state changes. |
| `children` | `ReactNode \\| ReactNode[]` | `—` | No | content rendered inside the dialog. |
| `fluid` | `boolean` | `—` | No | Makes the dialog fluid, allowing it to stretch responsively within its container. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DialogTrigger`

Open action for the dialog.

- Typical usage: `asChild` with `Button`
- Should remain inside `Dialog`
- Sets `aria-haspopup='dialog'` and `aria-expanded`

## `DialogContent`

The native modal `<dialog>`.

- Accepts `<dialog>` attributes. It sets no `id` or `aria-labelledby` itself: name it with `aria-labelledby` pointing to your heading's `id`, or with `aria-label`. `onCancel` and `onClose` run after the internal handlers.
- `blurred` (default `true`) blurs the page behind the dialog; `overlay` (default `true`) dims it, and with `overlay={false}` the dialog stays modal over a transparent backdrop; `shadowed` (default `true`) adds the surface shadow.
- `closedBy` sets which user actions close the dialog, like the native `closedby` attribute: `'any'` (a backdrop click or `Escape`), `'closerequest'` (`Escape` only, the default), or `'none'`. A backdrop click does not close the dialog unless `closedBy='any'`.
- Closes on submit of a `<form method="dialog">` inside it, also with `closedBy='none'`. The close goes through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep it open; the submit button's `value` becomes the dialog's `returnValue`.
- Stays mounted only while open and while the close transition plays.

## `DialogClose`

Closes the dialog when clicked. It has no styles, icon, or default `aria-label`: render your own button inside it with `asChild` and label it.

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child element through `Slot` instead of a `<button type="button">`. |
| `ref` | `Ref<HTMLButtonElement>` | `—` | Forwarded to the button. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | `—` | Runs after the internal handler that calls `onChangeOpen(false)`. |

- Accepts all `<button>` attributes.
- The close goes through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep the dialog open.
- Use it for a standalone close button, such as the X in a header. For buttons that answer the dialog (Cancel, Confirm, a `returnValue`), use a `<form method="dialog">`. It renders `type="button"`, so it also works inside a form of your own without submitting it.

```tsx
import type { CSSProperties } from 'react';

<DialogClose asChild>
  <IconButton
    aria-label='Close'
    variant='secondary'
    appearance='ghost'
    style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
  >
    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
  </IconButton>
</DialogClose>
```

## Hooks

## `useDialogContext`

Advanced hook for custom wrappers and close actions. Returns `{ open, changeOpen, fluid }`.

Use it only when the exported parts are not enough for the desired composition.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `DialogProps` | Root prop type | Open-state API lives here. |
| `DialogTriggerProps` | Trigger part prop type | Trigger composition contract. |
| `DialogContentProps` | Content part prop type | Content container props. |
| `DialogCloseProps` | Close part prop type | `<button>` attributes plus `asChild`. |

## State Model

- Open state can be controlled with `open` or uncontrolled with `defaultOpen`.
- `DialogTrigger` is the normal open path for uncontrolled usage.
- Every close request allowed by `closedBy` (backdrop click, `Escape`) every `DialogClose` click, and every `<form method="dialog">` submit go through `onChangeOpen(false)`; a controlled dialog stays open until `open` becomes `false`.
- When the browser closes the dialog on its own while `open` is still `true`, the dialog reopens.

## Integration Notes

- Name every dialog with `aria-labelledby` or `aria-label` on `DialogContent`.
- To close from inside, use `DialogClose` for a standalone close button, buttons in a `<form method="dialog">` for actions that answer the dialog, or a controlled `open` and a button that calls `setOpen(false)`.
- Retest nested overlays in real composition, not only in isolation.
- Keep long content scrollable so dismissal and actions stay usable.
