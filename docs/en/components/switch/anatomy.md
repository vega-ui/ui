# Switch Anatomy

## Overview

`Switch` is a [compound component](../../glossary.md#compound-component) for one immediate binary setting, with a native input for semantics and state and an indicator for the visible thumb and track.

## Required Parts

### `Switch`

Required. Owns size and variant context for the switch.

### `SwitchIndicator`

Required. Renders the visible switch thumb and track surface.

### `SwitchInput`

Required. The visually hidden native checkbox with `role='switch'`: focus, keyboard, checked state and form value come from it.

## Optional Parts

`Switch` has no optional parts. The `Switch` root is the track itself, so the visible text lives outside it and is linked with `htmlFor`.

## Composition Order

1. `Switch`
2. `SwitchInput`
3. `SwitchIndicator`
4. a separate `Label` with `htmlFor` pointing at the `SwitchInput` `id`, or `aria-label` on `SwitchInput`

## Valid Composition Patterns

Name the switch with a separate `Label` whose `htmlFor` matches the `SwitchInput` `id`, or, when there is no visible text, with `aria-label` on `SwitchInput`. Do not wrap `Switch` in another `<label>`: it already is one.

<!-- example: switch/valid-composition-patterns.tsx -->
```tsx
import { Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='bluetooth' name='bluetooth' />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor='bluetooth'>Bluetooth</Label>
      </div>
      <Switch>
        <SwitchInput name='airplane-mode' aria-label='Airplane mode' />
        <SwitchIndicator />
      </Switch>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Switch used as a delayed submit choice

Switches imply immediate binary state, not a deferred form selection model.

### Missing `SwitchInput`

The control may look correct but has no focusable input and does not participate in native submission.

### Label describes the action instead of the state

Labels should describe the controlled feature, not "Turn on" or "Turn off".
