# Fieldset Troubleshooting

## The Group Looks Correct But Screen Readers Do Not Announce A Group Label

### Symptom

The controls appear grouped visually, but assistive technology does not announce a meaningful group name.

### Likely Cause

`FieldsetLegend` is missing or a plain text element was used instead.

### How To Verify

- inspect the markup
- confirm a real `<legend>` is rendered inside the `<fieldset>`

### Fix

Render `FieldsetLegend` as the first meaningful child of the root.

## The Group Border Feels Duplicated Inside A Dialog Or Card

### Symptom

The section looks visually heavy because both the parent container and the fieldset draw boundaries.

### Likely Cause

`appearance='outlined'` is used inside another strongly framed surface.

### How To Verify

- compare the section with `outlined` and `transparent`
- check whether the parent already provides enough boundary

### Fix

Use `appearance='transparent'` when only semantic grouping is needed.

## Group-Level Validation Copy Replaces The Legend

### Symptom

The error message is visible, but the stable group label is missing or constantly changing.

### Likely Cause

Validation text was used as the legend itself.

### How To Verify

- inspect the rendered legend text
- confirm whether it contains transient validation copy

### Fix

Keep the legend as the durable group label and place validation copy in `FieldsetHeader` or nearby supporting text.

## Nested Groups Are Hard To Understand

### Symptom

Nested sections render, but users cannot tell which controls belong to which scope.

### Likely Cause

The outer and inner legends do not establish a clear hierarchy.

### How To Verify

- read the legends in order without the surrounding layout
- confirm whether each group still makes sense on its own

### Fix

Reduce nesting or rewrite the legends so each level names a distinct scope.
