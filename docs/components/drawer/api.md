# Drawer API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `dismissible` | `boolean` | `true` | No | Allows the drawer to be closed by clicking outside or pressing Escape. |
| `defaultOpen` | `boolean` | `false` | No | Controls whether the drawer is default open. |
| `open` | `boolean` | `—` | No | Controls whether the drawer is open. |
| `onChangeOpen` | `(value: boolean) => void` | `—` | No | Callback fired when the drawer's open state changes. |
| `position` | `DrawerPosition` | `'right'` | No | Defines from which side of the screen the drawer appears. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref forwarded to the drawer's root DOM element. |
| `children` | `ReactNode` | `—` | No | content to display inside the drawer. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `DrawerTrigger`: open action for the drawer.
- `DrawerPortal`: optional overlay [portal](../../glossary.md#portal).
- `DrawerBackdrop`: backdrop layer behind the drawer.
- `DrawerContent`: edge-mounted content surface.
- `DrawerHeader`: header layout wrapper.
- `DrawerTitle`: title content for orientation.
- `DrawerCloseButton`: explicit close action.

## Types

- `DrawerProps`
- `DrawerTriggerProps`
- `DrawerPortalProps`
- `DrawerBackdropProps`
- `DrawerContentProps`
- `DrawerHeaderProps`
- `DrawerTitleProps`
- `DrawerCloseButtonProps`

## State Model

- Open state can be controlled or uncontrolled.
- Focus restoration and dismissal are coordinated by the root.
- The root decides whether the drawer behaves like a lightweight side panel or a stronger blocking overlay.
- `useDrawerContext` is available for advanced wrappers and custom controls.
