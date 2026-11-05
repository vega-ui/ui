# Option Styling

## Overview

`Option` styling is token-driven and centered around row height, text color, and state-specific background colors.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--option-height` | root | row height |
| `--option-br-ratio` | root | radius ratio |
| `--option-color` | root | text color |
| `--option-background-color` | root | default background |
| `--option-background-color-hover` | root | hover background |
| `--option-background-color-active` | root | active background |

## Part-Level Variables

### Root

The root maps size to row height, padding, and text scale. Selected state remaps color and background tokens to the primary palette.

## State And Variant Interaction

- size controls height and typography
- `aria-selected='true'` remaps the option to primary selected colors
- disabled state keeps the row non-interactive

## Examples

### Selected option surface

The selected state sets its colors with zero specificity, so a class on the list can recolor selected rows from `examples.css` without touching the others.

<!-- example: option/selected-option-surface.tsx -->
```tsx
import { Option } from '@vega-ui/react';
import './examples.css';

export default function SelectedOptionSurface() {
  return (
    <div
      role='listbox'
      aria-label='Delivery speed'
      className='option-brand-list'
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260, padding: 'var(--spacing-4)', borderRadius: 'var(--spacing-8)', background: 'var(--surface-secondary)', border: '1px solid var(--separator-opaque)', boxSizing: 'border-box' }}
    >
      <Option>Standard, 5–7 days</Option>
      <Option selected>Express, 2 days</Option>
      <Option>Same day</Option>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- making selected and unselected rows visually indistinguishable
- nesting competing interactive elements inside the row
