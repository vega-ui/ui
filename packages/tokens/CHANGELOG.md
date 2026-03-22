# @vega-ui/tokens-core

## 2.3.0

### Minor Changes

- f5dd762: Changed hex to oklch + color-mix
- 064d8c0: ### @vega-ui/tokens-core

  Complete overhaul of the color palette:

  - Colors migrated from `color-mix(in oklch, var(--color-red) X%, white/black)` to direct `oklch()` values for more predictable perceptual color space
  - Removed intermediate steps (50, 150, 250, 350, 450, 550, 650, 750, 850, 950) — scale simplified to 11 steps: 0–100–200–…–1000

  ### @vega-ui/theme-core

  Complete overhaul of semantic tokens in `light.css` / `dark.css`:

  - Added fill tokens: `--fills-primary/secondary/tertiary/quaternary` with hover/active states
  - Added label tokens: `--label-primary/secondary/tertiary/quaternary`
  - Added surface tokens: `--surface-ultrathin/thin/regular/thick/ultrathick`
  - Added separator tokens: `--separator-opaque/non-opaque`
  - Added border tokens: `--border-color` with hover/active states
  - Added disabled state tokens: `--disable-*`
  - Added color accent tokens: `--color-*-accent-*` — palette is automatically inverted in dark mode
  - Renamed: `--text-inverce-color` → `--text-color-inverce`

  ### @vega-ui/react

  - All components migrated to new semantic tokens from the theme
  - Removed direct color token references in components, replaced with semantic variables

### Patch Changes

- 1dc9de6: Change gray color (1000)

## 2.2.1

## 2.2.0

## 2.1.1

## 2.1.0

## 2.0.1

## 2.0.0

### Minor Changes

- 31b2b94: Improved backdrop animations
- eab55a8: The responsive-ui package is no longer supported due to inconsistencies in the overall component design approach

  The components that the responsive ui package contained are easily implemented using the composition of existing ones and do not require the support and development of a separate package

## 1.14.3

## 1.14.2

### Patch Changes

- 55809c0: Changed deps

## 1.14.1

## 1.14.0

## 1.13.0

## 1.12.4

## 1.12.3

## 1.12.2

## 1.12.1

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

## 1.11.4

## 1.11.3

### Patch Changes

- 0392555: Made graphite color more contrast than gray

## 1.11.2

### Patch Changes

- 61a382b: The gray colors have been changed, the surface has been added, and the fields styles have also been changed

## 1.11.1

## 1.11.0

## 1.10.1

## 1.10.0

## 1.9.0

### Minor Changes

- c90a0c1: Added new packages - tokens and theme
