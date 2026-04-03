# PinField Styling

## Overview

`PinField` styling is divided between the slot grid, the visible slots, and the optional separator. The hidden input is visually hidden and does not define the surface contract.

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
- disabled and error states remap slot colors without changing layout

## Examples

### Grouped OTP slots

```tsx
<PinField maxLength={6}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSeparator />
  <PinFieldSlot index={3} />
  <PinFieldSlot index={4} />
  <PinFieldSlot index={5} />
</PinField>
```

## Do Not Override

- breaking the square relationship between slot width and height
- styling separators as if they were editable slots
- hiding active focus/outline states
