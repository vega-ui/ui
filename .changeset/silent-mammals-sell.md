---
"@vega-ui/hooks": minor
"@vega-ui/utils": minor
"@vega-ui/react": minor
---

Add composable calendar picker primitives and index-based snap scroller utilities.

**New pickers**

- **`YearPicker`**

  - High-level year selection component built on top of `DataGridPicker<number>`.
  - Supports `single`, `multiple`, and `range` selection modes with `from` / `to` bounds.
  - Provides a default `YearPickerLayout` (configurable `rows`, `cols`, `start`, `offset`).
  - Adds composable primitives:
    - `YearPickerItem`, `YearPickerRow`, `YearPickerRowGroup`
    - `YearPickerScroller`, `YearPickerScrollerContent`, `YearPickerScrollerLayout`
  - Includes helpers like `createYearPickerGrid` for generating year grids.

- **`MonthPicker`**

  - Wrapper over `DataGridPicker<number>` specialized for month selection.
  - Default active value resolves to the current month.
  - Provides:
    - `MonthPickerLayout` with configurable `rows`, `cols`, `start`, `locale`, `format`
    - `MonthPickerItem`, `MonthPickerRow`, `MonthPickerRowGroup`
    - `MonthPickerScroller`, `MonthPickerScrollerContent`, `MonthPickerScrollerLayout`
  - Adds `createMonthPickerGrid` for building month matrices (e.g. 3×4 year views).

- **`DayPicker`**
  - Day-level calendar picker built on `DataGridPicker<number>` with default active set to “today” (timestamp).
  - Supports `single` / `multiple` / `range` selection and can respect min/max via `DataGridPicker`.
  - Provides:
    - `DayPickerLayout` with `year`, `month`, `offset`, `includeOverflowDays`, `weekStartsOn`, `rows`, `cols`, `locale`, `format`
    - `DayPickerItem`, `DayPickerRow`, `DayPickerRowGroup`
    - `DayPickerScroller`, `DayPickerScrollerContent`, `DayPickerScrollerLayout`
  - Adds `createDayPickerGrid` to generate month views with optional overflow days and arbitrary week starts.

**New scroller utilities**

- **`IndexedSnapScroller`**
  - Extends `SnapScroller` with virtual, index-based paging.
  - Maintains a sliding window of logical page indexes via `useIndexes({ start, startDir, size, shift })`.
  - Automatically shifts the window when scroll reaches edges (`onOffset(-1|1)`).
  - Exposes:
    - `IndexedSnapScroller` component
    - `IndexedSnapScrollerContent` (injects `index` via context)
    - `IndexedSnapScrollerProvider` / `useIndexesSnapScrollerContext` for consuming the current index in custom layouts.

**Formatting helpers**

- Add small date-format helpers, suitable for use inside picker layouts:
  - `formatDay(day, month, year, locale?, format?)`
  - `formatMonth(month, locale?, format?)`
  - `formatYear(year, locale?, format?)`

These additions provide a fully composable calendar system (years, months, days) on top of `DataGridPicker` and `SnapScroller`, while keeping layout and rendering customizable through small, focused primitives.
