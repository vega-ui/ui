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

The app knows the error, but `TextFieldInput` has no `aria-invalid='true'`; or the native constraint failed, but the user has not edited the field or tried to submit yet, so `:user-invalid` does not match.

### How To Verify

- confirm `aria-invalid='true'` appears on the input
- check `input.validity` and whether the input matches `:user-invalid`

### Fix

Set `aria-invalid` on `TextFieldInput` while your error is shown, or rely on a native constraint such as `required` or `pattern`.

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
