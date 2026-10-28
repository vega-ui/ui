# Switch

## Doc Profile

`advanced interactive`

## Summary

`Switch` is a [compound component](../../glossary.md#compound-component) for immediate binary settings, with a hidden input for semantics and an indicator for the visible track and thumb. It is the binary-toggle layer when the UI should read as on or off right now, not as one deferred form choice among others.

## Imports

```tsx
import {
  Switch,
  SwitchIndicator,
  SwitchHiddenInput,
  type SwitchProps,
  type SwitchSize,
  type SwitchVariant,
} from '@vega-ui/react';
```

## Exported Types

- `SwitchProps`
- `SwitchHiddenInputProps`
- `SwitchIndicatorProps`
- `SwitchSize`
- `SwitchVariant`

## Minimal Composition

```tsx
<Switch>
  <SwitchHiddenInput />
  <SwitchIndicator />
</Switch>
```

## Required Parts

- `Switch`: root track and context surface
- `SwitchIndicator`: visible switch thumb and track state

## Optional Parts

- `SwitchHiddenInput`: native semantics and form participation

## Composition Order

1. `Switch`
2. `SwitchHiddenInput`
3. `SwitchIndicator`
4. visible label text

## Variants

- Sizes: `sm`, `md`, `lg`
- Variants: `primary`, `secondary`
- States: unchecked, checked, disabled

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Switches imply immediate binary state, not a deferred exclusive choice.
- Use the hidden input when the control belongs to a native form.
- Labels should describe the controlled feature, not the toggle action itself.
- If the binary choice is only one line inside a larger checklist or form submission flow, `Checkbox` may communicate intent better.

## Common Mistakes

- Using a switch for deferred form choices.
- Writing labels like "Turn on" instead of naming the setting.
- Omitting hidden input participation in form-driven flows.
