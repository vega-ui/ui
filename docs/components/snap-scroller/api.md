# SnapScroller API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref to the scroller’s element. |
| `apiRef` | `Ref<SnapScrollerApiRef>` | `—` | No | Ref to the scroller’s imperative API. |
| `defaultIndex` | `number` | `—` | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | `—` | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | `—` | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SnapScrollerContent`: snap-aligned item with `index`.

## Types

- `SnapScrollerProps`
- `SnapScrollerContentProps`
- `SnapScrollerApiRef`

## State Model

- The root derives pending and committed snap indexes from scroll position.
- `apiRef` exposes `prev()`, `next()`, keyed scrolling, and measurement.
- Child content registration is index-based and should stay stable across renders.
