# @vega-ui/react

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

- c226a32: Added new components - Meter, PartialMeter and Progress

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
