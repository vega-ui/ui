# HelperText Troubleshooting

## The Field Still Feels Unlabeled

### Symptom

There is supporting copy, but users still cannot tell what the field is for.

### Likely Cause

`HelperText` was used without a clear visible label.

### How To Verify

- hide the helper copy mentally
- check whether one obvious label still remains

### Fix

Add `Label` or `FieldsetLegend` for the primary field name.

## Error Copy Shows But The Field Does Not Look Invalid

### Symptom

The text communicates an error, but the control itself remains visually normal.

### Likely Cause

Only `HelperText error` was set.

### How To Verify

- inspect the field props
- confirm whether the field wrapper or input has its invalid state applied

### Fix

Apply the error state to the field and keep `HelperText` as supporting copy.

## Helper Text Is Too Long To Scan

### Symptom

Users ignore the message because it reads like a paragraph.

### Likely Cause

The component is being used for explanatory content instead of concise guidance.

### How To Verify

- count the message length
- check whether the copy still fits a quick form-scanning flow

### Fix

Move longer explanations into `Text`, help content, or a separate explanatory section.
