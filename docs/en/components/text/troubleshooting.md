# Text Troubleshooting

## The Copy Looks Like A Heading But Is Not Announced As One

### Symptom

Large text appears visually like a section title, but assistive technology does not treat it as a heading.

### Likely Cause

`Text` was used where `Heading` should have been used.

### How To Verify

- inspect the rendered element
- confirm it is not an `h1` through `h6`

### Fix

Use `Heading` when the content participates in document structure.

## Newlines Are Rendering Unexpectedly

### Symptom

Line breaks appear in the UI even though the text was expected to render as one paragraph.

### Likely Cause

`Text` uses `white-space: pre-line`, so newline characters are preserved.

### How To Verify

- inspect the source string
- check for `\n` or multiline content

### Fix

Normalize the content before rendering or use a different rendering strategy when line breaks are not intended.

## Text Color Overrides Make Helper Copy Hard To Read

### Symptom

Secondary or custom-styled text has insufficient contrast.

### Likely Cause

Low-contrast overrides were applied through inline styles or custom variables.

### How To Verify

- compare the rendered color against the background
- check whether primary and secondary text still read distinctly

### Fix

Prefer semantic theme tokens and retest contrast when overriding `--t-color`.
