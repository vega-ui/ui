# PhoneField Troubleshooting

## Country Change Does Not Change The Number

### Symptom

Changing `country` from the parent leaves the number and the text of the input as they were.

### Likely Cause

`country` is a hint: it is the country shown in `PhoneFieldSelect` and the calling code a strict mask starts an empty field with. A change of it from outside never changes the number and calls no `onChangeValue`.

### How To Verify

- switch countries with an existing number, from the parent and in `PhoneFieldSelect`
- compare the `onChangeValue` calls

### Fix

- let the user pick the country in `PhoneFieldSelect`: a pick writes its calling code into the input and reports `onChangeCountry` and `onChangeValue`
- set `value` yourself when a change from outside should change the number

## Paste Behavior Feels Too Strict

### Symptom

Users paste a number, but the field rejects or mangles the input unexpectedly.

### Likely Cause

`strictMask` is too strict for the real input source.

### How To Verify

- test paste flows with realistic phone strings

### Fix

- consider `strictMask={false}` for lenient flows
- read `value`: it is the number in E.164 in both modes

## Country Select Looks Correct But Form Semantics Are Weak

### Symptom

The UI works visually, but the country selection is missing from normal form flows.

### Likely Cause

`SelectHiddenSelect` is missing inside `PhoneFieldSelect`.

### How To Verify

- inspect native form submission behavior

### Fix

- render `SelectHiddenSelect` inside `PhoneFieldSelect`
