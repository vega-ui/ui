# MonthPicker Troubleshooting

## The Month Labels Feel Inconsistent With The Rest Of The Date UI

### Symptom

Month names in the picker do not match other date surfaces.

### Likely Cause

Labels were hardcoded or formatted with a different locale strategy.

### How To Verify

- compare the picker labels with the rest of the app’s date formatting

### Fix

Use locale-driven formatting consistently and prefer the supplied layout/helper functions.

## Custom Grid Rendering Breaks Selection Clarity

### Symptom

Months can still be selected, but users cannot tell which month is active or selected.

### Likely Cause

Custom rendering discarded key selection-state affordances.

### How To Verify

- test selected, active, and disabled month states in the custom layout

### Fix

Preserve the state cues from the standard month item pattern.

## The Picker Feels Like A Generic Grid Instead Of A Calendar Primitive

### Symptom

The UI technically works, but it no longer reads as a coherent month selector.

### Likely Cause

The layout was customized beyond the point where month semantics stay obvious.

### How To Verify

- review the component without developer context

### Fix

Keep month labels and ordering explicit, and lean on the provided layout/helper APIs where possible.

## The Picker Renders No Months On The Server

### Symptom

The server HTML has an empty grid, and the months appear only after hydration.

### Likely Cause

Nothing tells the picker which year to show: no `focusedDate`, `defaultFocusedDate`, selection, or `today`. The date of the device is read only after hydration, so the server and the client render the same markup.

### How To Verify

- load the page with JavaScript disabled, or inspect the server HTML

### Fix

Pass `today` (for example, computed on the server in the user's time zone) or `defaultFocusedDate`.

## The Picker Stays Enabled Inside A Disabled Fieldset

### Symptom

Inside `<fieldset disabled>`, the months can still be focused and selected.

### Likely Cause

The picker is a grid, not a native form control, so it does not follow the `disabled` state of a fieldset.

### How To Verify

- disable the fieldset and press Tab into the grid

### Fix

Disable the months yourself while the fieldset is disabled, for example with `disabledDates={() => true}`.
