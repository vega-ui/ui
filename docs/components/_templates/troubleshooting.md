# ComponentName Troubleshooting

Use this file for components with predictable failure modes during integration.

## Troubleshooting Item Structure

Each issue should include:

- `Symptom`
- `Likely Cause`
- `How To Verify`
- `Fix`

## Example Issue

## Problem Title

### Symptom

Describe the visible failure.

### Likely Cause

Describe the most common integration mistake behind it.

### How To Verify

- check
- inspect

### Fix

Describe the minimal safe correction.

```tsx
// corrected composition or prop usage
```

## Guidance

- Organize by real symptoms, not by internal implementation areas.
- Prefer fast diagnosis paths over long explanations.
- Focus on issues consumers can actually hit in product code.
