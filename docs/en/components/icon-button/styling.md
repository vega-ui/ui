# IconButton Styling

## Overview

`IconButton` styling is split between `ButtonBase` for semantic variant and appearance behavior, and the local `IconButton` size layer for square dimensions and icon sizing.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-button-size` | `IconButton` | Square control size. |
| `--icon-button-br-ratio` | `IconButton` | Border-radius ratio. |
| `--icon-size` | nested icon content | Suggested icon size derived from the button size. |
| `--button-color` | `ButtonBase` | Current content color. |
| `--button-background-color` | `ButtonBase` | Current background color. |

## Part-Level Variables

- `IconButton`: local square sizing and radius.
- `ButtonBase`: shared variant, appearance, disabled, hover, active, and focus styling.

## State And Variant Interaction

- `size` maps directly to square button size.
- `variant` and `appearance` are handled by `ButtonBase`.
- Icon legibility depends on both control size and icon glyph selection.

## Examples

`--icon-button-size` and `--icon-button-br-ratio` turn the square into a large round call control; the nested icon still follows at one third of the size. The hang-up button overrides the background variables, including hover and active.

<!-- example: icon-button/css-variable-overrides.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Icon, IconButton } from '@vega-ui/react';
import { MicIcon, PhoneOffIcon, VideoIcon } from '@vega-ui/icons';

const round = {
  '--icon-button-size': '48px',
  '--icon-button-br-ratio': 0.5,
} as CSSProperties;

const hangUp = {
  ...round,
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function CssVariableOverrides() {
  return (
    <div role='group' aria-label='Call controls' style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      <IconButton type='button' variant='secondary' appearance='ghost' aria-label='Mute microphone' style={round}>
        <Icon><MicIcon /></Icon>
      </IconButton>
      <IconButton type='button' variant='secondary' appearance='ghost' aria-label='Turn off camera' style={round}>
        <Icon><VideoIcon /></Icon>
      </IconButton>
      <IconButton type='button' aria-label='Leave call' style={hangUp}>
        <Icon><PhoneOffIcon /></Icon>
      </IconButton>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- Do not remove focus visibility without a replacement.
- Do not force icon sizes that look unbalanced inside the chosen button size.
- Do not use icon-only styling as a substitute for missing accessible labeling.
