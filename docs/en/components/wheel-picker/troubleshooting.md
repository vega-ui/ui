# WheelPicker Troubleshooting

## The Wheel Turns Back After A Swipe

### Symptom

The column turns to another option, then back to the old one.

### Likely Cause

`value` is set and the parent does not update it in `onChangeValue`.

### How To Verify

- Check whether `value` is set without a state update in `onChangeValue`.

### Fix

- Update the state in `onChangeValue`, or use `defaultValue` for an uncontrolled column.

## The Column Stays On A Disabled Option

### Symptom

After a change elsewhere, like a switch to February, the day column shows the 31st dimmed.

### Likely Cause

The parent keeps a value that became disabled. A column moves off a disabled option after a scroll, but it does not change a value the parent selected.

### How To Verify

- Check the controlled `value` against the `disabled` options after the change.

### Fix

- Clamp the value in the parent when the options change, like the day to the length of the month.

## `onChangeValue` Does Not Run While The Wheel Turns

### Symptom

The value updates only when the wheel stops.

### Likely Cause

This is the design: a column reports the option a scroll stops at, not every row it passes.

### How To Verify

- Turn the column with ArrowUp: the value updates at once.

### Fix

- Show the value from `onChangeValue`; for a live preview while the wheel turns, use the stopped value, since the rows in between are not chosen.

## Typeahead Does Not Find An Option

### Symptom

Typing the start of an option does not select it.

### Likely Cause

The option shows an icon or a component without text, so typing matches its raw `value` instead of what the user sees.

### How To Verify

- Check the `aria-valuetext` of the column on that option: it is the raw `value`.

### Fix

- Give the option a `label` with its text.
