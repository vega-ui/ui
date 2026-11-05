# Heading Troubleshooting

## The UI Looks Structured But Screen Readers Do Not See Headings

### Symptom

Large styled text appears as section titles visually, but assistive technology does not announce headings.

### Likely Cause

`Text` or a generic element was used instead of `Heading`.

### How To Verify

- inspect the rendered element
- confirm it is not `h1` through `h6`

### Fix

Use `Heading` and choose the correct `as` level.

## The Heading Hierarchy Feels Broken

### Symptom

Users see headings, but the document outline jumps unpredictably.

### Likely Cause

Heading levels were chosen by desired font size instead of structure.

### How To Verify

- read only the heading levels in order
- confirm they form a logical outline

### Fix

Set `as` from the document hierarchy first, then adjust `size` for visuals.

## Headings And Labels Are Being Mixed

### Symptom

Form sections and individual fields both use the same heading primitive, making semantics unclear.

### Likely Cause

`Heading` is being used where `Label` or `FieldsetLegend` should be used.

### How To Verify

- inspect whether the text names one field or a whole section

### Fix

Use `Label` for single controls and `FieldsetLegend` for grouped controls.
