# Spinner Troubleshooting

## Users Cannot Tell What Is Loading

### Symptom

The spinner is visible, but users do not know which operation is pending.

### Likely Cause

The spinner was rendered without contextual text or surrounding structure.

### How To Verify

- view the UI without knowing the implementation details
- check whether the pending operation is obvious from nearby content

### Fix

Pair the spinner with status text or place it inside an unmistakable pending surface.

## The Spinner Feels Too Large Or Too Small

### Symptom

The loading indicator looks visually unbalanced in its container.

### Likely Cause

The numeric `size` does not match the surrounding control or surface.

### How To Verify

- compare the current size with adjacent text and controls

### Fix

Use smaller sizes for inline and button contexts, and larger sizes for centered section loaders.

## Motion Alone Is Carrying The Loading State

### Symptom

Users who miss or cannot rely on motion do not get enough status information.

### Likely Cause

The spinner is the only pending-state signal.

### How To Verify

- remove motion mentally and check whether any status text remains

### Fix

Add nearby status text or a higher-level live region for meaningful asynchronous operations.
