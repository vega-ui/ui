# VisuallyHidden Troubleshooting

## The Hidden Text Sounds Wrong Or Outdated

### Symptom

Assistive technology users receive copy that no longer matches the visible UI.

### Likely Cause

The hidden text was not updated together with the visible state.

### How To Verify

- compare the hidden string with the current visible state transitions

### Fix

Drive the hidden content from the same state as the visible UI.

## The UI Still Feels Unclear Even With Hidden Text

### Symptom

Accessibility improves slightly, but the visible UI still feels weak or ambiguous.

### Likely Cause

`VisuallyHidden` is being used to compensate for poor visible labeling.

### How To Verify

- review the UI without assistive-only content

### Fix

Improve visible labels first and keep hidden text only where it adds real value.

## Hidden Content Unexpectedly Reappears

### Symptom

The supposedly hidden content becomes visible in certain layouts or overrides.

### Likely Cause

The visually hidden CSS was overridden.

### How To Verify

- inspect computed styles for clipping and positioning rules

### Fix

Keep the standard visually hidden CSS contract intact and avoid overriding it casually.
