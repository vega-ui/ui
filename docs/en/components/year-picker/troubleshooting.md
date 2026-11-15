# YearPicker Troubleshooting

## The Visible Year Range Does Not Match The Intended Period

### Symptom

The grid renders, but the year range shown is not what the product expected.

### Likely Cause

The focused year, the layout `start` / `offset`, or the `period` of the picker are out of sync.

### How To Verify

- log `onChangeFocusedDate` and compare it with the layout `start`

### Fix

Pass `YYYY-MM-DD` years, keep `period` equal to `rows × cols`, and let `YearPickerScrollerLayout` derive `start` and `offset` from the first focused year. To begin a static page elsewhere, pass `start` to `YearPickerLayout`.

## Large Year Paging Feels Fragile

### Symptom

Paging works, but focus or visible context feels unstable across year ranges.

### Likely Cause

The page is driven from outside the focused year, for example by feeding `onChangePeriod` back into the picker.

### How To Verify

- log `onChangeFocusedDate` while paging
- compare them with the rendered range labels

### Fix

Let the focused year drive the page: control `focusedDate` if needed, keep `period` equal to the layout's page size, and use `onChangePeriod` only for range labels.

## Custom Layouts Break The Sense Of Calendar Continuity

### Symptom

The year grid still renders, but it no longer feels like a coherent picker.

### Likely Cause

Too much of the standard grid structure was replaced without preserving year-ordering cues.

### How To Verify

- review the custom layout without developer context

### Fix

Preserve explicit year ordering and reuse the helper-generated grids where possible.

## The Picker Renders No Years On The Server

### Symptom

The server HTML has an empty grid, and the years appear only after hydration.

### Likely Cause

Nothing tells the picker which page to show: no `focusedDate`, `defaultFocusedDate`, selection, or `today`. The date of the device is read only after hydration, so the server and the client render the same markup.

### How To Verify

- load the page with JavaScript disabled, or inspect the server HTML

### Fix

Pass `today` (for example, computed on the server in the user's time zone) or `defaultFocusedDate`.

## The Picker Stays Enabled Inside A Disabled Fieldset

### Symptom

Inside `<fieldset disabled>`, the years can still be focused and selected.

### Likely Cause

The picker is a grid, not a native form control, so it does not follow the `disabled` state of a fieldset.

### How To Verify

- disable the fieldset and press Tab into the grid

### Fix

Disable the years yourself while the fieldset is disabled, for example with `disabledDates={() => true}`.
