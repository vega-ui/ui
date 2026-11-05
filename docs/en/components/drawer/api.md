# Drawer API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `defaultOpen` | `boolean` | `false` | No | Controls whether the drawer is default open. |
| `open` | `boolean` | — | No | Controls whether the drawer is open. When provided, the component becomes controlled. |
| `onChangeOpen` | `(value: boolean) => void` | — | No | Callback fired when the drawer's open state changes. Receives the new state as a boolean. |
| `position` | `DrawerPosition` | `'end'` | No | Defines from which side of the screen the drawer appears. `start` and `end` follow the writing direction, like CSS logical properties: in right-to-left text `end` is the left side. |
| `children` | `ReactNode` | — | No | The content to display inside the drawer. Typically, includes navigation, settings, or forms. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

## `DrawerTrigger`

Open action for the drawer. Sets `aria-haspopup="dialog"` and `aria-expanded`.

<!-- AUTO-GENERATED:PART_API:DrawerTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | If true, renders the trigger as a child element using `Slot`. This enables custom wrappers (e.g., `<a>`, `<div>`) to inherit drawer-opening behavior. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native button or slotted element. Useful for focus management or integrations. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:DrawerTrigger:end -->

## `DrawerContent`

The native modal `<dialog>`, positioned by the root `position`.

<!-- AUTO-GENERATED:PART_API:DrawerContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDialogElement>` | — | No | Ref forwarded to the native `<dialog>` element. Useful for measuring, focusing, or animation hooks. |
| `shadowed` | `boolean` | — | No | Adds a shadow to the drawer panel for depth and separation. |
| `blurred` | `boolean` | `true` | No | Blurs the page behind the drawer. |
| `overlay` | `boolean` | `true` | No | Dims the page behind the drawer. When false, the page stays visible and the drawer stays modal. |
| `closedBy` | `ModalDialogClosedBy` | `'any'` | No | Which user actions close the drawer, like the native `closedby` attribute: `any` a backdrop click, a touch swipe toward its edge or `Escape`, `closerequest` only `Escape`, `none` neither. |
| `fullWidth` | `boolean` | — | No | Makes the drawer stretch to fill the full width of its parent container. |
| `fullHeight` | `boolean` | — | No | Makes the drawer stretch to fill the full height of its parent container. |

Also accepts all `<dialog>` attributes.
<!-- AUTO-GENERATED:PART_API:DrawerContent:end -->

- It sets no `id` or `aria-labelledby` itself: name it with `aria-labelledby` pointing to your heading's `id`, or with `aria-label`. `onCancel` and `onClose` run after the internal handlers. `ref` points to the `<dialog>` element.
- `blurred` (default `true`) blurs the page behind the drawer.
- `overlay` (default `true`) dims the page; `false` makes the `::backdrop` transparent while the drawer stays modal.
- `shadowed` adds the surface shadow; `fullWidth` and `fullHeight` stretch the panel.
- `closedBy` sets which user actions close the drawer, like the native `closedby` attribute: `'any'` (a backdrop click, a touch swipe toward its edge, or `Escape`, the default), `'closerequest'` (`Escape` only), or `'none'`.
- Closes on submit of a `<form method="dialog">` inside it, also with `closedBy='none'`. The close goes through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`.
- With `closedBy='any'`, a touch swipe toward the drawer's edge drags it and closes it past half its size or on a flick. Mouse drags are left for text selection.
- Stays mounted only while open and while the close transition plays.

## `DrawerClose`

Closes the drawer when clicked. It has no styles, icon, or default `aria-label`: render your own button inside it with `asChild` and label it.

<!-- AUTO-GENERATED:PART_API:DrawerClose:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | If true, renders the close action as its child element using `Slot`, so any button of your own closes the drawer. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the underlying button. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:DrawerClose:end -->

- The close goes through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep the drawer open.
- Use it for a standalone close button, such as the X in a header. For buttons that answer the drawer (Cancel, Confirm, a `returnValue`), use a `<form method="dialog">`. Without `asChild` it renders `type="button"`, so it also works inside a form of your own without submitting it; with `asChild` give your own button `type="button"`.

<!-- example: drawer/minimal-composition.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Keyboard shortcuts</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={titleId} style={{ width: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Keyboard shortcuts</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
          Press ⌘K to search, C to create a task and ? to open this panel again.
        </Text>
      </DrawerContent>
    </Drawer>
  );
}
```
<!-- /example -->

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
