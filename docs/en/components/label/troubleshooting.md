# Label Troubleshooting

## Clicking The Label Does Not Focus The Control

### Symptom

The label renders, but clicking it does not move focus to the intended field.

### Likely Cause

`htmlFor` does not match the control id, or the control is not wrapped by the label.

### How To Verify

- inspect the rendered `for` attribute
- confirm the target control has the matching `id`

### Fix

Use a matching `htmlFor` and `id`, or wrap the control directly inside `Label`.

## The Label Reads Like Helper Text

### Symptom

The field has copy nearby, but the primary label is visually too weak or ambiguous.

### Likely Cause

Typography overrides made the label look like secondary text.

### How To Verify

- compare label weight and color with nearby helper text
- confirm there is one obvious visible label

### Fix

Keep the primary label visually distinct and move secondary guidance into separate helper copy.

## One Label Appears To Control Multiple Inputs

### Symptom

Several inputs look grouped under one label, and click behavior feels inconsistent.

### Likely Cause

Multiple unrelated controls were wrapped in one label.

### How To Verify

- inspect the label contents
- confirm whether one label contains more than one independent control

### Fix

Use one `Label` per control, or switch to `Fieldset` and `FieldsetLegend` for grouped controls.
