# Option Troubleshooting

## The Row Looks Selectable But Selection Does Not Persist

### Symptom

Clicking the row changes nothing durable in the UI.

### Likely Cause

`Option` was rendered without a parent selection model.

### How To Verify

- inspect whether `selected` is driven from parent state

### Fix

Move selection logic into the parent control and pass the resulting state into each option.

## Keyboard Focus Feels Inconsistent

### Symptom

Some options can be focused and others cannot, without a clear rule.

### Likely Cause

`focusable` is not coordinated with the parent navigation pattern.

### How To Verify

- inspect `tabIndex` behavior across all rendered options

### Fix

Use one coherent parent focus strategy and keep `focusable` consistent with it.

## Disabled Rows Still Need Explanation

### Symptom

Users can see a disabled option but do not know why it is unavailable.

### Likely Cause

The row is disabled visually without surrounding explanatory copy.

### How To Verify

- test the flow with a user who has not seen the business rule before

### Fix

Keep the row disabled and surface the reason nearby through helper text or explanatory copy.
