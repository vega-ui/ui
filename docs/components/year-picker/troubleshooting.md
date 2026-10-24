# YearPicker Troubleshooting

## The Visible Year Range Does Not Match The Intended Period

### Symptom

The grid renders, but the year range shown is not what the product expected.

### Likely Cause

Visible `year`, the layout `start` / `offset`, or the scroller `period` are out of sync.

### How To Verify

- inspect the effective visible year and any current scroller index

### Fix

Pass `YYYY-MM-DD` years, keep `period` equal to `rows × cols`, and let `YearPickerScrollerLayout` derive `start` and `offset`.

## Large Year Paging Feels Fragile

### Symptom

Paging works, but focus or visible context feels unstable across year ranges.

### Likely Cause

The scroller integration is not fully synchronized with visible year context.

### How To Verify

- log visible year changes while paging
- compare them with the rendered range labels

### Fix

Keep `period` equal to the layout's page size and derive range labels from the rendered years.

## Custom Layouts Break The Sense Of Calendar Continuity

### Symptom

The year grid still renders, but it no longer feels like a coherent picker.

### Likely Cause

Too much of the standard grid structure was replaced without preserving year-ordering cues.

### How To Verify

- review the custom layout without developer context

### Fix

Preserve explicit year ordering and reuse the helper-generated grids where possible.
