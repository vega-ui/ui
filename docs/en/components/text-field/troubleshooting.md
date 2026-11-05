# TextField Troubleshooting

## The Field Renders But Form Submission Misses The Value

### Symptom

The wrapper is visible, but the submitted form does not include the expected value.

### Likely Cause

`name` or other form props were placed on `TextField` instead of `TextFieldInput`.

### How To Verify

- inspect the rendered markup
- confirm the native input has the expected form attributes

### Fix

Put form attributes on `TextFieldInput`.

## Error Styling Does Not Show Up

### Symptom

The input is invalid, but the field outline still looks neutral.

### Likely Cause

The wrapper did not receive `error`.

### How To Verify

- inspect the `TextField` props
- confirm `data-error='true'` appears on the wrapper

### Fix

Set `error` on `TextField` and keep invalid semantics on the input if needed.

## Prefix Or Suffix Content Makes The Field Hard To Use

### Symptom

The input area feels cramped or focus flow becomes awkward.

### Likely Cause

Too many controls were added around the input.

### How To Verify

- remove extra children temporarily
- compare the interaction against the plain field

### Fix

Reduce the composition to one clear input plus only the necessary adjacent actions.
