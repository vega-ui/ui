# Slot Troubleshooting

## The Composition Throws At Runtime

### Symptom

Rendering fails with a `Slot` error about the child shape.

### Likely Cause

The child is not exactly one valid React element.

### How To Verify

- inspect what is actually passed as `children`

### Fix

Pass one valid React element, not plain text, arrays, or fragments with several nodes.

## The UI Looks Right But Semantics Are Wrong

### Symptom

The slotted element looks styled correctly, but behavior or accessibility is off.

### Likely Cause

The chosen child element has the wrong semantics for the task.

### How To Verify

- inspect the final rendered tag
- compare it with the intended semantic element

### Fix

Pick the correct child element and remember that `Slot` only changes rendering, not semantics.

## Event Behavior Feels Unexpected

### Symptom

Handlers from parent and child seem to conflict.

### Likely Cause

Prop merging created overlapping behavior.

### How To Verify

- inspect the merged props on the final element
- test both parent and child handlers in isolation

### Fix

Simplify the composition and make the ownership of interaction logic explicit.
