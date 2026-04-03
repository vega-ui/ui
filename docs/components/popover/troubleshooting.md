# Popover Troubleshooting

## Popover Feels Too Heavy

### Symptom

The content technically works, but the overlay feels too big or modal.

### Likely Cause

The task belongs in `Dialog` or `Drawer`.

### How To Verify

- Review content length and task criticality.

### Fix

- Switch to a stronger overlay when the flow is no longer lightweight.

## Placement Breaks In Scroll Containers

### Symptom

The floating layer clips or feels detached from the trigger.

### Likely Cause

The real container or overlay stack was not tested.

### How To Verify

- Place the popover inside the real scrolling or clipped layout.

### Fix

- Retest the exact production container structure.

## Nested Popovers Feel Confusing

### Symptom

Open state and focus order become unclear with popovers inside popovers.

### Likely Cause

Nested floating layers are being used for a task that needs a stronger pattern.

### How To Verify

- Test nested open and close behavior.

### Fix

- Simplify the flow or switch to a larger overlay pattern.

## Trigger Meaning Is Unclear Without The Popover

### Symptom

Users only understand the trigger after the popover opens.

### Likely Cause

The trigger relies on floating content as its primary label or explanation.

### How To Verify

- Hide the popover and inspect whether the trigger still makes sense.
- Test with keyboard and screen reader flows.

### Fix

- Give the trigger its own accessible meaning.
- Keep popover content supplemental and contextual.
