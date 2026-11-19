# Toggle Troubleshooting

## The Toggle Does Not Change

### Symptom

A click calls `onChangePressed`, but the toggle stays as it was.

### Likely Cause

`pressed` is set and the parent does not update it.

### How To Verify

- Check whether `pressed` is set without a state update in `onChangePressed`.

### Fix

- Update the state in `onChangePressed`, or use `defaultPressed` for an uncontrolled toggle.

## The Screen Reader Announces The Wrong State

### Symptom

The screen reader says "Unmute, pressed" or "Remove bold, not pressed".

### Likely Cause

The label changes with the state, so it repeats what `aria-pressed` already says.

### How To Verify

- Compare the `aria-label` or the text of the toggle in both states.

### Fix

- Keep one label that names what the toggle turns on, like "Mute" or "Bold", and let `aria-pressed` tell the state.

