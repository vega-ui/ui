# Toggle

## Doc Profile

`advanced interactive`

## Summary

`Toggle` is a button that stays pressed: a click, Enter or Space turns it on and off, and `aria-pressed` tells assistive technology its state, following the [WAI-ARIA button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/). It is a [Button](../button/), `square` for a single icon, transparent when released and tinted in the primary color when pressed. Use it for a state that applies at once, like bold text, a muted microphone or a shown ruler. For a few toggles that form one choice or one set of filters, put them in a [ToggleGroup](../toggle-group/).

## Imports

```tsx
import { Toggle, type ToggleProps } from '@vega-ui/react';
```

## Exported Types

- `ToggleProps`

## Basic Usage

<!-- example: toggle/minimal-composition.tsx -->
```tsx
import { Icon, Toggle } from '@vega-ui/react';
import { RulerIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Toggle size='sm'>
      <Icon size='sm'><RulerIcon /></Icon>
      Show ruler
    </Toggle>
  );
}
```
<!-- /example -->

## Required Parts

- `Toggle`: the toggle

## Optional Parts

- `Icon`: next to the text, or alone with `square` and an `aria-label`
- [Toolbar](../toolbar/) around toggles: each one goes inside a `ToolbarItem` with `asChild`

## Composition Order

1. `Toggle`
2. Its content: `Icon` and text, or an `Icon` alone with `square`

## Variants

- Uncontrolled through `defaultPressed`, or controlled through `pressed` and `onChangePressed`
- Sizes through `size`: `xs`, `sm`, `md`, `lg`, `xl`, as in `Button`
- Disabled through `disabled`
- Text, an icon and text, or an icon alone with `square` and an `aria-label`
- One look: `secondary` and `transparent` while released, the colors of `primary` `ghost` while pressed; there is no `variant` or `appearance` prop

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)
- [ToggleGroup](../toggle-group/)

## Edge Cases

- `Toggle` renders `<button type="button">`, so it never submits a form around it. With `asChild` it passes `type="button"` to the child too, unless the child sets its own `type`.
- With `asChild`, `variant` and `appearance` set on the child win over the look of the toggle, and the pressed state no longer shows. Leave them off the child.
- `disabled` disables the native button; a pressed toggle stays pressed while disabled.
- `Toggle` is standalone: it is not an item of a [ToggleGroup](../toggle-group/). For toggles that form one choice, use `ToggleGroup` with `ToggleGroupToggle` items.
- Inside a [Toolbar](../toolbar/), wrap the toggle in `ToolbarItem` with `asChild` to make it an item of the toolbar.

## Common Mistakes

- Changing the label with the state, like "Mute" and "Unmute": the screen reader announces "pressed" already, and a new label makes it announce a different button. Keep one label, and change only the icon if needed.
- Leaving an icon-only toggle without `aria-label`: the components never set a label themselves.
- Using a toggle for an action that runs once, like "Save": use [Button](../button/).
- Using a toggle for a value a form submits: use [Switch](../switch/) or [Checkbox](../checkbox/).
- Building a set of exclusive toggles from separate toggles with their own `pressed`: use a [ToggleGroup](../toggle-group/) with `ToggleGroupToggle` items, which keeps one value and one Tab stop.
