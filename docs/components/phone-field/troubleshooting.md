# PhoneField Troubleshooting

## Country Change Does Not Reformat The Number Correctly

### Symptom

Changing the selected country leaves the visible number in an invalid or stale format.

### Likely Cause

Country state and validation logic are not synchronized in the parent flow.

### How To Verify

- switch countries with an existing input value
- compare displayed and stored value behavior

### Fix

- treat country and value as one integration flow
- normalize after country changes

## Paste Behavior Feels Too Strict

### Symptom

Users paste a number, but the field rejects or mangles the input unexpectedly.

### Likely Cause

`strictMask` is too strict for the real input source.

### How To Verify

- test paste flows with realistic phone strings

### Fix

- consider `strictMask={false}` for lenient flows
- normalize the canonical value after input

## Country Select Looks Correct But Form Semantics Are Weak

### Symptom

The UI works visually, but the country selection is missing from normal form flows.

### Likely Cause

`PhoneFieldSelectHiddenSelect` is missing.

### How To Verify

- inspect native form submission behavior

### Fix

- render `PhoneFieldSelectHiddenSelect` inside the select composition
