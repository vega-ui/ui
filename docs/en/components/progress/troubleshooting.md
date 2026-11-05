# Progress Troubleshooting

## Progress Should Probably Be A Meter

### Symptom

The bar renders, but the value is really a score, quota, or capacity rather than task completion.

### Likely Cause

`Progress` was chosen for a descriptive measurement instead of a temporal completion model.

### How To Verify

- Ask whether the value changes toward completion over time.

### Fix

- Switch to `Meter` for bounded descriptive measurements.

## Users Do Not Know What Is Progressing

### Symptom

The bar is visible, but users cannot tell which task it represents.

### Likely Cause

The component was rendered without explanatory text context.

### How To Verify

- Hide nearby headings and inspect whether the progress meaning is still obvious.

### Fix

- Add nearby text that describes the running task.

## Determinate Progress Feels Untrustworthy

### Symptom

The percentages move strangely or stop matching the real operation.

### Likely Cause

The displayed values do not reflect real completion state.

### How To Verify

- Compare the shown value with actual task milestones.

### Fix

- Use real progress values.
- Switch to indeterminate mode when exact progress is unavailable.
