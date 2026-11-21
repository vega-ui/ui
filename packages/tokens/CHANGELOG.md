# @vega-ui/tokens-core

## 3.0.0

### Minor Changes

- 1064f43: BREAKING: components get their own layout defaults, so the common workarounds are no longer needed.

  - **Roundness.** New `--br-ratio` token in `@vega-ui/tokens-core` (default `0.333`). `Button`, the fields, `TextArea`, `PinField`, `Checkbox`, `Option`, `Select`, `SegmentedControl`, `GridItem` and `Badge` read their `--*-br-ratio` from it, and `Code` takes its radius as its line height times it, so one value makes them all square, rounder or pill-shaped. It works on a nested element too. Update `@vega-ui/tokens-core` with `@vega-ui/react`.
  - **`Badge` radius variable.** `--badge-border-radius-ratio` is renamed to `--badge-br-ratio`, like on the other components.
  - **`Fieldset`.** The browser margin is reset. A transparent `Fieldset` puts `var(--spacing-6)` under its legend, which the flex `gap` does not reach.
  - **`FieldsetLegend` size.** The legend uses the `Label` text size instead of a larger one.
  - **`Checkbox` layout.** The root is an `inline-flex` row with centered items and a `var(--spacing-4)` gap, so the box no longer sits on its own line above the text. `CheckboxIndicator` does not shrink.
  - **`SegmentedControl`.** Segments share the width equally and can shrink in a narrow container instead of overflowing it. A disabled segment uses `--disable-label-text-color`, like a disabled `Option`.
  - **`Pagination`.** The list has no browser margin or padding, and the gap between items is `var(--spacing-2)` instead of `var(--spacing-6)`.
  - **`TextArea` size.** The sizes match `TextField`: one row is 36, 42 and 48px tall for `sm`, `md` and `lg`, like a `Button` of the same size.
  - **`Calendar` width.** `CalendarContent` no longer reports the width of all its scrolled pages, so a calendar in a flex row or a shrink-to-fit container is as wide as one month instead of several.
  - **Picker items.** `GridItem` has `var(--spacing-3)` inline padding inside its minimum width, so month and year labels no longer touch.
  - **`Table`.** The default `dataAlign="between"` aligns the middle columns to the start instead of centering them. A `TableHeading` inside `TableHead` draws the line under the row itself, so the line stays with sticky headings.
  - **`AvatarFallback`.** Its font size no longer uses `!important`, so `style` can override it.
  - **Selected `Option`.** Inside a selected option `--label-secondary` and `--label-tertiary` follow `--option-color`, so secondary text stays readable on the selected fill.
  - **`Code` wrapping.** Long tokens wrap with `overflow-wrap: anywhere`.
  - **`Avatar`.** The avatar does not shrink in a flex row.
  - **`MeterStack`.** The root has `role="group"`. Name it with `aria-label` or `aria-labelledby`.
  - **`Switch`.** `--switch-indicator-transition-delay` applies again.

- 399fd0d: Add motion tokens: `--ease-smooth` (critically damped), `--ease-spring` (a light overshoot), and `--ease-exit` easings, with `--duration-spring` and `--duration-exit`.
- 9dcbb8e: New `Toast`, `ToastRegion` and `ToastClose`, with `createToastQueue` and `useToastContext`.

  - `createToastQueue<Content>()` makes a queue you keep in a module of your own, with no provider: `add(content, { timeout })` shows a toast from anywhere, React or not, and returns its key, `close(key)` closes it. A toast without `timeout` stays until it is closed.
  - `ToastRegion` shows the toasts of a queue as a named `role="region"` live region in the top layer, mounted before the first toast so the screen reader reads every one. It renders its children once per toast as a template that reads the toast with `useToastContext()`, shows the `limit` newest toasts (3 by default) and keeps the older ones waiting. `placement` puts them at the top or the bottom edge, at the start, centered or at the end (`top-end` by default), always centered on a narrow screen. Over an open modal `<dialog>`, `Dialog`, `Drawer` and `Sheet` included, the region moves into the dialog, so the toasts stay above it and the user can still press them.
  - The timers pause while the pointer or the focus is on the toasts, while the window has no focus and while the tab is hidden, and run on with the time they had left.
  - The toasts stack as a deck that expands while the pointer or the focus is on it. A swipe in one of the `swipeDirections` (by default toward the edge the toasts sit at and the nearer side edge, which follows a right-to-left page) closes a toast once it goes far or fast enough, and resists and springs back the other way; Escape closes the focused toast, and the focus moves to the next one, or back to where it was before the toasts once the last one closes.
  - `Toast` is one toast, `role="status"` by default; pass `role="alert"` for an urgent one and name it with `aria-labelledby`. `ToastClose` closes its toast after your `onClick`, unless it calls `preventDefault`, and takes your own button with `asChild`, like an Undo that also dismisses.
  - The styles move with springs and fall back to a fade with reduced motion. `--toast-inset`, `--toast-gap`, `--toast-peek`, `--toast-br-ratio`, `--toast-radius` and `--toast-shadow` on the region tune the look. The state is in `data-expanded` on the region and `data-index`, `data-front`, `data-status`, `data-swiping`, `data-swipe-direction` with `--toast-index`, `--toast-offset`, `--toast-height`, `--toast-front-height`, `--toast-swipe-x`, `--toast-swipe-y` and `--toast-release-duration` on each toast.
  - `@vega-ui/widgets/toast` is the framework-free queue and widget behind them.
  - `@vega-ui/core` adds `act.restoreFocus()`, which focuses again the element that had the focus before it entered the widget, `act.pauseTimer(name)` and `act.resumeTimer(name)`, which keep the time a timer has left, `act.awaitAnimationsAt(key)`, which answers `browser.animationEnd` with the `key` once the animations of an item have finished, `browser.inactive` and `browser.active` when the window loses or regains the focus or the tab is hidden or shown, and `stayOnTop(container, popover)`, which keeps a popover above the other top layer elements and moves its container into the topmost modal dialog and back.

  `@vega-ui/tokens-core` adds `--black-shadow-strong`, a dark shadow with a sharp edge, and the dark theme gives it to `--surface-shadow`, so menus, popovers, dialogs and toasts stand out from the page and from a surface of the same color under them; the light theme keeps its shadow.

### Patch Changes

- 9752981: Remove `@font-face` rules for Montserrat that had no `src` and were ignored by browsers; the app loads the font itself

## 2.5.0

## 2.4.0

### Minor Changes

- a77ab19: Changed xs, sm, md, lg, xl sizes of all components

## 2.3.1

### Patch Changes

- 3858f99: Refactored color system and semantic tokens

  - Updated color palette in `@vega-ui/tokens-core`: revised oklch values across all color scales for better perceptual uniformity
  - Replaced static surface tokens (`surface-ultrathin` … `surface-ultrathick`) with `surface-primary` / `surface-secondary` in both light and dark themes
  - Tweaked fill token chroma/lightness values in light and dark themes for improved contrast
  - Button ghost/transparent hover and active backgrounds now use `oklch(from …)` relative color syntax instead of hardcoded palette steps, making them automatically adapt to any primary/secondary accent color
  - Added Playground story showcasing Badge, Button, Alert, Checkbox, Radio, Avatar, SegmentedControl and Slider in a single view

- 2fe1a01: Fixed colors

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
