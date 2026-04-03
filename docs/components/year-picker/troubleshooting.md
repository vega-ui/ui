# YearPicker Troubleshooting

## The Visible Year Range Does Not Match The Intended Period

### Symptom

The grid renders, but the year range shown is not what the product expected.

### Likely Cause

Visible `year`, layout offset, or scroller index mapping are out of sync.

### How To Verify

- inspect the effective visible year and any current scroller index

### Fix

Derive year labels, layout offsets, and scroller indexes from one consistent mapping.

## Large Year Paging Feels Fragile

### Symptom

Paging works, but focus or visible context feels unstable across year ranges.

### Likely Cause

The scroller integration is not fully synchronized with visible year context.

### How To Verify

- log visible year changes while paging
- compare them with the rendered range labels

### Fix

Keep one authoritative year/index mapping and derive both content and labels from it.

## Custom Layouts Break The Sense Of Calendar Continuity

### Symptom

The year grid still renders, but it no longer feels like a coherent picker.

### Likely Cause

Too much of the standard grid structure was replaced without preserving year-ordering cues.

### How To Verify

- review the custom layout without developer context

### Fix

Preserve explicit year ordering and reuse the helper-generated grids where possible.
