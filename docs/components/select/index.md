# Select

## Doc Profile

`advanced interactive`

## Summary

`Select` is a [compound component](../../glossary.md#compound-component) built from a root state container plus exported child parts for trigger, value, options, [portal](../../glossary.md#portal), and native [form participation](../../glossary.md#form-participation). It is the field-oriented single-choice layer, not a generic floating-content primitive.

## Imports

```tsx
import {
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectPortal,
  SelectValue,
  type SelectProps,
  type SelectSize,
  type SelectVariant,
} from '@vega-ui/react';
```

## Exported Types

- `SelectProps<V extends string | number = string>`
- `SelectSize = 'sm' | 'md' | 'lg' | string`
- `SelectVariant = 'inline' | 'field' | string`

## Minimal Composition

```tsx
<Select defaultValue='react'>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue placeholder='Select framework' />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <SelectOption value='react'>React</SelectOption>
      <SelectOption value='vue'>Vue</SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

## Required Parts

- `Select`: root state and context provider
- `SelectCombobox`: trigger surface
- `SelectValue`: selected value or placeholder
- `SelectListbox`: options container
- `SelectOption`: selectable option item

## Optional Parts

- `SelectHiddenSelect`: native [form participation](../../glossary.md#form-participation)
- `SelectIcon`: visual affordance for the trigger
- `SelectPortal`: [portal](../../glossary.md#portal) mounting layer

## Composition Order

Typical composition:

1. `Select`
2. `SelectHiddenSelect`
3. `SelectCombobox`
4. `SelectPortal`
5. `SelectListbox`
6. `SelectOption`

## Variants

- Size: `sm`, `md`, `lg`
- Variant: `field`, `inline`
- State variants: [controlled](../../glossary.md#controlled) value, [controlled](../../glossary.md#controlled) open state, [disabled](../../glossary.md#disabled), [read-only](../../glossary.md#read-only), searchable composition

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

- `disabled` blocks interaction completely; `readOnly` preserves focusability while preventing changes. See [Disabled](../../glossary.md#disabled) and [Read-Only](../../glossary.md#read-only).
- Filtering inside the listbox should usually disable built-in [typeahead](../../glossary.md#typeahead) with `typeMatchEnabled={false}` to avoid keyboard conflicts.
- Values are typed as `string | number`; object values are not supported by the public API.
- `SelectHiddenSelect` is recommended when the value should participate in native [form participation](../../glossary.md#form-participation).
- If the product needs richer arbitrary overlay content rather than one scalar value, the correct abstraction is usually `Popover` or `Dialog`, not `Select`.

## Common Mistakes

- Passing object values instead of `string` or `number`.
- Forgetting `SelectHiddenSelect` in native form flows.
- Leaving built-in [typeahead](../../glossary.md#typeahead) enabled when embedding a searchable input into the listbox.
- Using `readOnly` when the intended behavior is a fully [disabled](../../glossary.md#disabled) control.
