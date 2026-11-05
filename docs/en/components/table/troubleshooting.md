# Table Troubleshooting

## Table Should Probably Be A DataGrid

### Symptom

The feature keeps accumulating selection, inline editing, or cell-level interaction requirements.

### Likely Cause

`Table` is being used for a richer interaction model than it was designed for.

### How To Verify

- List the required interactions for rows and cells.
- Compare them with existing `DataGrid` family behavior.

### Fix

- Switch to `DataGrid` when grid-like interaction becomes central.
- Keep `Table` for semantic, mostly read-only layouts.

## Columns Clip On Small Screens

### Symptom

The table becomes hard to read or columns disappear on narrower layouts.

### Likely Cause

The consumer layout does not provide an explicit overflow or responsive strategy.

### How To Verify

- Test the real production container at smaller widths.
- Check whether the table has a scroll wrapper or alternate mobile layout.

### Fix

- Add a consumer-owned overflow wrapper or responsive fallback.
- Reduce unnecessary column count for narrow contexts.

## Alignment Looks Wrong Across Cells

### Symptom

Heading and data cells do not line up or numeric values feel visually inconsistent.

### Likely Cause

`dataAlign` and edge-padding choices do not match the intended content model.

### How To Verify

- Compare heading and data alignment in the same column.
- Check first and last cell padding with `edgePadded` on and off.

### Fix

- Use one consistent `dataAlign` strategy for the table.
- Adjust edge padding only when the surrounding layout already provides the needed spacing.
