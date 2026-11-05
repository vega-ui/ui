# Switch Styling

## Overview

`Switch` styling is split across the root label-like track and the visible indicator thumb. State changes are coordinated through root-level CSS variables and hidden-input state selectors.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--switch-size` | `Switch`, `SwitchIndicator` | Overall control size. |
| `--switch-background-color` | `Switch` | Current track color. |
| `--switch-indicator-size` | `SwitchIndicator` | Thumb size. |
| `--switch-indicator-transform` | `SwitchIndicator` | Thumb position. |
| `--switch-padding` | `Switch` | Gap between the track and the thumb. |
| `--switch-background-color-hover` | `Switch` | Track color on hover. |
| `--switch-background-color-active` | `Switch` | Track color while pressed. |
| `--switch-indicator-color` | `SwitchIndicator` | Thumb color. |

## Part-Level Variables

- `Switch`: root track, spacing, size, and checked-state color model.
- `SwitchIndicator`: thumb surface and animated position.
- `SwitchInput`: semantic state carrier for checked, disabled, and focus behavior.

## State And Variant Interaction

- `variant` changes the checked-state color family.
- Active state slightly stretches and shifts the indicator.
- Disabled state overrides track and thumb styling together.

## Examples

<!-- example: switch/examples.css -->
```css
.brandSwitch {
  --switch-size: 28px;
}
```
<!-- /example -->

<!-- example: switch/styling-examples.css -->
```css
.softSwitch {
  --switch-background-color: var(--fills-secondary);
}
```
<!-- /example -->

### Custom indicator

`SwitchIndicator` takes your own `style` and children, so the thumb can have its own color or hold an icon.

<!-- example: switch/custom-indicator.tsx -->
```tsx
import { Icon, Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';
import { Moon } from '@vega-ui/icons';

export default function CustomIndicator() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='custom-focus-mode' />
          <SwitchIndicator style={{ background: 'var(--color-primary-700)' }} />
        </Switch>
        <Label htmlFor='custom-focus-mode'>Focus mode</Label>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='custom-dark-mode' defaultChecked />
          <SwitchIndicator style={{ background: 'var(--color-primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size='sm'><Moon stroke='var(--color-white)' /></Icon>
          </SwitchIndicator>
        </Switch>
        <Label htmlFor='custom-dark-mode'>Dark mode</Label>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- Do not hide focus visibility on the track.
- Do not weaken the checked versus unchecked contrast until state becomes ambiguous.
- Do not override the indicator transform logic without retesting interaction states.
