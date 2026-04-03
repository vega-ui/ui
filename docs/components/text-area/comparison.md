# TextArea Comparison

## Quick Decision Rule

Use `TextArea` for multiline free-form input. Use `TextField` for single-line entry.

## `TextArea` vs `TextField`

Use `TextArea` when:

- the content is comments, descriptions, notes, or other multiline prose

Use `TextField` when:

- the value is single-line or needs prefix/suffix composition

## `TextArea` vs `Code`

Use `TextArea` when:

- the user is editing prose or general text

Use `Code` when:

- the UI is showing inline code fragments, not editing long-form text

## Choose This Component When

- the value is multiline
- users may need more vertical space to review what they typed
- line breaks are part of the actual data model

## Do Not Choose This Component When

- the field is a short single-line value
- the control needs rich compound behavior like toggles or segmented slots
