# Fieldset Anatomy

## Overview

`Fieldset` is a small [compound component](../../glossary.md#compound-component). The root provides native group semantics, `FieldsetLegend` names the group, and `FieldsetHeader` adds optional supporting copy.

## Required Parts

### `Fieldset`

Required. Renders the `<fieldset>` element and owns visual appearance.

### `FieldsetLegend`

Required for accessible group labeling. Renders the group name in the native legend slot.

## Optional Parts

### `FieldsetHeader`

Optional descriptive block placed after the legend. Use it for supporting copy, not as a replacement for the legend.

## Composition Order

1. `Fieldset`
2. `FieldsetLegend`
3. `FieldsetHeader`
4. grouped controls

## Valid Composition Patterns

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

## Invalid Composition Patterns

### Missing `FieldsetLegend`

The controls remain grouped visually, but the semantic group label disappears.

### Decorative heading outside the root used as the only label

This looks correct visually but does not provide native legend semantics.

### Deeply nested groups without clear copy

Nested fieldsets become hard to understand when legends do not establish a clear hierarchy.
