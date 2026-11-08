# Dialog API

## Root API

`Dialog` is the root state container for modal behavior.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | — | No | Whether the modal is currently open. When provided, the modal becomes a controlled component. |
| `defaultOpen` | `boolean` | `false` | No | Whether the modal is default open. |
| `onChangeOpen` | `(state: boolean) => void` | — | No | Callback fired when the modal's open state changes. Receives the next boolean state. |
| `children` | `ReactNode \| ReactNode[]` | — | No | The content rendered inside the dialog. Can include headings, text, actions, and nested components. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DialogTrigger`

Open action for the dialog.

<!-- AUTO-GENERATED:PART_API:DialogTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | If true, renders the trigger as a child element using `Slot`. Allows for custom wrapper elements (e.g., `<a>`, `<div>`) to behave as modal triggers. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying trigger element (typically a `<button>`). Useful for focus control or imperative access. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:DialogTrigger:end -->

- Typical usage: `asChild` with `Button`
- Should remain inside `Dialog`
- Sets `aria-haspopup='dialog'`

## `DialogContent`

The native modal `<dialog>`.

<!-- AUTO-GENERATED:PART_API:DialogContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `shadowed` | `boolean` | `true` | No | Applies a visual shadow to the dialog panel. Adds depth and separation from the background. |
| `blurred` | `boolean` | `true` | No | Blurs the page behind the dialog. |
| `overlay` | `boolean` | `true` | No | Dims the page behind the dialog. When false, the page stays visible and the dialog stays modal. |
| `closedBy` | `ModalDialogClosedBy` | `'closerequest'` | No | Which user actions close the dialog, like the native `closedby` attribute: `any` a backdrop click or `Escape`, `closerequest` only `Escape`, `none` neither. |
| `container` | `Element \| DocumentFragment \| null` | `document.body` | No | The element the dialog is rendered into through a portal. |
| `ref` | `Ref<HTMLDialogElement>` | — | No | Ref forwarded to the native `<dialog>` element. Useful for managing focus, animations, or measurements. |
| `children` | `ReactNode` | — | No | The children nodes to render inside the dialog. |

Also accepts all `<dialog>` attributes.
<!-- AUTO-GENERATED:PART_API:DialogContent:end -->

- It sets no `id` or `aria-labelledby` itself: name it with `aria-labelledby` pointing to your heading's `id`, or with `aria-label`. `onCancel` and `onClose` run after the internal handlers.
- `blurred` (default `true`) blurs the page behind the dialog; `overlay` (default `true`) dims it, and with `overlay={false}` the dialog stays modal over a transparent backdrop; `shadowed` (default `true`) adds the surface shadow.
- `closedBy` sets which user actions close the dialog, like the native `closedby` attribute: `'any'` (a backdrop click or `Escape`), `'closerequest'` (`Escape` only, the default), or `'none'`. A backdrop click does not close the dialog unless `closedBy='any'`.
- Closes on submit of a `<form method="dialog">` inside it, also with `closedBy='none'`. The close goes through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep it open; the submit button's `value` becomes the dialog's `returnValue`.
- Stays mounted only while open and while the close transition plays.

## `DialogClose`

Closes the dialog when clicked. It has no styles, icon, or default `aria-label`: render your own button inside it with `asChild` and label it.

<!-- AUTO-GENERATED:PART_API:DialogClose:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | No | If true, renders the close action as its child element using `Slot`, so any button of your own closes the dialog. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying button. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:DialogClose:end -->

- The close goes through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep the dialog open.
- Use it for a standalone close button, such as the X in a header. For buttons that answer the dialog (Cancel, Confirm, a `returnValue`), use a `<form method="dialog">`. It sets `type="button"`, with `asChild` too, so it also works inside a form of your own without submitting it; pass `type="submit"` to your own button to submit instead.
- Your `onClick` runs after the close request, so it can record which button closed the dialog.

<!-- example: dialog/close-with-handler.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function CloseWithHandler() {
  const titleId = useId();
  const [reminder, setReminder] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>What’s new in 3.0</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>What’s new in 3.0</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
            Overlays now use the native dialog and popover elements, and the sheet follows your finger without re-rendering.
          </Text>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
            <DialogClose asChild onClick={() => setReminder('We will remind you tomorrow.')}>
              <Button variant='secondary' appearance='ghost'>Remind me later</Button>
            </DialogClose>
            <DialogClose asChild onClick={() => setReminder('')}>
              <Button>Got it</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Text size={2} style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{reminder}</Text>
    </div>
  );
}
```
<!-- /example -->

## Hooks

## `useDialogContext`

Advanced hook for custom wrappers and close actions. Returns `{ open, changeOpen }`.

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
- Every close request allowed by `closedBy` (backdrop click, `Escape`) every `DialogClose` click, and every `<form method="dialog">` submit go through `onChangeOpen(false)`; a controlled dialog stays open until `open` becomes `false`. A close the browser makes without asking, such as `close()` called on the element or a forced close after repeated `Escape`, is final: it stays closed until `open` changes.
- When the browser closes the dialog on its own while `open` is still `true`, the dialog reopens.

## Integration Notes

- Name every dialog with `aria-labelledby` or `aria-label` on `DialogContent`.
- To close from inside, use `DialogClose` for a standalone close button, buttons in a `<form method="dialog">` for actions that answer the dialog, or a controlled `open` and a button that calls `setOpen(false)`.
- Retest nested overlays in real composition, not only in isolation.
- Keep long content scrollable so dismissal and actions stay usable.
