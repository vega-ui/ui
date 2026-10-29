# Switch Anatomy

## Overview

`Switch` is a [compound component](../../glossary.md#compound-component) for one immediate binary setting, with a native input for semantics and state and an indicator for the visible thumb and track.

## Required Parts

### `Switch`

Required. Owns size and variant context for the switch.

### `SwitchIndicator`

Required. Renders the visible switch thumb and track surface.

## Optional Parts

### `SwitchInput`

Recommended when the switch should participate in native forms and preserve native checked semantics.

## Composition Order

1. `Switch`
2. `SwitchInput`
3. `SwitchIndicator`
4. visible label text

## Valid Composition Patterns

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Switch>
    <SwitchInput name='notifications' />
    <SwitchIndicator />
  </Switch>
  Enable notifications
</label>
```

## Invalid Composition Patterns

### Switch used as a delayed submit choice

Switches imply immediate binary state, not a deferred form selection model.

### Missing `SwitchInput`

The control may look correct but has no focusable input and does not participate in native submission.

### Label describes the action instead of the state

Labels should describe the controlled feature, not "Turn on" or "Turn off".
