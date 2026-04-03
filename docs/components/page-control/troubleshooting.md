# PageControl Troubleshooting

## The Active Dot Does Not Match The Real Carousel Or Step

### Symptom

The visible active indicator and the actual content state drift apart.

### Likely Cause

The parent feature and `PageControl` are not sharing one source of truth.

### How To Verify

- compare the current content index with the rendered `active` item

### Fix

Drive both the content and `PageControl` from the same parent state.

## Progress Dots Animate But Nothing Advances

### Symptom

The progress fill animates, but the content never changes.

### Likely Cause

`PageControlProgress` was rendered without matching step-advance logic in the parent flow.

### How To Verify

- inspect whether the parent updates active state on animation end or autoplay tick

### Fix

Connect progress completion to the actual advancement logic or switch to static items.

## Long Sequences Feel Unreadable

### Symptom

The row of indicators becomes hard to count or understand.

### Likely Cause

`PageControl` is being used for too many items.

### How To Verify

- count the visible items and compare with actual user comprehension

### Fix

Switch to `Pagination`, a labeled stepper, or another richer navigation pattern.
