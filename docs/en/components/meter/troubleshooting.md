# Meter Troubleshooting

## Meter Should Probably Be A Progress Bar

### Symptom

The value really represents ongoing completion rather than a bounded measurement.

### Likely Cause

`Meter` was chosen for a temporal progress state.

### How To Verify

- Ask whether the number represents completion over time.

### Fix

- Switch to `Progress` for task completion.

## Threshold Colors Feel Arbitrary

### Symptom

The bar changes color, but users do not understand why.

### Likely Cause

`low`, `high`, and `optimum` were configured without enough surrounding explanation.

### How To Verify

- Hide the labels and inspect whether the threshold meaning is still obvious.

### Fix

- Explain the measurement range in nearby text.
- Adjust threshold values so they reflect real product meaning.

## Meter Shows A Value But Not Its Context

### Symptom

Users see the bar but do not know what is being measured.

### Likely Cause

The component was rendered without explanatory surrounding copy.

### How To Verify

- Remove nearby headings and inspect whether the meaning is still clear.

### Fix

- Add clear nearby text for the subject and range.
