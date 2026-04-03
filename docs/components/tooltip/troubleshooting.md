# Tooltip Troubleshooting

## Tooltip Content Feels Too Important

### Symptom

Users need the tooltip to complete the task correctly.

### Likely Cause

Required instructions were placed in a supplemental component.

### How To Verify

- Hide the tooltip and check whether the control is still understandable.

### Fix

- Move essential instructions into visible UI.

## Tooltip Inside Overlay Feels Unstable

### Symptom

Tooltip timing or placement behaves oddly inside a dialog or other overlay.

### Likely Cause

The tooltip was only tested in isolation.

### How To Verify

- Render it inside the real overlay flow.

### Fix

- Retest the exact stack and simplify where necessary.

## Tooltip Should Probably Be A Popover

### Symptom

The content keeps growing and starts to need actions, form controls, or multiple paragraphs.

### Likely Cause

Tooltip is being used for a richer contextual overlay than it was designed for.

### How To Verify

- Check whether the content includes controls or task instructions.
- Compare the experience with `Popover`.

### Fix

- Switch to `Popover` for richer contextual content.
- Keep tooltip content short and purely supplemental.
