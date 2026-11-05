# SnapScroller API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the scroller’s element. |
| `apiRef` | `Ref<SnapScrollerApiRef>` | — | No | Ref to the scroller’s imperative API. Provides `element`, `prev()` and `next()` methods for programmatic control. |
| `defaultIndex` | `number` | — | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | — | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. This callback is invoked after all scrolling and snapping animations have finished and the active snap position is considered stable. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | — | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. This callback may be invoked multiple times during a single scroll or swipe interaction as the scroller approaches its final snap position. Useful for optimistic UI updates, previews, or synchronizing transient state during scrolling. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SnapScrollerContent`: snap-aligned item with `index`.

### `SnapScrollerContent`

<!-- AUTO-GENERATED:PART_API:SnapScrollerContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `index` | `number` | — | Yes | Sequential index of the item inside SnapScroller. Used to derive the snapped page via the element's `data-index`. |
| `asChild` | `boolean` | `false` | No | Render the content as a child (via `Slot`) instead of a native `<div>`. Keeps attributes/refs bound to the passed child element. |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the item's root element. Will be merged with internal `itemRef(index)` to participate in snapping logic. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:SnapScrollerContent:end -->

## Types

- `SnapScrollerProps`
- `SnapScrollerContentProps`
- `SnapScrollerApiRef`

## State Model

- The root derives pending and committed snap indexes from scroll position.
- `apiRef` exposes `prev()`, `next()`, keyed scrolling, and measurement.
- Child content registration is index-based and should stay stable across renders.
