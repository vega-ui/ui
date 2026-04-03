# ButtonBase Troubleshooting

## The Button Submits A Form Unexpectedly

### Symptom

Clicking the action submits the surrounding form even though the UI intended a normal button.

### Likely Cause

`type` was not set explicitly and the browser default behaved like a submit action in that context.

### How To Verify

- render the button inside the real form
- click it without any submit-specific intent
- confirm whether the form submit handler fires

### Fix

Set `type='button'` for non-submit actions.

## The Action Looks Right But Keyboard Semantics Feel Wrong

### Symptom

The element looks like a button, but keyboard behavior or screen-reader output follows link semantics.

### Likely Cause

`asChild` rendered an anchor or router link, so the final element kept link semantics.

### How To Verify

- inspect the final DOM tag
- test keyboard activation with `Enter` and `Space`
- check screen-reader announcements

### Fix

Use a native button when the interaction is an action, not navigation.

## Icon-Only Content Is Not Announced Clearly

### Symptom

The action is visible, but assistive technology does not expose a meaningful name.

### Likely Cause

The button only contains an icon and no `aria-label` was provided.

### How To Verify

- inspect the accessible name in browser accessibility tools
- test the button with a screen reader

### Fix

Add an explicit `aria-label` or visible text content.
