# PasswordField Troubleshooting

## Clicking The Toggle Moves Focus Unexpectedly

### Symptom

After toggling visibility, focus does not stay where users expect.

### Likely Cause

Custom composition replaced the shipped toggle flow that returns focus to the input.

### How To Verify

- test with the default toggle composition
- compare focus behavior after each click

### Fix

Keep `PasswordFieldToggleIconButton` in the composition or replicate its focus-restoration behavior.

## Autofill Behaves Differently Across Browsers

### Symptom

Autofill works in one browser but not another.

### Likely Cause

Password managers and native autofill interpret password fields differently, especially for new-password vs current-password flows.

### How To Verify

- test the real browser flow with the intended `autoComplete` value

### Fix

Use the correct autocomplete token and test in real target browsers.

## Strength Hints Do Not Match Validation

### Symptom

The UI claims the password is strong, but backend validation still rejects it.

### Likely Cause

Visual strength scoring and actual password policy are different systems.

### How To Verify

- compare frontend strength hints with backend policy rules

### Fix

Document policy separately and treat strength hints as advisory, not authoritative.
