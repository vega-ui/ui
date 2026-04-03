# SegmentedControl Troubleshooting

## Indicator Does Not Match The Selected Item

### Symptom

The highlighted indicator appears offset or sized incorrectly.

### Likely Cause

Custom layout or dynamic content changed item geometry in a way that was not tested with the indicator measurement model.

### How To Verify

- Test the control with realistic labels and container width.
- Check whether item widths or layout wrappers change after render.

### Fix

- Keep item layout stable.
- Retest custom widths, separators, and dynamic label changes.

## Control Looks Right But Does Not Behave Like A Radio Group

### Symptom

The segmented control changes visually, but native form or radio-group behavior is missing.

### Likely Cause

`SegmentedControlItemHiddenInput` was omitted or `name` was not set correctly.

### How To Verify

- Inspect the rendered inputs.
- Confirm that all items share the same `name`.

### Fix

- Render `SegmentedControlItemHiddenInput` inside each item.
- Keep the required `name` consistent across the group.

## Labels Feel Too Uneven

### Symptom

The control becomes visually unbalanced because some segments are much longer than others.

### Likely Cause

Segmented control is being used for labels with very different lengths or too many options.

### How To Verify

- Compare the visible label lengths side by side.
- Check whether the control still reads as one balanced choice group.

### Fix

- Shorten labels where possible.
- Switch to `Radio` or `Select` when the option set is no longer a good segmented-control fit.
