# Button Styling

## Overview

`Button` styling is split between `ButtonBase` for semantic variant and appearance behavior, and the local `Button` size layer for spacing, height, and width.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--button-height` | `Button` | Control height, and the width of a `square` button. |
| `--button-br-ratio` | `Button` | Border-radius ratio. |
| `--button-color` | `ButtonBase` | Current text color. |
| `--button-background-color` | `ButtonBase` | Current background color. |
| `--button-border-color` | `ButtonBase` | Current border color. |
| `--icon-size` | nested `Icon` | Icon size; a `square` button sets it to a third of the height. |

## Part-Level Variables

- `Button`: local size, padding and `square` behavior. `[data-square]` sets the width to `--button-height` and removes the inline padding.
- `ButtonBase`: shared variant, appearance, disabled, hover, active, and focus styling.

## State And Variant Interaction

- `size` changes height, padding, and font size.
- `variant` and `appearance` are mostly handled by `ButtonBase`.
- Disabled state is handled at the button-base layer across all appearances.

## Examples

Override the public variables inline or in your own class. Colors need the `-hover` and `-active` variables too, otherwise hover and press fall back to the variant colors.

<!-- example: button/css-variable-overrides.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Button } from '@vega-ui/react';

const pill = {
  '--button-br-ratio': 0.5,
} as CSSProperties;

const compact = {
  '--button-height': '32px',
} as CSSProperties;

const success = {
  '--button-background-color': 'var(--color-green-accent-800)',
  '--button-background-color-hover': 'var(--color-green-accent-900)',
  '--button-background-color-active': 'var(--color-green-accent-1000)',
} as CSSProperties;

export default function CssVariableOverrides() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button' style={pill}>Follow</Button>
      <Button type='button' variant='secondary' appearance='ghost' style={compact}>Filter</Button>
      <Button type='button' style={success}>Approve</Button>
    </div>
  );
}
```
<!-- /example -->

`--button-height` and `--button-br-ratio` turn a `square` button into a large round call control; the nested icon still follows at a third of the height. The hang-up button overrides the background variables, including hover and active.

<!-- example: button/square-round-controls.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Button, Icon } from '@vega-ui/react';
import { MicIcon, PhoneOffIcon, VideoIcon } from '@vega-ui/icons';

const round = {
  '--button-height': '48px',
  '--button-br-ratio': 0.5,
} as CSSProperties;

const hangUp = {
  ...round,
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function SquareRoundControls() {
  return (
    <div role='group' aria-label='Call controls' style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      <Button type='button' variant='secondary' appearance='ghost' square aria-label='Mute microphone' style={round}>
        <Icon><MicIcon /></Icon>
      </Button>
      <Button type='button' variant='secondary' appearance='ghost' square aria-label='Turn off camera' style={round}>
        <Icon><VideoIcon /></Icon>
      </Button>
      <Button type='button' square aria-label='Leave call' style={hangUp}>
        <Icon><PhoneOffIcon /></Icon>
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- Do not remove focus visibility without a replacement.
- Do not invent custom appearance strings without matching CSS support.
- Do not treat semantic navigation and button styling as the same concern.
