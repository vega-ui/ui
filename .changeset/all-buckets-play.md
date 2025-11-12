---
"@vega-ui/responsive-react": minor
"@vega-ui/tokens-core": minor
"@vega-ui/hooks": minor
"@vega-ui/utils": minor
"@vega-ui/react": minor
---

This release introduces a complete grid, selection, and scroll system for structured, interactive UIs.
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