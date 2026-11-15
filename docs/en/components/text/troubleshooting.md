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

## Newlines Do Not Break The Line

### Symptom

An address or other multiline string renders as one line.

### Likely Cause

`Text` collapses whitespace like a native `<span>`, so newline characters are not shown.

### How To Verify

- inspect the source string
- check for `\n` or multiline content

### Fix

Set `whiteSpace: 'pre-line'` on the `Text` when the line breaks are meaningful.

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
