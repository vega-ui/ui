# Select Styling

## Overview

This file documents the CSS-variable styling contract for `Select` and its child parts.

## Public CSS Variables

These variables are directly consumed by the current implementation and are the most realistic override points for product-level styling.

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--select-size` | root, combobox, listbox | Shared height and radius base for the component |
| `--select-br-ratio` | root, combobox, listbox | Shared border-radius ratio |
| `--select-combobox-br-ratio` | `SelectCombobox` | Trigger-specific radius ratio override |
| `--select-combobox-gap` | `SelectCombobox` | Gap between the value and the icon, by default from the size |
| `--select-listbox-br-ratio` | `SelectListbox` | Panel-specific radius ratio override |
| `--select-value-color` | `SelectValue` | Selected value text color |
| `--select-placeholder-color` | `SelectValue` | Placeholder text color |
| `--select-icon-color` | `SelectIcon` | Trigger icon color |

## Part-Level Variables

`Select` styling is split across:

- root sizing variables in `Select`
- trigger variables in `SelectCombobox`
- value and placeholder color variables in `SelectValue`
- icon color variables in `SelectIcon`
- panel surface variables in `SelectListbox`

### Root

Defined in `packages/ui/src/Select/style.module.css`:

- `--select-size`
- `--select-br-ratio`

Default behavior:

- `sm` maps `--select-size` to `var(--spacing-21)`
- `md` maps `--select-size` to `var(--spacing-24)`
- `lg` maps `--select-size` to `var(--spacing-27)`

### Combobox

`SelectCombobox` uses:

- `--select-combobox-br-ratio`
- `--select-combobox-gap`
- `--select-icon-color`
- `--select-placeholder-color`
- `--select-value-color`

State behavior in source:

- `field` variant uses `--fills-tertiary` and `--fills-tertiary-hover`
- focus and open states use `--color-primary-500`
- disabled state remaps icon, placeholder, and value colors to disabled tokens

### Value

`SelectValue` resolves:

- `--select-value-color`, falling back to `var(--text-color)`
- `--select-placeholder-color`, falling back to `var(--label-tertiary)`

This makes value and placeholder styling safe to override without rewriting the whole child component.

### Icon

`SelectIcon` defines:

- `--select-icon-color`

The icon rotates on open state and inherits its color from this variable.

### Listbox

`SelectListbox` uses:

- `--select-listbox-br-ratio`
- shared `--select-size` and `--select-br-ratio`

It also depends on global surface tokens:

- `--surface-secondary`
- `--surface-shadow`

## State And Variant Interaction

`field` and `inline` variants do not expose separate `--select-*` variant variables in the current implementation. Their behavior is driven mostly by:

- `data-variant`
- global surface tokens
- focus and disabled tokens

That means:

- size and text-color customization are straightforward
- variant-level restyling still depends partly on global theme tokens rather than component-local variables

## Examples

### Root size override

`--select-size` and `--select-br-ratio` on the root resize the trigger and round both the trigger and the list.

<!-- example: select/root-size-override.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function RootSizeOverride() {
  return (
    <Select
      defaultValue='newest'
      style={{ '--select-size': '44px', '--select-br-ratio': 0.5, width: 200 } as CSSProperties}
    >
      <SelectCombobox aria-label='Sort orders by'>
        <SelectValue />
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='newest'>Newest first</SelectOption>
        <SelectOption value='oldest'>Oldest first</SelectOption>
        <SelectOption value='total'>Highest total</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->

### Value and placeholder color override

Both colors are read with a fallback, so setting them on the root is enough. Keep the placeholder visibly different from a chosen value.

<!-- example: select/value-and-placeholder-color-override.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function ValueAndPlaceholderColorOverride() {
  return (
    <Select
      style={{
        '--select-value-color': 'var(--color-primary-700)',
        '--select-placeholder-color': 'var(--label-secondary)',
        width: 200,
      } as CSSProperties}
    >
      <SelectCombobox aria-label='Status'>
        <SelectValue placeholder='Any status' />
        <SelectIcon />
      </SelectCombobox>
      <SelectListbox>
        <SelectOption value='open'>Open</SelectOption>
        <SelectOption value='in-progress'>In progress</SelectOption>
        <SelectOption value='done'>Done</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->

### Icon and listbox override

Set `--select-icon-color` and `--select-listbox-br-ratio` on the root to style every part, or on `SelectIcon` and `SelectListbox` themselves to override only them.

<!-- example: select/icon-and-listbox-override.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';

export default function IconAndListboxOverride() {
  return (
    <Select defaultValue='week' style={{ width: 200 }}>
      <SelectCombobox aria-label='Date range'>
        <SelectValue />
        <SelectIcon style={{ '--select-icon-color': 'var(--color-primary-600)' } as CSSProperties} />
      </SelectCombobox>
      <SelectListbox style={{ '--select-listbox-br-ratio': 0.5 } as CSSProperties}>
        <SelectOption value='today'>Today</SelectOption>
        <SelectOption value='week'>Last 7 days</SelectOption>
        <SelectOption value='month'>Last 30 days</SelectOption>
        <SelectOption value='quarter'>This quarter</SelectOption>
      </SelectListbox>
    </Select>
  );
}
```
<!-- /example -->

## Do Not Override

- relying on internal ratios as a stable public API without documenting them in the design system
- overriding styles in a way that breaks focus visibility
- making placeholder and selected text visually indistinguishable
- changing height and radius independently without checking trigger/listbox consistency
