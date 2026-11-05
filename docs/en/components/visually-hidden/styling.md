# VisuallyHidden Styling

## Overview

`VisuallyHidden` uses the standard accessible hiding CSS pattern.

## Public CSS Variables

There are no component-local CSS variables in the current implementation.

## Part-Level Variables

### Root

The root uses absolute positioning, 1px box sizing, clipping, and overflow hiding to remove content from the visual layout while preserving accessibility tree presence.

## State And Variant Interaction

- `asChild` changes the rendered element but not the hidden styling behavior

## Examples

### Hidden accessibility-only label

A compact header search has no room for a visible label, so the real `<label>` is hidden with `VisuallyHidden asChild`. The placeholder is not a replacement: it disappears while typing and is not a reliable accessible name.

<!-- example: visually-hidden/hidden-accessibility-only-label.tsx -->
```tsx
import { Icon, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { SearchIcon } from '@vega-ui/icons';

export default function HiddenAccessibilityOnlyLabel() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <strong>Acme Docs</strong>
      <form role='search' action='/search' style={{ flex: 1, minWidth: 0 }}>
        <VisuallyHidden asChild>
          <label htmlFor='docs-search'>Search documentation</label>
        </VisuallyHidden>
        <TextField size='sm' style={{ paddingInlineStart: 'var(--spacing-5)' }}>
          <Icon size='xs' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><SearchIcon /></Icon>
          <TextFieldInput id='docs-search' name='q' type='search' placeholder='Search' />
        </TextField>
      </form>
    </header>
  );
}
```
<!-- /example -->

## Do Not Override

- changing the clipping rules in ways that make content visually reappear unexpectedly
- using the class as a generic layout utility unrelated to accessibility
