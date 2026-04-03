# IndexedSnapScroller API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `start` | `number` | `-2` | No | Starting index used to generate the initial sequence of pages. |
| `startDir` | `-1 \\| 1` | `1` | No | Direction in which the initial index sequence expands. |
| `size` | `number` | `5` | No | Number of index segments rendered at once. |
| `shift` | `number` | `—` | No | Number of index units to shift when reaching scroll boundaries. |
| `index` | `number` | `—` | No | Controls the currently active logical index. |
| `preserveScroll` | `boolean` | `true` | No | Preserve the currently snapped item after content changes (e.g., when pages are prepended/appended). |
| `apiRef` | `Ref<IndexedSnapScrollerApiRef>` | `—` | No | Exposes the imperative API of the scroller. |
| `onOffset` | `(value: number) => void` | `—` | No | Fires when the scroll position reaches the start or the end of the content. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `IndexedSnapScrollerContent`: content template bound to the current virtual index.

## Types

- `IndexedSnapScrollerProps`
- `IndexedSnapScrollerContentProps`
- `IndexedSnapScrollerApiRef`

## State Model

- The root manages a sliding window of logical indexes.
- Controlled `index` can either scroll to an existing item or trigger a window reset.
- Boundary offsets trigger `shift()` or `push()` internally.
