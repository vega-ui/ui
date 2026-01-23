---
"@vega-ui/hooks": minor
"@vega-ui/utils": minor
"@vega-ui/react": minor
---

Refactor Calendar stack to scroll-snap scrollers (DataGridPickerScroller) and remove react-store based state.

## @vega-ui/ui

### SnapScroller
- **BREAKING:** `initialIndex` renamed to `defaultIndex`.
- **BREAKING:** removed `preserveScroll`.
- **BREAKING:** removed `onOffset`.
- Added scroll-snap callbacks:
    - `onScrollSnapChanging?(element, index)`
    - `onScrollSnapChange?(element, index)`

### IndexedSnapScroller
- Keeps offset-based infinite behavior (window `shift()` / `push()`) and optional `preserveScroll`.
- Supports controlled `index` (scrolls to it when in window; rebuilds window when outside).

### DataGrid
- **BREAKING:** `onMove(e, node, axis, dir)` replaced with `onArrow(e, nextNode, prevNode)`.
- **BREAKING:** `DataGridApiRef` changed:
    - removed `keyMap`
    - added `scopes: Map<DataGridScope, DataGridCellKey[]>`
- `DataGridRowGroup` now supports `scope?: DataGridScope` and provides it via context.
- Cells unregister from the grid on unmount (node cleanup).
- Active/selection focus flow updated to sync active cell on focus changes.

### DataGridPicker
- Added `DataGridPickerScroller` and `DataGridPickerScrollerContent`.
- `DataGridPickerScroller` integrates with scroll-snap events to restore/adjust active focus for the current scope.

### DayPicker
- **BREAKING:** DayPicker scrolling is now driven by `DataGridPickerScroller` (instead of IndexedSnapScroller directly).
- Added period-to-index mapping via reference anchor:
    - `referenceDate?: Date`
    - `getIndexByDate?(year, month)`
    - `getDateByIndex?(index)`
- Period changes are emitted during scroll via `onScrollSnapChanging`.

### YearPicker
- **BREAKING:** YearPicker scrolling is now driven by `DataGridPickerScroller`.
- Added year-to-index mapping via reference anchor:
    - `referenceYear?: number`
    - `getIndexByYear?(year, referenceYear)`
- Layout derives offset from `year` when `offset` is not provided.

### Calendar / CalendarBase
- **BREAKING:** `onYearChange` -> `onChangeYear`
- **BREAKING:** `onMonthChange` -> `onChangeMonth`
- Added controlled/uncontrolled view state for navigation:
    - `year` / `defaultYear`
    - `month` / `defaultMonth`
    - `activeDay` / `defaultActiveDay` + `onChangeActiveDay`
    - `activeMonth` / `defaultActiveMonth` + `onChangeActiveMonth`
    - `activeYear` / `defaultActiveYear` + `onChangeActiveYear`
- Added `referenceDate?: Date` as an anchor for indexed/virtualized navigation.
- Added year-group navigation controls:
    - `CalendarNextYearGroupButton`
    - `CalendarPrevYearGroupButton`
- Picker/ESC handling updated (Escape now stops propagation).
- Period navigation split into:
    - `nextPeriod` / `prevPeriod`
    - `nextYearGroup` / `prevYearGroup`

## @vega-ui/hooks
- **BREAKING:** removed `useStore`, `useControlledStore` (react-store dependency removed).
- **BREAKING:** removed `useIntersectionObserver`.
- Added:
    - `useScrollSnap` (snap measurement + `onSnapChanging/onSnapChange`)
    - `useMutationObserver`
    - `useBiMap`
- `useRefMap` now exposes `removeItemRef`.
- `useIndexes` updated to support new shifting semantics safely.

## @vega-ui/react-store
- **BREAKING:** package removed / no longer used in the monorepo.

## @vega-ui/utils
- Added `BiMap` and `nearest`.
- Reorganized data helpers under `utils/data/*` with re-exports.