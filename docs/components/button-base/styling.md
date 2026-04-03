# ButtonBase Styling

## Overview

`ButtonBase` owns the shared action styling contract used by higher-level button components. It exposes public-looking `--button-*` variables internally and maps `variant` plus `appearance` to theme tokens and state colors.

## Public CSS Variables

| Variable | Purpose |
| --- | --- |
| `--button-color` | default text/icon color |
| `--button-color-hover` | hover text/icon color |
| `--button-color-active` | active text/icon color |
| `--button-background-color` | default surface color |
| `--button-background-color-hover` | hover surface color |
| `--button-background-color-active` | active surface color |
| `--button-border-color` | default border color |
| `--button-border-color-hover` | hover border color |
| `--button-border-color-active` | active border color |

## Part-Level Variables

### Root

The root `.buttonBase` element owns all button color, border, and focus behavior.

### Slotted Child

When `asChild` is used, the slotted element receives the same classes and data attributes. It does not create a second styling layer.

## State And Variant Interaction

- `data-variant='primary' | 'secondary'` switches the color family.
- `data-appearance='fill' | 'outline' | 'ghost' | 'transparent'` switches the structural treatment.
- Disabled styles map to `--disable-*` theme tokens.
- Focus uses `--focus-color`.

## Examples

### Override radius in a local wrapper

```css
.toolbarAction {
  border-radius: 999px;
}
```

```tsx
<ButtonBase className='toolbarAction' appearance='ghost'>
  Invite
</ButtonBase>
```

## Do Not Override

- inventing unsupported variant names without matching CSS
- treating `asChild` as a styling escape hatch
- replacing semantic theme tokens with raw hardcoded colors inside reusable component styles
