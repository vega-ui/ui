# TimeField Troubleshooting

## The Field Accepts A Format Different From Product Expectations

### Symptom

Users type a time, but the accepted pattern does not match the UI or backend expectations.

### Likely Cause

The chosen `format` does not match the integration contract.

### How To Verify

- inspect the `format`, `min`, and `max` props
- compare them with the expected submission format

### Fix

Set one explicit format and keep all bounds and placeholders aligned with it.

## A Time That Looks Valid Is Still Rejected

### Symptom

The user enters a valid-looking time string, but the form still rejects it.

### Likely Cause

`min` or `max` constraints exclude the value.

### How To Verify

- compare the typed value with the configured bounds

### Fix

Adjust bounds or clarify the allowed time window in visible helper copy.

## Partial Values Are Being Treated As Final

### Symptom

The app reacts to incomplete input like `1_` or `12:` as if it were a complete time.

### Likely Cause

Parent logic validates too early.

### How To Verify

- watch how state changes while typing each segment

### Fix

Delay final validation until the input contains a complete time value.
