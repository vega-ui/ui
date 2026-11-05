# Radio Anatomy

## Overview

`Radio` is a single native input rather than a multi-part compound component. The real composition contract lives in how multiple radios are grouped through shared `name` and visible labels.

## Required Parts

### `Radio`

Required. Renders the native `input[type='radio']` and owns checked, disabled, size, and variant behavior.

## Optional Parts

`Radio` does not expose additional public child parts.

## Composition Order

1. visible label wrapper
2. `Radio`
3. label text

## Valid Composition Patterns

Two valid ways to name a radio: wrap it in a `<label>` together with its text, or give it an `id` and point a separate `Label` at it with `htmlFor`. Both radios share one `name`, so they form one group.

<!-- example: radio/valid-composition-patterns.tsx -->
```tsx
import { Label, Radio } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio name='density' value='comfortable' defaultChecked />
        Comfortable
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio id='density-compact' name='density' value='compact' />
        <Label htmlFor='density-compact'>Compact</Label>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Radios without a shared `name`

This breaks mutually exclusive group behavior.

### Radio used as a standalone boolean toggle

If the choice is independent rather than exclusive, use `Checkbox` or `Switch`.

### Label text detached from the control

This makes the radio harder to understand and harder to click.
