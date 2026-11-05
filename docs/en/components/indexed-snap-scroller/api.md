# IndexedSnapScroller API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. Acts as the logical origin for the sliding index window. |
| `startDir` | `-1 \| 1` | `1` | No | Direction in which the initial index sequence expands. `1` — indexes increase to the right (0, 1, 2…); `-1` — indexes decrease to the right (0, -1, -2…). Controls the growth pattern of the initial index array. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. Defines the size of the virtual “window” that the scroller slides over when navigating left or right. |
| `shift` | `number` | `2` | No | Number of pages appended when a scroll reaches the end of the window, so a fast swipe keeps going. Once the scroll settles, the window is re-centered on the snapped page. |
| `index` | `number` | — | No | Controls the currently active logical index. When provided, the scroller keeps the given index in view, scrolling to it if possible or rebuilding the window if needed. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). If `true`, the scroller will restore the same snapped index using an immediate `scrollIntoView`. |
| `apiRef` | `Ref<IndexedSnapScrollerApiRef>` | — | No | Exposes the imperative API of the scroller. Allows programmatic control such as scrolling to an index or resetting the virtual window. |
| `onOffset` | `(value: number) => void` | — | No | Fires when the window grows at an edge. `-1` — the scroll settled on the first page (left/top edge); `+1` — the scroll reached the end (right/bottom edge). Useful for infinite loading: append/prepend pages based on the direction. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the scroller’s element. |
| `defaultIndex` | `number` | — | No | Initial index of the item to snap to on mount. |
| `onScrollSnapChange` | `(element: HTMLElement, index: number) => void` | — | No | Fired when a scroll snap operation has fully completed and the scroller has settled on a new snap index. This callback is invoked after all scrolling and snapping animations have finished and the active snap position is considered stable. |
| `onScrollSnapChanging` | `(element: HTMLElement, index: number) => void` | — | No | Fired while a scroll snap operation is in progress and the active snap index is still changing. This callback may be invoked multiple times during a single scroll or swipe interaction as the scroller approaches its final snap position. Useful for optimistic UI updates, previews, or synchronizing transient state during scrolling. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `IndexedSnapScrollerContent`: content template bound to the current virtual index.

### `IndexedSnapScrollerContent`

<!-- AUTO-GENERATED:PART_API:IndexedSnapScrollerContent:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | External ref to the item's root element. Will be merged with internal `itemRef(index)` to participate in snapping logic. |
| `asChild` | `boolean` | — | No | Render the content as a child (via `Slot`) instead of a native `<div>`. Keeps attributes/refs bound to the passed child element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:IndexedSnapScrollerContent:end -->

## Types

- `IndexedSnapScrollerProps`
- `IndexedSnapScrollerContentProps`
- `IndexedSnapScrollerApiRef`

## State Model

- The root manages a sliding window of logical indexes.
- Controlled `index` can either scroll to an existing item or trigger a window reset.
- While a scroll reaches the end, pages are appended so it can keep going; once the scroll settles, the window is re-centered on the snapped page.
- `next()` / `prev()` count from the page the scroll is already heading to and grow the window first when the target is outside it.
