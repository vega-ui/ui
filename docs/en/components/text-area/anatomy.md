# TextArea Anatomy

## Overview

`TextArea` is a single-part primitive that renders the native `<textarea>` itself. Every prop the native element accepts goes straight to it, so there is no wrapper and no child part.

## Required Parts

### `TextArea`

Required. The native `<textarea>`: it owns the value, the size, the error and full-width styles, and takes `name`, `rows`, `required`, `maxLength` and the other native attributes.

## Optional Parts

There are no exported child parts. A field is usually built from separate components around it:

### `Label`

Optional, but needed in most UI. Names the textarea through `htmlFor` and its `id`.

### `HelperText`

Optional. A hint or an error message, linked to the textarea with `aria-describedby`.

## Composition Order

1. `Label`
2. `TextArea`
3. optional `HelperText` or counter

## Valid Composition Patterns

<!-- example: text-area/issue-description.tsx -->
```tsx
import { HelperText, Label, TextArea } from '@vega-ui/react';
import { useId } from 'react';

export default function IssueDescription() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>What went wrong?</Label>
      <TextArea
        id={id}
        name='description'
        rows={4}
        fullWidth
        placeholder='Steps to reproduce, what you expected and what happened instead'
        aria-describedby={hintId}
      />
      <HelperText id={hintId}>Include the page URL and the time it happened, if you know it.</HelperText>
    </div>
  );
}
```
<!-- /example -->

The `Label` points at the textarea by `id`, and the hint below is linked with `aria-describedby`. The textarea is the form control itself, so `name`, `rows` and `fullWidth` go on it directly.

## Invalid Composition Patterns

### Children inside `TextArea`

A `<textarea>` takes its text from `value` or `defaultValue`. Children are not a supported way to set the content or to add icons and buttons inside the field.

### Wrapping it in `TextField`

`TextField` expects `TextFieldInput` and is built for a single-line `<input>`. Use `TextArea` on its own for multiline text.

### A placeholder instead of a label

The placeholder disappears as soon as the user types, so it cannot replace the `Label`.
