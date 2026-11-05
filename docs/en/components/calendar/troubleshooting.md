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

A custom day template renders its own element instead of `CalendarDay`, so disabled and excluded behavior is lost.

### How To Verify

- compare the custom template with a plain `<CalendarDay />`
- test both pointer and keyboard interaction

### Fix

- render the custom content inside `CalendarDay`, which keeps disabled and excluded state handling

## Custom Calendar Content Breaks Navigation

### Symptom

Switching between day, month, and year views becomes inconsistent.

### Likely Cause

Views or header controls were rebuilt as if they were unrelated components.

### How To Verify

- test view switching in the real customized composition

### Fix

- return to the standard `CalendarHeader` plus `CalendarContent` structure first
- reintroduce custom parts incrementally
