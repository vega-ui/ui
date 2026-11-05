# Accordion Troubleshooting

## Only The Icon Feels Clickable

### Symptom

Users try to click the row, but only the icon appears to react like the trigger.

### Likely Cause

The trigger composition was restyled in a way that visually isolates the icon from the full-width button.

### How To Verify

- Hover and click across the full trigger width.
- Inspect whether custom children or wrappers changed the button layout.

### Fix

- Keep `AccordionTrigger` as the main interaction surface.
- Treat `AccordionIcon` as decoration inside that trigger.

## Open State Does Not Match Parent Logic

### Symptom

Sections open and close, but the parent feature state falls out of sync.

### Likely Cause

The root is being treated like an uncontrolled accordion while the parent expects [controlled](../../glossary.md#controlled) behavior.

### How To Verify

- Check whether `opened` and `onChangeOpened` are wired together.
- Compare the visible state with parent data after several toggles.

### Fix

- Use `opened` and `onChangeOpened` together for parent-owned state.
- Keep `defaultOpened` for uncontrolled flows only.

## Form Errors Disappear Inside Collapsed Sections

### Symptom

Validation exists, but users do not notice it because the relevant section is collapsed.

### Likely Cause

Accordion state and form-error visibility were not designed together.

### How To Verify

- Trigger a real validation error inside a collapsed section.
- Check whether the outer UI signals which section needs attention.

### Fix

- Open the invalid section automatically or show a visible section-level error hint.
- Do not rely on hidden inner error copy as the only signal.
