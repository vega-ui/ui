# Alert Troubleshooting

## Alert Feels Too Large For The Message

### Symptom

The content is so short that the alert feels visually heavy.

### Likely Cause

`Alert` is being used where a smaller `Badge` or inline text hint would be enough.

### How To Verify

- Check whether the content is only a tiny status label.

### Fix

- Switch to `Badge` or simpler inline text where appropriate.

## Alert Is Doing Layout Work Instead Of Feedback Work

### Symptom

The component starts to behave like a persistent content block instead of a feedback message.

### Likely Cause

`Alert` was chosen for grouped layout rather than status or feedback.

### How To Verify

- Remove the semantic message framing and inspect whether the surface is really just container layout.

### Fix

- Switch to `Card` for grouped content surfaces.
- Keep `Alert` for short semantic feedback.
