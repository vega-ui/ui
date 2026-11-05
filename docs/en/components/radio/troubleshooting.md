# Radio Troubleshooting

## Several Radios Can Be Checked At Once

### Symptom

Multiple options appear selected even though the UI is supposed to allow only one choice.

### Likely Cause

The radios do not share the same native `name`.

### How To Verify

- Inspect the rendered `name` attribute.
- Check whether all options in the group use the same value.

### Fix

- Give all related radios the same `name`.
- Keep unrelated groups separated by different names.

## Only The Tiny Control Feels Clickable

### Symptom

Users miss the label row because only the radio circle feels interactive.

### Likely Cause

The visible text is not wrapped into the same clickable label structure.

### How To Verify

- Hover and click on the text next to the control.
- Inspect whether the label wraps both the radio and the text.

### Fix

- Use a wrapping `label` for the control and its text.
- Keep the full row clickable when possible.

## Radio Was Used For The Wrong Selection Model

### Symptom

The UI works technically, but users expect to select multiple items or toggle one setting independently.

### Likely Cause

`Radio` was chosen where `Checkbox` or `Switch` would better match the product model.

### How To Verify

- Check whether the choice is exclusive, independent, or binary.
- Compare the flow with other selection controls in the system.

### Fix

- Use `Checkbox` for independent choices.
- Use `Switch` for one immediate binary setting.
