# DataGrid Troubleshooting

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
- pass the same source to `DataGrid`

## Interactive Content Inside Cells Breaks Keyboard Flow

### Symptom

Buttons or custom widgets inside a cell interfere with grid navigation.

### Likely Cause

The cell content now competes with the grid’s own focus model.

### How To Verify

- tab into the grid
- navigate with the keyboard
- test interaction inside the cell content

### Fix

- simplify cell content first
- reintroduce interactive controls only when the keyboard model still holds
