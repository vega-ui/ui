# Code Troubleshooting

## The Inline Code Snippet Wraps In Awkward Places

### Symptom

Long commands or paths wrap and become harder to scan.

### Likely Cause

`Code` is intended for inline snippets and allows wrapping to avoid overflow.

### How To Verify

- inspect the content length
- check whether the snippet would read better as a block

### Fix

Use a dedicated multiline code example when the content stops being truly inline.

## The Snippet Looks Like A Status Pill Instead Of Code

### Symptom

The UI treats code snippets as if they were badges or tags.

### Likely Cause

`Code` is being reused for generic highlighted labels.

### How To Verify

- inspect whether the content is actually a command, token, or identifier

### Fix

Switch to `Badge`, `Text`, or another semantic primitive when the content is not code.

## Custom Overrides Reduce Contrast

### Symptom

Inline code becomes hard to read against its background.

### Likely Cause

Theme or local overrides changed the fill or text color pairing.

### How To Verify

- compare the rendered foreground and background tokens
- test readability in both light and dark themes

### Fix

Prefer the default `--fills-secondary` and `--label-secondary` pairing or retest contrast when overriding them.
