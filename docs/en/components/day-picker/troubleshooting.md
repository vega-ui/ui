# DayPicker Troubleshooting

## The Rendered Month Does Not Match The Expected Period

### Symptom

The UI shows a month grid, but it is not the period users expected.

### Likely Cause

The picker shows the month of the focused day, and the focused day is not the one you expect: `focusedDate` is controlled but not updated from `onChangeFocusedDate`, the code still passes the removed `month` prop, or parts get different `calendar` systems.

### How To Verify

- read `useDayPickerContext().month` and log the dates passed to `onChangeFocusedDate`
- check that every part gets the same `calendar`

### Fix

Pass the day to show as `defaultFocusedDate`, or control `focusedDate` and update it from `onChangeFocusedDate`. Give `DayPickerLayout` its own `month` only when it renders a fixed month next to others.

## Custom Day Rendering Loses Selection Or Focus Clarity

### Symptom

Dates still work logically, but users cannot tell which day is active or selected.

### Likely Cause

Custom rendering discarded important visual state.

### How To Verify

- test focus, selected, disabled, and excluded states in the custom layout

### Fix

Preserve the item state affordances from the default day item pattern.

## Scrollable Month Paging Feels Fragile

### Symptom

Swiping between months works sometimes, but period labels or focus feel unstable.

### Likely Cause

Scroller period mapping and rendered month content are not synchronized tightly enough.

### How To Verify

- log `onChangeFocusedDate` and `onChangePeriod` while paging

### Fix

Derive labels from the focused day (`onChangeFocusedDate`) or the month reported by `onChangePeriod` instead of computing them from the scroller index.

## The Grid Is Empty On The Server Or Shows The Wrong Month After Hydration

### Symptom

The server HTML has no days, or a prerendered page first shows the build month and then jumps.

### Likely Cause

Without `today`, the picker reads the date of the device only after hydration, so the server and the first client render have no today. With no `defaultFocusedDate` and no selection there is no month to show yet.

### How To Verify

- view the server HTML and look for grid cells
- check whether `today`, `defaultFocusedDate`, `focusedDate`, or a selection is passed

### Fix

Pass `today` (for example from the request, in the user's time zone) or `defaultFocusedDate` when the month must be rendered on the server; otherwise accept that days appear after hydration.

## Days Stay Enabled Inside A Disabled Fieldset

### Symptom

A `<fieldset disabled>` disables the inputs around the picker, but its days can still be focused and selected.

### Likely Cause

`DayPicker` is a grid of buttons, not a form control, and does not follow `<fieldset disabled>`.

### How To Verify

- disable the fieldset and press Tab into the grid

### Fix

Disable the days yourself: pass `disabledDates={() => true}` while the fieldset is disabled.
