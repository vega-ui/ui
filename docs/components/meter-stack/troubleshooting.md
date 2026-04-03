# MeterStack Troubleshooting

## The Meter Looks Wrong Even Though The UI Renders

### Symptom

The segmented bar renders, but the proportions do not match the intended metric.

### Likely Cause

Segment values or root `max` do not reflect the real data model.

### How To Verify

- add up the segment values
- compare them with the root `value` and `max`

### Fix

Normalize segment values in the parent feature before rendering the stack.

## Tiny Segments Are Impossible To Understand

### Symptom

Some segments are visible but too small to interpret.

### Likely Cause

Too many small parts were encoded without external labels.

### How To Verify

- test the component at real production widths

### Fix

Reduce segment count, widen the component, or add labels/tooltips outside the meter.

## Color Differences Are Carrying All The Meaning

### Symptom

The meter is only understandable if users can perceive the color mapping perfectly.

### Likely Cause

There is no adjacent explanatory copy or legend.

### How To Verify

- remove color mentally and check whether the structure still makes sense

### Fix

Add labels or nearby text that explain the segment categories.
