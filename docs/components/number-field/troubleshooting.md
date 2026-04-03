# NumberField Troubleshooting

## The Value Jumps Unexpectedly While Typing

### Symptom

Users type a number, but the intermediate value feels unstable.

### Likely Cause

The input is being treated as a fully parsed number during intermediate text-editing states.

### How To Verify

- type partial values such as `-`, `1.`, or an empty string
- inspect how parent state reacts

### Fix

Allow intermediate string states in the input flow and parse only when appropriate.

## Step Buttons And Typed Value Drift Apart

### Symptom

The field can be typed and stepped, but both interaction modes do not stay in sync.

### Likely Cause

Custom parent logic bypasses the root’s own step/bounds model.

### How To Verify

- compare typed changes and button clicks on the same field

### Fix

Use one source of truth and let the root stepping behavior remain authoritative.

## Mouse Wheel Changes The Value Unexpectedly

### Symptom

Scrolling over the control changes the number when users only wanted to scroll the page.

### Likely Cause

`changeOnWheel` is enabled in a context where wheel changes are surprising.

### How To Verify

- focus the field and scroll over it

### Fix

Disable `changeOnWheel` for that integration or move the control away from heavy scrolling regions.
