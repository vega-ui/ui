# AvatarStack Troubleshooting

## The Overlap Effect Looks Wrong

### Symptom

The avatars stack awkwardly or spacing jumps unexpectedly.

### Likely Cause

Items are not using consistent avatar sizing or are rendered outside `AvatarStackItem`.

### How To Verify

- inspect whether each child is an `AvatarStackItem`
- compare avatar sizes across the group

### Fix

Use `AvatarStackItem` for every child and keep size/variant consistent.

## The Group Is Hard To Understand

### Symptom

Users see a compact avatar cluster but cannot tell who or what it represents.

### Likely Cause

The surrounding context is missing.

### How To Verify

- read the UI without labels or adjacent text

### Fix

Add nearby text, counts, or headings that explain the group.

## Too Many People Are Rendered

### Symptom

The stack becomes visually noisy and unreadable.

### Likely Cause

The product is rendering every participant directly.

### How To Verify

- count the rendered items in real data scenarios

### Fix

Truncate the group and use a summary pattern such as `+N` at the app level.
