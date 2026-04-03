# Drawer Troubleshooting

## Actions Scroll Out Of View

### Symptom

The user cannot reach important actions easily in long drawer content.

### Likely Cause

The drawer body has no deliberate scroll strategy.

### How To Verify

- Test the drawer on shorter viewports.
- Add realistic long content.

### Fix

- Make the inner content scrollable.
- Keep key actions outside the scrolling body when possible.

## Nested Drawers Feel Unstable

### Symptom

Focus restoration or dismissal feels inconsistent with nested drawers.

### Likely Cause

Nested drawers were not tested as one overlay stack.

### How To Verify

- Open parent and nested drawers.
- Close them in reverse order.

### Fix

- Keep the standard part structure.
- Retest the full overlay stack.

## Drawer Feels Like The Wrong Pattern

### Symptom

The drawer works technically, but the UX feels overly large or indirect.

### Likely Cause

The flow is actually closer to a modal dialog or a small popover.

### How To Verify

- Review the amount of content and task criticality.

### Fix

- Switch to `Dialog` or `Popover` when they better match the job.
