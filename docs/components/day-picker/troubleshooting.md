# DayPicker Troubleshooting

## The Rendered Month Does Not Match The Expected Period

### Symptom

The UI shows a month grid, but it is not the period users expected.

### Likely Cause

The visible `month`, the `calendar` system, or the scroller's `defaultMonth` are not aligned.

### How To Verify

- inspect the effective `month`, `calendar`, and the value passed to `onChangePeriod`

### Fix

Use one `YYYY-MM-DD` month as the source of truth and pass the same `calendar` to every part that renders it.

## Custom Day Rendering Loses Selection Or Focus Clarity

### Symptom

Dates still work logically, but users cannot tell which day is active or selected.

### Likely Cause

Custom rendering discarded important visual state.

### How To Verify

- test focus, selected, disabled, and excluded states in the custom layout

### Fix

Preserve the item state affordances from the default day item pattern.

## Scrollable Month Paging Feels Fragile

### Symptom

Swiping between months works sometimes, but period labels or focus feel unstable.

### Likely Cause

Scroller period mapping and rendered month content are not synchronized tightly enough.

### How To Verify

- log the month passed to `onChangePeriod` while paging

### Fix

Derive labels from the month reported by `onChangePeriod` instead of computing it from the scroller index.
