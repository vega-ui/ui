# PinField Styling

## Overview

`PinField` styling is divided between the slot grid, the visible slots, and the optional separator. `PinFieldInput` is visually hidden and does not define the surface contract.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--input-height` | slot | slot size baseline |
| `--input-br-ratio` | slot | slot radius ratio |
| `--fills-tertiary` | slot | default slot surface |
| `--fills-tertiary-hover` | slot | hover slot surface |
| `--color-primary-500` | slot active | active outline |
| `--color-error` | slot error | error outline |
| `--separator-opaque` | separator | group divider color |
| `--cursor-height` | `PinFieldSlot` | Height of the caret in the active slot. |
| `--pin-field-slot-outline-color` | `PinFieldSlot` | Outline of the slots. The root sets it to `--color-error` while `PinFieldInput` has `aria-invalid='true'` or matches `:user-invalid` or `[data-user-edited]:invalid`. |

## Part-Level Variables

### Root

The root is a flex row that spaces slots with `gap: var(--spacing-3)`.

### Slot

Slots map size to both square dimensions and type scale, and render a blinking caret for active placeholder state.

### Separator

The separator uses size-specific width tokens and a 1px line.

## State And Variant Interaction

- size changes slot dimensions and type scale
- active state changes outline color
- placeholder state changes slot text color
- disabled and error states remap slot colors without changing layout; the error state follows `aria-invalid='true'`, `:user-invalid` or `[data-user-edited]:invalid` on `PinFieldInput`

`PinField` writes the text of `PinFieldInput` itself, and Chromium and WebKit do not count that text as an edit of the user, so the input does not match `:user-invalid` after it. In your own CSS, pair `:user-invalid` with `[data-user-edited]:invalid`:

```css
.sign-in-code:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

## Examples

### Grouped OTP slots

Each slot defines its own `--input-br-ratio`, so the override goes on the slots, while the gap is plain CSS on the root.

<!-- example: pin-field/grouped-otp-slots.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot } from '@vega-ui/react';

const roundSlot = { '--input-br-ratio': 0.5 } as CSSProperties;

export default function GroupedOtpSlots() {
  return (
    <PinField size='lg' maxLength={6} style={{ gap: 'var(--spacing-6)' }}>
      <PinFieldInput aria-label='Sign-in code' autoComplete='one-time-code' />
      <PinFieldSlot index={0} style={roundSlot} />
      <PinFieldSlot index={1} style={roundSlot} />
      <PinFieldSlot index={2} style={roundSlot} />
      <PinFieldSeparator />
      <PinFieldSlot index={3} style={roundSlot} />
      <PinFieldSlot index={4} style={roundSlot} />
      <PinFieldSlot index={5} style={roundSlot} />
    </PinField>
  );
}
```
<!-- /example -->

## Do Not Override

- breaking the square relationship between slot width and height
- styling separators as if they were editable slots
- hiding active focus/outline states
