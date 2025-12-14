# @vega-ui/responsive-react

## 1.14.2

### Patch Changes

- 55809c0: Changed deps
- Updated dependencies [55809c0]
  - @vega-ui/hooks@1.14.2
  - @vega-ui/icons@1.14.2
  - @vega-ui/react-context@1.14.2
  - @vega-ui/react@1.14.2
  - @vega-ui/utils@1.14.2

## 1.14.1

### Patch Changes

- d76eea5: Deleted unused dependencies
- Updated dependencies [9bb4a3b]
- Updated dependencies [21bd47a]
- Updated dependencies [d595467]
- Updated dependencies [d76eea5]
  - @vega-ui/react-context@1.14.1
  - @vega-ui/icons@1.14.1
  - @vega-ui/utils@1.14.1
  - @vega-ui/react@1.14.1
  - @vega-ui/hooks@1.14.1

## 1.14.0

### Patch Changes

- Updated dependencies [a387fda]
  - @vega-ui/hooks@1.14.0
  - @vega-ui/utils@1.14.0
  - @vega-ui/react@1.14.0
  - @vega-ui/icons@1.14.0

## 1.13.0

### Patch Changes

- Updated dependencies [abbdcdc]
  - @vega-ui/hooks@1.13.0
  - @vega-ui/utils@1.13.0
  - @vega-ui/react@1.13.0
  - @vega-ui/icons@1.13.0

## 1.12.4

### Patch Changes

- Updated dependencies [a18e86e]
  - @vega-ui/icons@1.12.4
  - @vega-ui/react@1.12.4
  - @vega-ui/hooks@1.12.4
  - @vega-ui/utils@1.12.4

## 1.12.3

### Patch Changes

- Updated dependencies [b433cff]
  - @vega-ui/react@1.12.3
  - @vega-ui/hooks@1.12.3
  - @vega-ui/icons@1.12.3
  - @vega-ui/utils@1.12.3

## 1.12.2

### Patch Changes

- Updated dependencies [919f735]
- Updated dependencies [709d532]
- Updated dependencies [e5ab56d]
  - @vega-ui/react@1.12.2
  - @vega-ui/hooks@1.12.2
  - @vega-ui/icons@1.12.2
  - @vega-ui/utils@1.12.2

## 1.12.1

### Patch Changes

- Updated dependencies [22dea95]
- Updated dependencies [3b2c885]
  - @vega-ui/hooks@1.12.1
  - @vega-ui/react@1.12.1
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
  - @vega-ui/react@1.12.0
  - @vega-ui/icons@1.12.0

## 1.11.4

### Patch Changes

- Updated dependencies [8f89ab1]
- Updated dependencies [2740436]
- Updated dependencies [0124d94]
- Updated dependencies [9c8d951]
  - @vega-ui/react@1.11.4
  - @vega-ui/icons@1.11.4
  - @vega-ui/hooks@1.11.4
  - @vega-ui/utils@1.11.4

## 1.11.3

### Patch Changes

- Updated dependencies [0392555]
  - @vega-ui/react@1.11.3
  - @vega-ui/hooks@1.11.3
  - @vega-ui/icons@1.11.3
  - @vega-ui/utils@1.11.3

## 1.11.2

### Patch Changes

- Updated dependencies [61a382b]
  - @vega-ui/react@1.11.2
  - @vega-ui/hooks@1.11.2
  - @vega-ui/icons@1.11.2
  - @vega-ui/utils@1.11.2

## 1.11.1

### Patch Changes

- Updated dependencies [eef91ab]
  - @vega-ui/react@1.11.1
  - @vega-ui/hooks@1.11.1
  - @vega-ui/icons@1.11.1
  - @vega-ui/utils@1.11.1

## 1.11.0

### Patch Changes

- Updated dependencies [a4c6339]
  - @vega-ui/react@1.11.0
  - @vega-ui/hooks@1.11.0
  - @vega-ui/icons@1.11.0
  - @vega-ui/utils@1.11.0

## 1.10.1

### Patch Changes

- @vega-ui/hooks@1.10.1
- @vega-ui/icons@1.10.1
- @vega-ui/react@1.10.1
- @vega-ui/utils@1.10.1

## 1.10.0

### Patch Changes

- Updated dependencies [d5538a5]
  - @vega-ui/react@1.10.0
  - @vega-ui/hooks@1.10.0
  - @vega-ui/icons@1.10.0
  - @vega-ui/utils@1.10.0

## 1.9.0

### Patch Changes

- Updated dependencies [c90a0c1]
  - @vega-ui/react@1.9.0
  - @vega-ui/hooks@1.9.0
  - @vega-ui/icons@1.9.0
  - @vega-ui/utils@1.9.0

## 1.8.1

### Patch Changes

- Updated dependencies [c98c982]
  - @vega-ui/hooks@1.8.1
  - @vega-ui/utils@1.8.1
  - @vega-ui/react@1.8.1
  - @vega-ui/icons@1.8.1

## 1.8.0

### Patch Changes

- Updated dependencies [83bafaa]
  - @vega-ui/react@1.8.0
  - @vega-ui/hooks@1.8.0
  - @vega-ui/icons@1.8.0
  - @vega-ui/utils@1.8.0

## 1.7.4

### Patch Changes

- Updated dependencies [7031b78]
  - @vega-ui/react@1.7.4
  - @vega-ui/hooks@1.7.4
  - @vega-ui/icons@1.7.4
  - @vega-ui/utils@1.7.4

## 1.7.3

### Patch Changes

- Updated dependencies [9bd2b72]
- Updated dependencies [ff9b743]
  - @vega-ui/react@1.7.3
  - @vega-ui/hooks@1.7.3
  - @vega-ui/icons@1.7.3
  - @vega-ui/utils@1.7.3

## 1.7.2

### Patch Changes

- Updated dependencies [ec3ec3a]
- Updated dependencies [272ce51]
  - @vega-ui/react@1.7.2
  - @vega-ui/hooks@1.7.2
  - @vega-ui/icons@1.7.2
  - @vega-ui/utils@1.7.2

## 1.7.1

### Patch Changes

- Updated dependencies [bc29e3e]
- Updated dependencies [a4f52d3]
  - @vega-ui/react@1.7.1
  - @vega-ui/hooks@1.7.1
  - @vega-ui/icons@1.7.1
  - @vega-ui/utils@1.7.1

## 1.7.0

### Patch Changes

- Updated dependencies [3941d2c]
- Updated dependencies [5cb45a4]
  - @vega-ui/react@1.7.0
  - @vega-ui/hooks@1.7.0
  - @vega-ui/icons@1.7.0
  - @vega-ui/utils@1.7.0

## 1.6.0

### Patch Changes

- Updated dependencies [c672c1e]
  - @vega-ui/react@1.6.0
  - @vega-ui/hooks@1.6.0
  - @vega-ui/icons@1.6.0
  - @vega-ui/utils@1.6.0

## 1.5.0

### Patch Changes

- Updated dependencies [89c9898]
  - @vega-ui/react@1.5.0
  - @vega-ui/hooks@1.5.0
  - @vega-ui/icons@1.5.0
  - @vega-ui/utils@1.5.0

## 1.4.2

### Patch Changes

- Updated dependencies [7002513]
- Updated dependencies [e731538]
  - @vega-ui/react@1.4.2
  - @vega-ui/hooks@1.4.2
  - @vega-ui/icons@1.4.2
  - @vega-ui/utils@1.4.2

## 1.4.1

### Patch Changes

- Updated dependencies [a136ce0]
  - @vega-ui/react@1.4.1
  - @vega-ui/hooks@1.4.1
  - @vega-ui/icons@1.4.1
  - @vega-ui/utils@1.4.1

## 1.4.0

### Patch Changes

- Updated dependencies [e022b3c]
  - @vega-ui/utils@1.4.0
  - @vega-ui/react@1.4.0
  - @vega-ui/hooks@1.4.0
  - @vega-ui/icons@1.4.0

## 1.3.0

### Patch Changes

- Updated dependencies [279075a]
  - @vega-ui/icons@1.3.0
  - @vega-ui/react@1.3.0
  - @vega-ui/hooks@1.3.0
  - @vega-ui/utils@1.3.0

## 1.2.2

### Patch Changes

- Updated dependencies [a80dac4]
  - @vega-ui/react@1.2.2
  - @vega-ui/hooks@1.2.2
  - @vega-ui/icons@1.2.2
  - @vega-ui/utils@1.2.2

## 1.2.1

### Patch Changes

- Updated dependencies [3bdf4de]
  - @vega-ui/react@1.2.1
  - @vega-ui/hooks@1.2.1
  - @vega-ui/icons@1.2.1
  - @vega-ui/utils@1.2.1

## 1.2.0

### Patch Changes

- Updated dependencies [6224045]
  - @vega-ui/utils@1.2.0
  - @vega-ui/react@1.2.0
  - @vega-ui/hooks@1.2.0
  - @vega-ui/icons@1.2.0

## 1.1.1

### Patch Changes

- Updated dependencies [ffa6cc4]
  - @vega-ui/react@1.1.1
  - @vega-ui/hooks@1.1.1
  - @vega-ui/icons@1.1.1
  - @vega-ui/utils@1.1.1

## 1.1.0

### Patch Changes

- Updated dependencies [c226a32]
  - @vega-ui/react@1.1.0
  - @vega-ui/hooks@1.1.0
  - @vega-ui/icons@1.1.0
  - @vega-ui/utils@1.1.0

## 1.0.1

### Patch Changes

- fb2ec42: Changed logo
- Updated dependencies [fb2ec42]
  - @vega-ui/hooks@1.0.1
  - @vega-ui/icons@1.0.1
  - @vega-ui/react@1.0.1
  - @vega-ui/utils@1.0.1
