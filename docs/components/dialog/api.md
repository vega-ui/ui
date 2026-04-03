# Dialog API

## Root API

`Dialog` is the root state container for modal behavior.


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `open` | `boolean` | `—` | No | the modal is currently open. |
| `defaultOpen` | `boolean` | `false` | No | the modal is default open. |
| `onOpenChange` | `(state: boolean) => void` | `—` | No | Callback fired when the modal's open state changes. |
| `children` | `ReactNode \\| ReactNode[]` | `—` | No | content rendered inside the dialog. |
| `fluid` | `boolean` | `—` | No | Makes the dialog fluid, allowing it to stretch responsively within its container. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `DialogTrigger`

Open action for the dialog.

- Typical usage: `asChild` with `Button`
- Should remain inside `Dialog`

## `DialogPortal`

Optional [portal](../../glossary.md#portal) wrapper.

- Recommended for normal overlay rendering

## `DialogBackdrop`

Backdrop surface behind the content.

- Usually wraps `DialogContent`

## `DialogContent`

Primary dialog container.

- Supports layout and scroll behavior
- Main destination for dialog body content

## `DialogHeader`

Header layout wrapper.

- Typical children: `DialogTitle`, `DialogCloseButton`

## `DialogTitle`

Title content for orientation and accessibility.

## `DialogCloseButton`

Explicit close action inside the dialog content.

## Hooks

## `useDialogContext`

Advanced hook for custom wrappers and close actions.

Use it only when the exported parts are not enough for the desired composition.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `DialogProps` | Root prop type | Open-state API lives here. |
| `DialogTriggerProps` | Trigger part prop type | Trigger composition contract. |
| `DialogContentProps` | Content part prop type | Content container props. |

## State Model

- Open state can be controlled with `open` or uncontrolled with `defaultOpen`.
- `DialogTrigger` is the normal open path for uncontrolled usage.
- Dismissal and focus restoration are coordinated by the root.

## Integration Notes

- Use `DialogTitle` in normal product flows for orientation and accessibility.
- Retest nested overlays in real composition, not only in isolation.
- Keep long content scrollable so dismissal and actions stay usable.
