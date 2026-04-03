# Collapsible Troubleshooting

## Open State And Hidden State Feel Out Of Sync

### Symptom

Parent logic observes `open`, but the content is still visually transitioning or already hidden.

### Likely Cause

The feature treats `onChangeOpen` and `onChangeHidden` as the same lifecycle signal.

### How To Verify

- Log both callbacks during open and close.
- Compare the visual state with the callback timing.

### Fix

- Use `onChangeOpen` for state ownership.
- Use `onChangeHidden` only when layout or measurement depends on actual visibility.

## Custom Trigger Stops Behaving Like A Trigger

### Symptom

The disclosure renders, but keyboard behavior or semantics become unclear after custom composition.

### Likely Cause

`asChild` was used with an element that does not preserve trigger-like behavior.

### How To Verify

- Inspect the rendered trigger element.
- Test click and keyboard behavior, not just visual rendering.

### Fix

- Use a semantically appropriate child with `asChild`.
- Keep the trigger clearly interactive and keyboard reachable.

## Dynamic Content Height Clips Or Jumps

### Symptom

Expanded content clips, jumps, or animates strangely as inner content changes.

### Likely Cause

The section was only tested with short static content and not with the real dynamic layout.

### How To Verify

- Expand the section with realistic asynchronous or variable-height content.
- Check the transition during content growth and collapse.

### Fix

- Test with representative content.
- Keep height-transition assumptions conservative when the content is highly dynamic.
