# Avatar Troubleshooting

## Avatar Breaks When The Image Fails

### Symptom

The avatar becomes empty or visually broken when the image is unavailable.

### Likely Cause

No fallback content was provided.

### How To Verify

- Simulate a missing or slow image.
- Inspect whether `AvatarFallback` or `AvatarIcon` exists.

### Fix

- Pair `AvatarImage` with fallback content.

## Fallback Initials Overflow

### Symptom

Initials look cramped or clipped in smaller avatar sizes.

### Likely Cause

Fallback text is too long for the selected size.

### How To Verify

- Test the avatar at the smallest supported sizes.
- Compare one- and two-character fallbacks.

### Fix

- Shorten fallback text.
- Increase the avatar size if the content must remain larger.
