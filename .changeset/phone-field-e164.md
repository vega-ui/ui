---
"@vega-ui/react": major
---

`PhoneField` keeps the number in E.164 and the country as a hint.

- **Breaking:** `value`, `defaultValue` and `onChangeValue` of `PhoneField` are the number in E.164, like `"+79123456789"`, not the text of the input: the digits typed so far, `''` while the field has no digit after the calling code. The input shows the number formatted
- **Breaking:** `code`, `defaultCode` and `onChangeCode` of `PhoneField` are renamed to `country`, `defaultCountry` and `onChangeCountry`
- **Breaking:** a `country` changed by the parent or by a control of your own changes only the country shown in `PhoneFieldSelect` and the calling code a strict mask starts an empty field with; it no longer writes the calling code into the input and never changes the number. A country the user picks in `PhoneFieldSelect` writes its calling code and reports `onChangeValue` and `onChangeCountry` in the same pick, also when the parent controls `country`. A strict mask keeps the calling code the number starts with
- `PhoneField` takes `disabled`, which disables the input and the country select and leaves the number out of the form data
- A number too short or too long for its country makes `PhoneFieldInput` invalid through `setCustomValidity` with the message of the browser
- The country detected from a typed number is reported with the edit, also when the parent controls `value`; it used to change silently once the parent accepted the number
- A strict `PhoneField` keeps the first digit typed into an empty field: it used to drop it and show only the calling code
- A `required` `PhoneFieldInput` that shows only the calling code is invalid with the message of an empty field: the browser counted its text as filled
