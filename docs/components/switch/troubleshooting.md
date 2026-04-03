# Switch Troubleshooting

## Switch Looks Right But Does Not Submit

### Symptom

The toggle changes visually, but the value never appears in native form submission.

### Likely Cause

`SwitchHiddenInput` was omitted.

### How To Verify

- Inspect the rendered markup.
- Submit the form and check whether the switch value is present.

### Fix

- Render `SwitchHiddenInput` inside the switch root.

## Label Reads Like An Action Instead Of A State

### Symptom

Users cannot tell whether the switch controls a feature state or an action.

### Likely Cause

The visible text was written as "Turn on" or "Enable now" instead of naming the setting.

### How To Verify

- Read the label without seeing the current checked state.
- Check whether the feature meaning is still obvious.

### Fix

- Rewrite the label to describe the controlled setting, such as "Incident alerts".

## Switch Was Used For The Wrong Product Model

### Symptom

The UI technically works, but it feels wrong because the choice is really exclusive or multi-select.

### Likely Cause

`Switch` was chosen for a selection model better served by `Radio`, `Checkbox`, or `SegmentedControl`.

### How To Verify

- Check whether the setting is binary, exclusive, or independently selectable.
- Compare the surrounding flow with the intended choice model.

### Fix

- Use `Radio` for exclusive choice sets.
- Use `Checkbox` for independent selectable options.
- Use `SegmentedControl` for always-visible exclusive options.
