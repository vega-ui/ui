# PhoneField Comparison

## Quick Decision Rule

Choose `PhoneField` when the phone value and country selection should behave as one coordinated field.

## `PhoneField` vs `TextField`

Use `PhoneField` when:

- country-aware phone formatting matters
- the UX needs a mask or country picker

Use `TextField` when:

- the value is just plain text input

## `PhoneField` vs `Select` + `TextField`

Use `PhoneField` when:

- country selection and phone formatting should stay coupled
- one canonical phone-entry contract should be reused across the app

Use separate controls when:

- the product intentionally separates country selection from phone entry
- masking, validation, and country changes should not share one field lifecycle

## Choose This Component When

- mask behavior matters
- country selection changes validation or formatting
- the product treats phone entry as one field family

## Do Not Choose This Component When

- phone formatting is irrelevant
- a plain text field is enough
- country choice should be fully independent from the input
