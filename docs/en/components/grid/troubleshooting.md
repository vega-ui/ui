# Grid Troubleshooting

## Keyboard Navigation Feels Wrong

### Symptom

The active cell moves in a way that does not match the visible grid.

### Likely Cause

Wrap mode or exclusion rules do not match the rendered layout.

### How To Verify

- inspect `wrap`
- inspect `exclude`
- compare the visible matrix to the keyboard path

### Fix

- align exclusion rules with the real sparse cells
- choose the correct `wrap` mode for the product flow

## Active Cell Does Not Sync With The Parent

### Symptom

The UI appears to change active cell, but the parent state lags or diverges.

### Likely Cause

Controlled active state is not using one source of truth.

### How To Verify

- inspect `active`
- inspect `onChangeActive`

### Fix

- own `active` in one parent state source
- pass the same source to `Grid`

## Tab Skips A Server-Rendered Grid Before Hydration

### Symptom

Before the page hydrates, Tab moves past the grid: no cell has `tabindex="0"` in the server HTML.

### Likely Cause

The grid has no `cells`, no `active` or `defaultActive`, and no single selected cell. Without `cells` the first focusable cell is known only once the cells render on the client.

### How To Verify

- search the server HTML of the grid for `tabindex="0"`
- inspect `active`, `defaultActive`, and `selection`

### Fix

- pass `cells` with the key, row and column of every cell, so the grid knows its first cell on the server
- or pass `defaultActive` with the key of the cell that should take the focus first

## Interactive Content Inside Cells Breaks Keyboard Flow

### Symptom

Tab stops on the buttons or inputs inside the cells, or lands on one of them instead of the active cell.

### Likely Cause

A control inside a cell is still in the tab sequence: it has no `tabIndex={-1}`, so the grid is not one tab stop anymore.

### How To Verify

- tab into the grid: the focus must land on the active cell
- press Tab again: the focus must leave the grid

### Fix

- give every control inside the cells `tabIndex={-1}`
- reach it with Enter or F2 and leave it with Escape

## Range Selection Expands Unexpectedly

### Symptom

Shift-key or pointer expansion selects cells outside the expected range.

### Likely Cause

The key ordering model does not match the domain, or `resolveRange` is missing for a custom range shape.

### How To Verify

- inspect the actual cell keys
- test range expansion with a minimal grid
- compare expected order with `compare`

### Fix

Provide stable keys and a custom `compare` or `resolveRange` when the default ordering is not enough.

## Arrow Keys Stop on Disabled Cells

### Symptom

The arrow keys land on disabled cells, or a cell that should be blocked can still be selected.

### Likely Cause

A disabled cell of `Grid` stays focusable by design, so screen reader users hear that it is unavailable; only its selection is blocked. When a blocked cell can be selected, the disabled keys do not match the real keys.

### How To Verify

- inspect the `disabled` input and compare it with the `value` of the cells
- decide whether the cells should only be unselectable or unreachable too

### Fix

Pass the correct disabled keys. When the cells should also be skipped by the keyboard, pass the same keys to `exclude` too. `DayPicker`, `MonthPicker`, and `YearPicker` already skip unavailable dates.

## Selection Looks Broken After Reordering Rows

### Symptom

Previously selected or active cells drift after data changes.

### Likely Cause

Cell keys are not stable across renders.

### How To Verify

- log generated keys before and after the data update
- confirm whether the same logical cell keeps the same key

### Fix

Use stable domain keys instead of render-order-derived identifiers when possible.

## Selected And Active States Are Hard To Distinguish

### Symptom

Users can focus or select cells, but the visual states look too similar.

### Likely Cause

Custom cell rendering hides the selected, active, or disabled state.

### How To Verify

- inspect the final cell DOM for `aria-selected`, `aria-disabled`, and `data-range`
- compare the custom render with `GridItem`

### Fix

Put a `GridItem` inside `<GridCell asChild>`, or style those attributes so the active, selected, and disabled states remain visibly distinct.
