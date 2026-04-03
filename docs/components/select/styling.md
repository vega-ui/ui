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

```tsx
<Select style={{ '--select-size': '44px' } as React.CSSProperties}>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select framework' />
    <SelectIcon />
  </SelectCombobox>
</Select>
```

### Value and placeholder color override

```tsx
<Select
  style={{
    '--select-value-color': 'var(--color-primary-700)',
    '--select-placeholder-color': 'var(--color-orange-accent-500)',
  } as React.CSSProperties}
>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select framework' />
    <SelectIcon />
  </SelectCombobox>
</Select>
```

### Icon and listbox override

```tsx
<Select
  style={{
    '--select-icon-color': 'var(--color-primary-600)',
    '--select-listbox-br-ratio': '0.5',
  } as React.CSSProperties}
>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select framework' />
    <SelectIcon />
  </SelectCombobox>
</Select>
```

## Do Not Override

- relying on internal ratios as a stable public API without documenting them in the design system
- overriding styles in a way that breaks focus visibility
- making placeholder and selected text visually indistinguishable
- changing height and radius independently without checking trigger/listbox consistency
