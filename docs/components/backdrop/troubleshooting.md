# Backdrop Troubleshooting

## The Page Dims But The Overlay Still Feels Broken

### Symptom

The screen is dimmed, but focus or dismissal behavior feels incomplete.

### Likely Cause

`Backdrop` was used without a complete foreground overlay contract.

### How To Verify

- tab through the UI
- test close behavior from keyboard and pointer

### Fix

Pair `Backdrop` with a foreground overlay that manages focus, labeling, and dismissal.

## Scroll Lock Feels Wrong On Mobile

### Symptom

The overlay opens, but page scroll behavior becomes awkward.

### Likely Cause

`lockScroll` behavior was not tested in the real mobile flow.

### How To Verify

- reproduce the interaction on the actual target device or simulator

### Fix

Test `lockScroll` in the real integration and disable it when the product flow needs background scroll.

## The Foreground Layer Appears Behind The Backdrop

### Symptom

The overlay content renders, but it is visually obscured.

### Likely Cause

Layering or z-index coordination is incorrect.

### How To Verify

- inspect computed stacking contexts for both backdrop and foreground content

### Fix

Treat backdrop and foreground as one coordinated overlay stack instead of unrelated layers.
