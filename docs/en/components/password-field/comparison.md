# PasswordField Comparison

## Quick Decision Rule

Use `PasswordField` when users must enter a secret and may need to reveal it temporarily. Use `TextField` for generic text input.

## `PasswordField` vs `TextField`

Use `PasswordField` when:

- the value is a masked secret with reveal behavior

Use `TextField` when:

- the field is ordinary text input

## `PasswordField` vs `PinField`

Use `PasswordField` when:

- the secret is free-form

Use `PinField` when:

- the secret is a short fixed-length code

## Choose This Component When

- the value should be masked by default
- a reveal/hide affordance improves input review
- password-manager and browser secret-entry behavior matter

## Do Not Choose This Component When

- the field is not a secret
- the value is a fixed-length OTP or PIN
