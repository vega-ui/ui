/**
 * Imperative API for programmatic control of the SnapScroller.
 *
 * Exposed through the `apiRef` prop, this interface allows external code
 * to navigate between snap-aligned items without user scrolling.
 *
 * Methods:
 * - `next()` — scrolls to the next snap-aligned item.
 * - `prev()` — scrolls to the previous snap-aligned item.
 * - `to(index)` — scrolls to the item whose `data-index` equals `index`.
 */
export interface SnapScrollerApiRef {
  next(): void
  prev(): void
  to(index: number): void
}