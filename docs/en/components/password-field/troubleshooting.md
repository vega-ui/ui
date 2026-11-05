# PasswordField Troubleshooting

## The Browser Does Not Offer To Save The Password

### Symptom

The browser does not offer to save the password, or a shown password appears in the autofill suggestions of other fields.

### Likely Cause

The password was shown when the form was submitted, so the input had `type='text'` and the browser treated it as a plain text field.

### How To Verify

- submit the form with the password shown and with it hidden, and compare

### Fix

Control `shown` and set it to `false` in the `onSubmit` handler of the form, before the browser collects the values.

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
