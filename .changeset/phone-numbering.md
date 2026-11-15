---
'@vega-ui/i18n': minor
'@vega-ui/react': minor
---

`@vega-ui/i18n` has the `PhoneNumbering` adapter for phone numbers: `format` formats an international number as it is typed, `parse` reads its calling code, national number and country (a number without `+` as a number of a given country, without its national prefix), `getLength` checks its length against its country, and `getCallingCode` returns the calling code of a country. The default `phoneNumbering` runs on `libphonenumber-js/min`, now a dependency of `@vega-ui/i18n`. `PhoneCountry` is the ISO 3166-1 alpha-2 code of a country, the same as `CountryCode` of `libphonenumber-js`.

`PhoneField` reads, checks and formats numbers through the new `numbering` prop, `phoneNumbering` by default: another engine replaces libphonenumber with an object of the same four methods. `country`, `defaultCountry` and `onChangeCountry` are typed with `PhoneCountry` from `@vega-ui/i18n`.
