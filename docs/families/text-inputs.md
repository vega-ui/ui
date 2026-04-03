# Text Inputs

Use this page when the user types content and the main decision is whether the field should stay generic, become multiline, or adopt a specialized entry contract.

## Quick Decision Rules

- Use [TextField](../components/text-field/) for generic single-line text.
- Use [TextArea](../components/text-area/) for multiline prose.
- Use [PasswordField](../components/password-field/) for masked secret entry.
- Use [NumberField](../components/number-field/) for exact numeric values with stepping or bounds.
- Use [PhoneField](../components/phone-field/) for country-aware phone entry.
- Use [PinField](../components/pin-field/) for short fixed-length verification codes.

## By Value Model

- Generic single-line text: [TextField](../components/text-field/)
- Multiline text: [TextArea](../components/text-area/)
- Secret string: [PasswordField](../components/password-field/)
- Numeric quantity: [NumberField](../components/number-field/)
- Phone number: [PhoneField](../components/phone-field/)
- OTP or PIN code: [PinField](../components/pin-field/)

## Common Misclassifications

- Do not use [TextField](../components/text-field/) once masking, phone parsing, number stepping, or secret reveal become part of the field contract.
- Do not use [TextArea](../components/text-area/) for short single-line values.
- Do not use [NumberField](../components/number-field/) for identifiers or codes that only happen to contain digits.
- Do not use [PinField](../components/pin-field/) for free-form secrets or generic text.

## Supporting Pieces

- Use [Label](../components/label/) for one field label.
- Use [HelperText](../components/helper-text/) for short field-adjacent guidance.
- Use [Fieldset](../components/fieldset/) when several fields belong to one named group.
