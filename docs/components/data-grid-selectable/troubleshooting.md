# DataGridSelectable Troubleshooting

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

## Disabled Cells Still Affect Navigation

### Symptom

Focus or selection still moves through disabled cells.

### Likely Cause

`excludeDisabled` is not enabled, or the disabled map does not match the real keys.

### How To Verify

- inspect the `disabled` input
- test the same grid with `excludeDisabled`

### Fix

Pass the correct disabled keys and enable `excludeDisabled` when blocked cells should be skipped.

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
