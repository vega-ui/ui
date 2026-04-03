# Checkbox Troubleshooting

## Checkbox Does Not Submit In A Native Form

### Symptom

The visible checkbox works, but the value never appears in form submission.

### Likely Cause

`CheckboxHiddenInput` was omitted.

### How To Verify

- Inspect the rendered markup.
- Submit the form and check whether the checkbox value is present.

### Fix

- Render `CheckboxHiddenInput` inside the checkbox root.

## Indeterminate State Behaves Like A Real Third Value

### Symptom

The UI suggests a third persisted business state when the product only needs partial selection feedback.

### Likely Cause

`indeterminate` is being treated as a stored final value instead of a visual aggregation state.

### How To Verify

- Check the backing data model.
- Compare parent and child selection behavior.

### Fix

- Treat `indeterminate` as visual partial state unless the product explicitly models a third value.

## Label And Indicator Feel Disconnected

### Symptom

Users click the text but the checkbox does not feel like one unified control.

### Likely Cause

The label structure or root composition was split into separate click targets.

### How To Verify

- Click the visible text as well as the indicator.
- Inspect whether the row is one `label`-like surface.

### Fix

- Keep indicator and text inside the same checkbox root.
- Use one coherent clickable row.
