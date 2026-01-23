# @vega-ui/react

## 2.1.0

### Minor Changes

- 8380d3b: Refactor Calendar stack to scroll-snap scrollers (DataGridPickerScroller) and remove react-store based state.

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

### Patch Changes

- Updated dependencies [8380d3b]
  - @vega-ui/hooks@2.1.0
  - @vega-ui/utils@2.1.0
  - @vega-ui/icons@2.1.0
  - @vega-ui/react-context@2.1.0

## 2.0.1

### Patch Changes

- 697ebd5: Improved a11y - accordion
  - @vega-ui/hooks@2.0.1
  - @vega-ui/icons@2.0.1
  - @vega-ui/react-context@2.0.1
  - @vega-ui/utils@2.0.1

## 2.0.0

### Major Changes

- 357ab44: - Add new `Tooltip` building blocks: - `TooltipArrow`

### Minor Changes

- 95b6ae7: - The `Drawer` component has been refactored to support a fully composable architecture.

  - Added the following subcomponents to allow flexible composition and advanced customization:
    - `DrawerTrigger`
    - `DrawerPortal`
    - `DrawerOverlay`
    - `DrawerContent`
    - `DrawerHeader`
    - `DrawerTitle`
    - `DrawerCloseButton`

  These additions enable fine-grained control over drawer structure, layout, focus management, and visual presentation, while preserving accessibility, focus trapping, and native interaction patterns

- 50bc30f: Refactor form controls architecture and remove deprecated components.

  ### Removed (breaking)

  - Remove `FlagIcon` package exports and implementation.
  - Remove `PhoneSelectField` and related subcomponents/contexts/styles.
  - Remove legacy `SelectArrow` and `SelectPlaceholder` components.
  - Remove legacy `NumberFieldIncrement`/`NumberFieldDecrement` components.
  - Remove legacy `PinFieldInput` component.

  ### Added

  - Add new `NumberField` building blocks:
    - `NumberFieldInput`
    - `NumberFieldIncrementButton`
    - `NumberFieldDecrementButton`
    - `NumberFieldContext` (new contexts structure)
    - `NumberField` types module
  - Add new `PasswordField` building blocks:
    - `PasswordFieldInput`, `PasswordFieldToggleButton`
    - `PasswordFieldShownIcon`, `PasswordFieldHiddenIcon`
    - `PasswordFieldContext` and component index exports
  - Add new `PhoneField` composition:
    - `PhoneFieldInput`
    - `PhoneFieldSelect` + subcomponents (`Combobox`, `HiddenSelect`, `Icon`, `Listbox`, `Option`, `Portal`, `Value`)
    - `PhoneFieldContext` and component index exports
  - Add `PinFieldHiddenInput` component (single visually hidden input backing the slots).
  - Add new `Select` building blocks:
    - `SelectHiddenSelect`, `SelectIcon`, `SelectPortal`, `SelectValue` helpers
    - `SelectOptionsContext`
  - Add new `TextFieldInput` component and `TextFieldContext`.

  ### Changed

  - Update `PinField` internals, contexts, slots, separator, styles and tests.
  - Update `Select`, `NumberField`, `PasswordField`, `PhoneField`, `TextField` internals, styles, stories and tests.
  - Update `Option` component and related types/styles.
  - Update `Drawer` internals and context, plus stories.
  - Update library root exports (`packages/ui/src/index.ts`).

  ### Tests

  - Update existing tests for refactored components.
  - Add/adjust stories for new subcomponents.

- ca0cb2b: The Accordion component has become more composable: the AccordionIcon and the AccordionHeader have been added.
- 35a056a: The Popover component has become more composable: the PopoverBackdrop have been added
- 21e1d64: Made Alert more composable: added the elements alertTitle, AlertIcon, AlertMain, AlertContent
- e58908c: Added Backdrop component
- 7ef3f1b: The Checkbox component has become more composable: the CheckboxHiddenInput, CheckboxIndicator, CheckboxCheckedIcon and the CheckboxIndeterminateIcon have been added.
- 9489f2e: The loading property in the button has been removed to better match the component to the overall architecture and approach
- 4072edd: The Meter component has become more composable: MeterTrack component has been renamed AvatarGroupStackItem
  The Progress component has become more composable: ProgressTrack component has been renamed AvatarGroupStackItem
  The PartialTrack component has been renamed (MeterStack), PartialMeterItem is now MeterStackSegment
- 0023797: The AvatarGroup component has become more composable: AvatarGroupPopover, AvatarGroupPopoverIcon, AvatarGroupPopoverTrigger, AvatarGroupPopoverContent, AvatarGroupCount, AvatarGroupStack components have been added, AvatarGroupItem component has been renamed AvatarGroupStackItem
- acaabbc: The AvatarGroup component is now AvatarStack, which more reflects its spirit; Moreover, the AvatarGroupPopover and related components, as well as AvatarGroupCount, have been removed due to the fact that they inflate the codebase and can be implemented with existing primitives
- 5c33866: The CheckboxCard component has become more composable: CheckboxCardContent, CheckboxCardTitle, CheckboxCardDescription, CheckboxCardControl, CheckboxCardControlHiddenInput, CheckboxCardControlIndicator, CheckboxCardControlCheckedIcon, CheckboxCardControlIndeterminateIcon components have been added
- d4d1a53: Unified TextArea sizes
- f9dacd3: The Modal component has been renamed Dialog due to the greater consistency with the naming of native web elements
- 6fae7e6: The Fieldset component has become more composable: the FieldsetHeader and FieldsetLegend components have been added
- bd99cb1: The Switch component has become more composable: SwitchIndicator and SwitchHiddenInput components have been added
- 82d11c9: - The `Sheet` component has been refactored to support a fully composable architecture
  - Added the following subcomponents to allow flexible composition and advanced customization:
    - `SheetPortal`
    - `SheetBackdrop`
- 7b2c7fe: Composable Slider
- d2a2c5a: - The `Dialog` component has been refactored to support a fully composable architecture.

  - Added the following subcomponents to allow flexible composition and advanced customization:
    - `DialogTrigger`
    - `DialogPortal`
    - `DialogOverlay`
    - `DialogContent`
    - `DialogHeader`
    - `DialogTitle`
    - `DialogCloseButton`

  These additions enable fine-grained control over drawer structure, layout, focus management, and visual presentation, while preserving accessibility, focus trapping, and native interaction patterns

- e0a38ab: The SegmentedControl component has become more composable: the SegmentedControlItemHiddenInput and SegmentedControlIndicator have been added.
- 31b2b94: Improved backdrop animations
- eab55a8: The responsive-ui package is no longer supported due to inconsistencies in the overall component design approach

  The components that the responsive ui package contained are easily implemented using the composition of existing ones and do not require the support and development of a separate package

- cfb207b: Unified all sizes

### Patch Changes

- afe89b4: Changed DrawerOverlay to Backdrop inside
- f121fa6: Removed unsued wrapper from CollapsibleContent
- 9fcad60: Fixed ts problems
- f5fae54: Changed PageControl handler. Removed onProgressEnd (replaced by onAnimatedEnd)
- Updated dependencies [50bc30f]
- Updated dependencies [9fcad60]
- Updated dependencies [e0a38ab]
- Updated dependencies [eab55a8]
  - @vega-ui/hooks@2.0.0
  - @vega-ui/utils@2.0.0
  - @vega-ui/react-context@2.0.0
  - @vega-ui/icons@2.0.0

## 1.14.3

### Patch Changes

- e5fcee3: Fixed active day into calendar
- 5fbc32c: Changed dirs
- 7711364: Renamed BaseCalendar to CalendarBase
- Updated dependencies [7711364]
  - @vega-ui/hooks@1.14.3
  - @vega-ui/utils@1.14.3
  - @vega-ui/icons@1.14.3
  - @vega-ui/react-context@1.14.3

## 1.14.2

### Patch Changes

- 55809c0: Changed deps
- Updated dependencies [55809c0]
  - @vega-ui/hooks@1.14.2
  - @vega-ui/icons@1.14.2
  - @vega-ui/react-context@1.14.2
  - @vega-ui/utils@1.14.2

## 1.14.1

### Patch Changes

- 9bb4a3b: Refactored contexts, they are unified in style
- 21bd47a: Changed types
- d595467: Flat helpers to one level
- d76eea5: Deleted unused dependencies
- Updated dependencies [9bb4a3b]
- Updated dependencies [d76eea5]
  - @vega-ui/react-context@1.14.1
  - @vega-ui/icons@1.14.1
  - @vega-ui/utils@1.14.1
  - @vega-ui/hooks@1.14.1

## 1.14.0

### Minor Changes

- a387fda: Added new calendar primitives:

  - **CalendarBase** — foundational layout and styling provider for all calendar components (size, variant, compact mode).
  - **Calendar** — high-level fully interactive calendar with day/month/year pickers, scroll-based navigation, controlled/uncontrolled selection modes, and full provider-based state management.

  These components form the new core of the calendar system and enable building flexible, Radix-style declarative/imperative calendar interfaces.

### Patch Changes

- Updated dependencies [a387fda]
  - @vega-ui/hooks@1.14.0
  - @vega-ui/utils@1.14.0
  - @vega-ui/icons@1.14.0

## 1.13.0

### Minor Changes

- abbdcdc: Add composable calendar picker primitives and index-based snap scroller utilities.

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

### Patch Changes

- Updated dependencies [abbdcdc]
  - @vega-ui/hooks@1.13.0
  - @vega-ui/utils@1.13.0
  - @vega-ui/icons@1.13.0

## 1.12.4

### Patch Changes

- Updated dependencies [a18e86e]
  - @vega-ui/icons@1.12.4
  - @vega-ui/hooks@1.12.4
  - @vega-ui/utils@1.12.4

## 1.12.3

### Patch Changes

- b433cff: Fixed RangeSlider performance
  - @vega-ui/hooks@1.12.3
  - @vega-ui/icons@1.12.3
  - @vega-ui/utils@1.12.3

## 1.12.2

### Patch Changes

- 919f735: Fixed SnapScrolle onSnap call
- 709d532: Changed requestIdleCallback to rAF due to unsupport into Safari
- e5ab56d: Fixed SnapScroller onScroll left
  - @vega-ui/hooks@1.12.2
  - @vega-ui/icons@1.12.2
  - @vega-ui/utils@1.12.2

## 1.12.1

### Patch Changes

- 22dea95: A bug was fixed in which it was impossible to expand the selected range on mobile devices and scroll in SnapScroller, as well as minor edits were made: when changing the range to the beginning and end, reset is not triggered.
- 3b2c885: Added selected and default selected as a prop for DataGridSelectable
- Updated dependencies [22dea95]
  - @vega-ui/hooks@1.12.1
  - @vega-ui/icons@1.12.1
  - @vega-ui/utils@1.12.1

## 1.12.0

### Minor Changes

- 30e9724: This release introduces a complete grid, selection, and scroll system for structured, interactive UIs.
  It combines efficient keyboard navigation, flexible selection logic, and smooth snap scrolling —
  forming the foundation for advanced table, calendar, and picker interfaces.

  📊 `DataGrid`

  `DataGrid` is a focusable, navigable grid that manages keyboard movement and active-cell focus.

  - Supports navigation with Arrow, Home/End, and PageUp/PageDown keys
  - Optional wrap navigation (horizontal, vertical, or both)
  - Configurable rowDelta for page jumps
  - Provides an imperative API (grid, keyMap) for advanced logic
  - Supports excluded or disabled cells that are skipped during traversal
  - Emits onMove events describing direction and axis of movement

  Used as the base for all higher-level grid-based components.

  🧭 `DataGridSelectable`

  `DataGridSelectable` extends DataGrid with a full selection model.

  - Selection modes: "single", "multiple", "range"
  - Keyboard (Shift + Arrows) and pointer-based range selection
  - Optional disabled and bounded ranges (from / to)
  - Fully integrated with the useSelection hook
  - Provides consistent accessibility and state behavior

  Ideal for building interactive tables, lists, and date selectors.

  🎯 `DataGridPicker`

  DataGridPicker builds on DataGridSelectable to enable picking and highlighting items within a grid.

  - Automatically computes rectangular ranges between selected cells
  - Supports highlighting of continuous intervals (start → end)
  - Can be customized with a user-defined resolveRange function
  - Commonly used for date pickers, emoji selectors, or option matrices

  🧱 `SnapScroller`

  `SnapScroller` provides smooth, scroll-snap navigation with full control and callbacks.

  - Optimized for CSS scroll-snap-align behavior
  - Exposes imperative API: next(), prev(), element

  Triggers:

  - onSnap(index) — when snapped item changes
  - onOffset(direction) — when scroll reaches start or end

  Optional preserveScroll restores snapped position after content updates

  Perfect for carousels, paginated lists, or horizontally scrolling pickers.

  🪝 `useSelection` Hook

  `useSelection` is a composable hook for declarative selection management.

  - Supports "single", "multiple", and "range" modes
  - Provides helpers: toggle, expand, isSelected, edges, and more
  - Accepts custom equals, compare, and resolveRange logic

  Used internally by DataGridSelectable and DataGridPicker

  ⚙️ `Grid & Matrix Utilities`

  These low-level utilities power the core grid logic and ensure efficient traversal.

  `grid`

  A high-level controller for navigating 2D layouts:

  - Provides directional movement (before, after, above, below)
  - Handles row and column wrapping
  - Uses Matrix internally for structure and lookup

  `matrix`

  A modular 2D data engine with the following components:

  `Matrix` — manages all rows and cells
  `MatrixRow` — ordered row container with iterable access
  `MatrixNode` — represents a single cell ([row, col], key, payload)
  `MatrixIndexes` — maintains sorted indices with binary search

  Together, they ensure fast lookups and navigation across sparse grids.

  This release establishes the foundation for interactive, accessible, and performant grid-based interfaces in Vega UI —
  enabling developers to build pickers, calendars, tables, and carousels with minimal boilerplate and maximum control.

### Patch Changes

- Updated dependencies [30e9724]
  - @vega-ui/hooks@1.12.0
  - @vega-ui/utils@1.12.0
  - @vega-ui/icons@1.12.0

## 1.11.4

### Patch Changes

- 8f89ab1: Fixed buttons docs
- 2740436: Fixed avatar icon size
- 9c8d951: Fixed pagination icon button size
- Updated dependencies [0124d94]
  - @vega-ui/icons@1.11.4
  - @vega-ui/hooks@1.11.4
  - @vega-ui/utils@1.11.4

## 1.11.3

### Patch Changes

- 0392555: Made graphite color more contrast than gray
  - @vega-ui/hooks@1.11.3
  - @vega-ui/icons@1.11.3
  - @vega-ui/utils@1.11.3

## 1.11.2

### Patch Changes

- 61a382b: The gray colors have been changed, the surface has been added, and the fields styles have also been changed
  - @vega-ui/hooks@1.11.2
  - @vega-ui/icons@1.11.2
  - @vega-ui/utils@1.11.2

## 1.11.1

### Patch Changes

- eef91ab: Fixed sheet paddings
  - @vega-ui/hooks@1.11.1
  - @vega-ui/icons@1.11.1
  - @vega-ui/utils@1.11.1

## 1.11.0

### Minor Changes

- a4c6339: SheetContent will now contain SheetMain, SheetHandle, and SheetHeader inside

### Patch Changes

- @vega-ui/hooks@1.11.0
- @vega-ui/icons@1.11.0
- @vega-ui/utils@1.11.0

## 1.10.1

### Patch Changes

- @vega-ui/hooks@1.10.1
- @vega-ui/icons@1.10.1
- @vega-ui/utils@1.10.1

## 1.10.0

### Minor Changes

- d5538a5: Added new sizes (xs, xl) for button, icon button and segmented control

### Patch Changes

- @vega-ui/hooks@1.10.0
- @vega-ui/icons@1.10.0
- @vega-ui/utils@1.10.0

## 1.9.0

### Minor Changes

- c90a0c1: Added new packages - tokens and theme

### Patch Changes

- @vega-ui/hooks@1.9.0
- @vega-ui/icons@1.9.0
- @vega-ui/utils@1.9.0

## 1.8.1

### Patch Changes

- c98c982: Added Size prop to PageControl, added hook useRefMap, improved accessability, added mergeEventHandlers util
- Updated dependencies [c98c982]
  - @vega-ui/hooks@1.8.1
  - @vega-ui/utils@1.8.1
  - @vega-ui/icons@1.8.1

## 1.8.0

### Minor Changes

- 83bafaa: Added new component - PageControl

### Patch Changes

- @vega-ui/hooks@1.8.0
- @vega-ui/icons@1.8.0
- @vega-ui/utils@1.8.0

## 1.7.4

### Patch Changes

- 7031b78: NumberField separated to components
  - @vega-ui/hooks@1.7.4
  - @vega-ui/icons@1.7.4
  - @vega-ui/utils@1.7.4

## 1.7.3

### Patch Changes

- 9bd2b72: Changed measure of padding and br into the Badge
- ff9b743: Fixed style for pin field
  - @vega-ui/hooks@1.7.3
  - @vega-ui/icons@1.7.3
  - @vega-ui/utils@1.7.3

## 1.7.2

### Patch Changes

- ec3ec3a: Added new badge appearance
- 272ce51: Changed spelling
  - @vega-ui/hooks@1.7.2
  - @vega-ui/icons@1.7.2
  - @vega-ui/utils@1.7.2

## 1.7.1

### Patch Changes

- bc29e3e: Changed Badge display to inline-flex
- a4f52d3: Separated inner components in Alert
  - @vega-ui/hooks@1.7.1
  - @vega-ui/icons@1.7.1
  - @vega-ui/utils@1.7.1

## 1.7.0

### Minor Changes

- 3941d2c: Added custom size, appearance and variant to elements
- 5cb45a4: Changed default icon size to null

### Patch Changes

- @vega-ui/hooks@1.7.0
- @vega-ui/icons@1.7.0
- @vega-ui/utils@1.7.0

## 1.6.0

### Minor Changes

- c672c1e: Added accordion item provider

### Patch Changes

- @vega-ui/hooks@1.6.0
- @vega-ui/icons@1.6.0
- @vega-ui/utils@1.6.0

## 1.5.0

### Minor Changes

- 89c9898: Added new compoents - AccordionTrigger, AccordionContent, that brings new flexibility for styling elements

### Patch Changes

- @vega-ui/hooks@1.5.0
- @vega-ui/icons@1.5.0
- @vega-ui/utils@1.5.0

## 1.4.2

### Patch Changes

- 7002513: Removed default props in Icon & added new types to Slot (generic type)
- e731538: Deleted utils for size map spinner
  - @vega-ui/hooks@1.4.2
  - @vega-ui/icons@1.4.2
  - @vega-ui/utils@1.4.2

## 1.4.1

### Patch Changes

- a136ce0: Deleted @property css
  - @vega-ui/hooks@1.4.1
  - @vega-ui/icons@1.4.1
  - @vega-ui/utils@1.4.1

## 1.4.0

### Minor Changes

- e022b3c: Added new utilities

### Patch Changes

- Updated dependencies [e022b3c]
  - @vega-ui/utils@1.4.0
  - @vega-ui/hooks@1.4.0
  - @vega-ui/icons@1.4.0

## 1.3.0

### Minor Changes

- 279075a: Changed providers of icons - lucide

### Patch Changes

- Updated dependencies [279075a]
  - @vega-ui/icons@1.3.0
  - @vega-ui/hooks@1.3.0
  - @vega-ui/utils@1.3.0

## 1.2.2

### Patch Changes

- a80dac4: Changed Alert styles accorded to Figma
  - @vega-ui/hooks@1.2.2
  - @vega-ui/icons@1.2.2
  - @vega-ui/utils@1.2.2

## 1.2.1

### Patch Changes

- 3bdf4de: Changed slider styles
  - @vega-ui/hooks@1.2.1
  - @vega-ui/icons@1.2.1
  - @vega-ui/utils@1.2.1

## 1.2.0

### Minor Changes

- 6224045: Added new component - RangeSlider, Slider and SliderBase

### Patch Changes

- Updated dependencies [6224045]
  - @vega-ui/utils@1.2.0
  - @vega-ui/hooks@1.2.0
  - @vega-ui/icons@1.2.0

## 1.1.1

### Patch Changes

- ffa6cc4: Fixed exports
  - @vega-ui/hooks@1.1.1
  - @vega-ui/icons@1.1.1
  - @vega-ui/utils@1.1.1

## 1.1.0

### Minor Changes

- c226a32: Added new components - Meter, MeterStack and Progress

### Patch Changes

- @vega-ui/hooks@1.1.0
- @vega-ui/icons@1.1.0
- @vega-ui/utils@1.1.0

## 1.0.1

### Patch Changes

- fb2ec42: Changed logo
- Updated dependencies [fb2ec42]
  - @vega-ui/hooks@1.0.1
  - @vega-ui/icons@1.0.1
  - @vega-ui/utils@1.0.1
