# Separator Troubleshooting

## The Vertical Divider Is Not Visible

### Symptom

`orientation='vertical'` is set, but no divider is visible.

### Likely Cause

The parent layout does not provide a height for the separator to fill.

### How To Verify

- inspect the parent container height
- temporarily set an explicit height and check whether the divider appears

### Fix

Give the parent a defined height or stretch context when using a vertical separator.

## The Divider Does Not Create Enough Space

### Symptom

Content still feels cramped even though a separator is present.

### Likely Cause

`Separator` only draws the line; it does not manage layout spacing.

### How To Verify

- inspect surrounding gap, margin, or padding values

### Fix

Add spacing in the parent layout and keep the separator responsible only for the visual division.

## The UI Has Dividers But Still Lacks Structure

### Symptom

Sections are visually split, but users still cannot tell what each section means.

### Likely Cause

Separators are being used where headings or form legends should carry the structure.

### How To Verify

- remove the lines mentally and check whether section meaning remains clear

### Fix

Add `Heading`, `Label`, or `FieldsetLegend` where semantic labeling is required.
