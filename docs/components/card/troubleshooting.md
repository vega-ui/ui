# Card Troubleshooting

## Card Content Feels Unstructured

### Symptom

The surface exists, but users still cannot scan the content clearly.

### Likely Cause

The card is being used as a generic wrapper without internal heading or spacing structure.

### How To Verify

- Hide the card border mentally and inspect the remaining content hierarchy.

### Fix

- Add headings, spacing, and clearer inner layout.
- Treat the card as grouping, not as the whole information architecture.

## Transparent Card Disappears Into The Background

### Symptom

The grouped surface loses separation and feels visually flat.

### Likely Cause

`appearance='transparent'` is used on a low-contrast or noisy background.

### How To Verify

- Compare the transparent card against the real parent surface.

### Fix

- Switch back to `outline`.
- Strengthen the parent surface contrast or content hierarchy.
