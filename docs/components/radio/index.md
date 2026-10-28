# Radio

## Doc Profile

`advanced interactive`

## Summary

`Radio` is the single-choice selection control for mutually exclusive options that share the same `name`. It is the most form-like exclusive-choice primitive in the selection family.

## Imports

```tsx
import {
  Radio,
  type RadioProps,
  type RadioSize,
  type RadioVariant,
} from '@vega-ui/react';
```

## Exported Types

- `RadioProps`
- `RadioSize`
- `RadioVariant`

## Minimal Composition

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Radio name='plan' value='pro' />
  Pro
</label>
```

## Required Parts

- `Radio`: native radio input surface

## Optional Parts

- No extra public parts beyond the input itself

## Composition Order

1. visible label wrapper
2. `Radio`
3. label text

## Variants

- Sizes: `sm`, `md`, `lg`
- Variants: `primary`, `secondary`
- States: unchecked, checked, disabled, checked-disabled

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

- Radios only behave as one group when the consumer gives related inputs the same `name`.
- Labels should describe the option, not the action of clicking it.
- Radios are the wrong choice for independent boolean settings.
- If options need richer descriptions or tile-sized targets, `SegmentedControl` or `CheckboxCard` may be clearer depending on exclusivity.

## Common Mistakes

- Using radios without a shared `name`.
- Using radios for multi-select choices.
- Building a radio row where only the tiny control is clickable.
