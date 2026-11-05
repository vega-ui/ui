# TextArea Troubleshooting

## The Field Feels Too Small For The Expected Content

### Symptom

Users need to enter long text, but the visible area feels cramped.

### Likely Cause

`TextArea` is being used with too little surrounding width or an undersized layout.

### How To Verify

- compare the field in a wider layout
- test with realistic content length

### Fix

Use `fullWidth`, increase available space, or reconsider the form layout.

## Error Styling Shows But Users Still Miss The Problem

### Symptom

The field outline is red, but users do not know what is wrong.

### Likely Cause

Only the visual error state was applied.

### How To Verify

- check whether a visible error message is present

### Fix

Pair the error state with specific `HelperText` or other validation copy.

## The Component Is Being Used For Short Single-Line Values

### Symptom

The field feels visually heavy for a simple value like name or URL.

### Likely Cause

`TextArea` was chosen where `TextField` would be more appropriate.

### How To Verify

- inspect typical user input length

### Fix

Switch to `TextField` for single-line values.
