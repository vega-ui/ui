# Calendar Troubleshooting

## Selection Value Shape Feels Wrong

### Symptom

The component renders, but the integration state shape does not match expectations.

### Likely Cause

`selection` mode was changed without updating the parent value model.

### How To Verify

- inspect `selection`
- inspect the current `value` shape

### Fix

- treat `single`, `multiple`, and `range` as different value contracts

## Disabled Dates Still Feel Selectable

### Symptom

Users can still navigate to or interact with dates that should be unavailable.

### Likely Cause

Custom day rendering did not preserve disabled or excluded behavior.

### How To Verify

- compare custom cells with the default picker behavior
- test both pointer and keyboard interaction

### Fix

- preserve disabled and excluded state handling in custom day items

## Custom Calendar Content Breaks Navigation

### Symptom

Switching between day, month, and year views becomes inconsistent.

### Likely Cause

Child picker families were customized as if they were unrelated components.

### How To Verify

- test view switching in the real customized composition

### Fix

- return to the standard `CalendarHeader` plus `CalendarContent` structure first
- reintroduce custom parts incrementally
