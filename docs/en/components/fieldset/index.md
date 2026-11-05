# Fieldset

## Doc Profile

`advanced interactive`

## Summary

`Fieldset` groups related controls under one semantic boundary. It exposes `FieldsetLegend` and `FieldsetHeader` so grouped form sections can keep both native `<fieldset>` semantics and VegaUI layout structure, instead of relying on purely visual containers.

## Imports

```tsx
import {
  Fieldset,
  FieldsetHeader,
  FieldsetLegend,
  type FieldsetAppearance,
  type FieldsetHeaderProps,
  type FieldsetLegendProps,
  type FieldsetProps,
} from '@vega-ui/react';
```

## Exported Types

- `FieldsetProps`
- `FieldsetLegendProps`
- `FieldsetHeaderProps`
- `FieldsetAppearance = 'transparent' | 'outlined' | string`

## Minimal Composition

<!-- example: fieldset/notification-channels.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetHeader,
  FieldsetLegend,
  Text,
} from '@vega-ui/react';
import { useId } from 'react';

const CHANNELS = [
  { value: 'email', label: 'Email', checked: true },
  { value: 'slack', label: 'Slack #billing-alerts', checked: true },
  { value: 'sms', label: 'SMS to the account owner', checked: false },
];

export default function NotificationChannels() {
  const id = useId();

  return (
    <Fieldset appearance='outlined' aria-describedby={`${id}-description`} style={{ width: '100%' }}>
      <FieldsetLegend>Payment failure alerts</FieldsetLegend>
      <FieldsetHeader>
        <Text id={`${id}-description`} size={2} style={{ color: 'var(--label-secondary)' }}>
          Sent when a card is declined or an invoice is overdue.
        </Text>
      </FieldsetHeader>
      {CHANNELS.map((channel) => (
        <Checkbox key={channel.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput name='alertChannels' value={channel.value} defaultChecked={channel.checked} />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          {channel.label}
        </Checkbox>
      ))}
    </Fieldset>
  );
}
```
<!-- /example -->

## Required Parts

- `Fieldset`: semantic group boundary and layout container
- `FieldsetLegend`: primary group label for assistive technology

## Optional Parts

- `FieldsetHeader`: extra header copy between the legend and grouped controls

## Composition Order

1. `Fieldset`
2. `FieldsetLegend`
3. `FieldsetHeader`
4. grouped controls

## Variants

- Appearance: `outlined` or `transparent`
- Content density: legend only or legend plus header copy
- Composition: plain semantic grouping or richer settings section layout

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- `FieldsetLegend` should stay the first meaningful label inside the group.
- `transparent` keeps semantics but removes visual framing, which makes surrounding layout responsible for separation.
- Nested fieldsets are valid, but the legend hierarchy must stay obvious.
- Group-level helper or error copy should read as belonging to the whole control group, not to one individual control by accident.

## Common Mistakes

- Replacing `FieldsetLegend` with plain text and losing group semantics.
- Using `FieldsetHeader` as the only label for the group.
- Using `transparent` when the section no longer reads as a distinct form group.
