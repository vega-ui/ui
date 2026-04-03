# TextField Comparison

## Quick Decision Rule

Use `TextField` for single-line text entry, especially when the field needs prefix or suffix composition. Use `TextArea` for multiline input and specialized fields when masking or advanced behavior is required.

## `TextField` vs `TextArea`

Use `TextField` when:

- the value is single-line

Use `TextArea` when:

- the content is intentionally multiline

## `TextField` vs `PasswordField`

Use `TextField` when:

- the input is generic text

Use `PasswordField` when:

- the field needs password masking and a visibility toggle

## `TextField` vs `NumberField`

Use `TextField` when:

- the value is free-form text, even if it includes digits

Use `NumberField` when:

- stepping, bounds, or numeric constraints matter

## `TextField` vs `PhoneField`

Use `TextField` when:

- the value is generic text and does not need country-aware phone behavior

Use `PhoneField` when:

- country selection, formatting, and canonical phone parsing belong to the same field contract

## Choose This Component When

- the control is single-line
- optional prefix or suffix composition is useful
- native input semantics are sufficient
- the field should stay generic rather than specialized

## Do Not Choose This Component When

- the field is multiline
- the interaction needs password, numeric, or segmented-code behavior
