# Sheet Troubleshooting

## Snap Points Feel Wrong

### Symptom

Intermediate sheet positions are awkward or unusable.

### Likely Cause

Snap points were chosen without testing real content height.

### How To Verify

- Test each snap point with realistic content.

### Fix

- Tune snap points to actual content and viewport behavior.

## Gesture And Keyboard Behavior Diverge

### Symptom

Touch behavior feels acceptable, but keyboard or dismissal behavior feels broken.

### Likely Cause

Only one interaction mode was tested.

### How To Verify

- Test touch-like drag behavior.
- Test keyboard open and close flows.

### Fix

- Validate all interaction modes together.

## Non-Closable Sheet Feels Trapping

### Symptom

Users do not understand how to finish or leave the flow.

### Likely Cause

`closable={false}` is being used without a clear completion path or strong explanatory copy.

### How To Verify

- Test the flow without prior product context.
- Check whether the next action is obvious at first glance.

### Fix

- Add explicit completion actions and clearer copy.
- Reconsider whether the sheet really needs to be non-closable.
