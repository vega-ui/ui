# PinField Comparison

## Quick Decision Rule

Use `PinField` for short fixed-length codes that benefit from segmented display. Use `PasswordField` for secret strings and `TextField` for general text.

## `PinField` vs `PasswordField`

Use `PinField` when:

- the value is an OTP or short verification code

Use `PasswordField` when:

- the value is a longer secret string with reveal or hide behavior

## `PinField` vs `TextField`

Use `PinField` when:

- segmentation improves readability and entry

Use `TextField` when:

- the field is ordinary free-form input

## Choose This Component When

- code length is fixed and short
- segmented visual entry helps scanning and correction
- paste and auto-advance behavior are part of the expected UX

## Do Not Choose This Component When

- the value is free-form
- the field needs generic text editing rather than slot-based entry
