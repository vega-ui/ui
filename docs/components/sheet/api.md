# Sheet API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `snapPoints` | `Array<`${number}px` \\| number>` | `—` | No | value that the Sheet will aim at when the pointer is released |
| `edgeThreshold` | `number` | `.4` | No | threshold value, as a percentage of the screen, at which the snap point will be set to the edge value |
| `siblingThreshold` | `number` | `.1` | No | threshold value, as a percentage of the screen, at which the snap point will be set to the next/prev value |
| `swipeTimestamp` | `number` | `500` | No | time in milliseconds needed to make a decision on switching to threshold snap points |
| `closable` | `boolean` | `true` | No | Determines whether the component can be closed by user interaction. |
| `dismissible` | `boolean` | `true` | No | the sheet can be dismissed by clicking outside or swiping down. |
| `activeSnapPoint` | `number` | `—` | No | currently active snap point index (controlled). |
| `defaultSnapPoint` | `number` | `—` | No | initial snap point index when uncontrolled. |
| `onChangeActiveSnapPoint` | `(activeSnapPoint: number) => void` | `—` | No | Callback fired when the active snap point changes. |
| `steppedSnapPoints` | `boolean` | `false` | No | Enables snapping only to defined steps instead of continuous drag. |
| `defaultOpen` | `boolean` | `false` | No | Controls whether the sheet is initially open (umcontrolled). |
| `open` | `boolean` | `—` | No | Controls whether the sheet is currently open (controlled). |
| `clickEnabled` | `boolean` | `true` | No | Enables interaction via outside click. |
| `onOpenChange` | `(value: boolean) => void` | `—` | No | Callback fired when the open state changes. |
| `children` | `ReactNode \\| ReactNode[]` | `—` | No | content rendered inside the sheet. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref to the root container of the sheet. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SheetTrigger`
- `SheetPortal`
- `SheetBackdrop`
- `SheetContent`
- `SheetHandle`
- `SheetHeader`
- `SheetMain`

## Types

- `SheetProps`
- `SheetContentProps`
- `SheetTriggerProps`
- `SheetHandleProps`
- `SheetHeaderProps`
- `SheetMainProps`
- `SheetBackdropProps`
- `SheetPortalProps`

## State Model

- Open state can be controlled or uncontrolled.
- Snap points affect the visible interaction model, not just layout.
- `closable={false}` should be reserved for flows with a clear completion path.
- `useSheetContext` is available for advanced wrappers and controls.
