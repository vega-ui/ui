# DayPicker Troubleshooting

## The Rendered Month Does Not Match The Expected Period

### Symptom

The UI shows a month grid, but it is not the period users expected.

### Likely Cause

Visible `year` / `month` or scroller offset logic is not aligned.

### How To Verify

- inspect the effective `year`, `month`, and current scroller index

### Fix

Use one clear period source of truth and keep any scroller mapping consistent with it.

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

- log the current scroller index and resolved year/month while paging

### Fix

Keep one authoritative date/index mapping and derive both labels and content from it.
