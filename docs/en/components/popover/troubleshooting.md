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

The floating layer feels detached from the trigger.

### Likely Cause

The real container or overlay stack was not tested.

### How To Verify

- Place the popover inside the real scrolling or clipped layout.

### Fix

- Retest the exact production container structure.
- `PopoverContent` renders in the top layer, so `overflow` and `z-index` on ancestors do not clip or cover it; look at placement instead.

## Popover Opens In The Middle Of The Screen

### Symptom

The content opens centered in the viewport instead of next to its trigger.

### Likely Cause

The browser does not support CSS anchor positioning: Chrome and Edge before 129, Safari before 26, Firefox before 147. The popover still opens, closes and moves the focus, but it has nothing to position against.

### How To Verify

- Check `CSS.supports('anchor-name', '--a')` in the browser.

### Fix

- Ask the users to update the browser; the library has no script fallback for positioning.

## Popover Is Misplaced In Firefox Inside Another Text Direction

### Symptom

In Firefox, the content opens away from its trigger or off screen.

### Likely Cause

A Firefox bug: it positions an anchored element wrongly when its text direction differs from the page, such as a `dir="rtl"` block on a left-to-right page. Chrome and Safari place it correctly.

### How To Verify

- Set the same `dir` on `<html>` as on the block around the popover and check that the popover moves next to its trigger.

### Fix

- Set `dir` on `<html>` instead of a block when the whole page uses one direction.

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

## Popover Does Not Open From A Custom Trigger

### Symptom

Clicking a custom `PopoverTrigger asChild` child does nothing.

### Likely Cause

The child does not render a `<button>`, so the native `popovertarget` has no effect.

### How To Verify

- Inspect the trigger element and check that it is a `<button>` with `popovertarget`.

### Fix

- Use `Button` or another component that renders a `<button>` as the `asChild` child.
