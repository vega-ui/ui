# Card Anatomy

## Overview

`Card` is a single grouped surface container with no public child parts. Its anatomy is one root surface plus whatever heading, body, metrics, or actions the consumer places inside.

## Required Parts

### `Card`

Required. Owns surface appearance, padding, and optional polymorphic rendering through `asChild`.

## Optional Parts

`Card` does not expose public child parts.

## Composition Order

1. `Card`
2. heading, text, actions, or layout children

## Valid Composition Patterns

<!-- example: card/basic-usage.tsx -->
```tsx
import { Button, Card, Heading, Text } from '@vega-ui/react';

const features = ['Up to 25 members', '100 GB of storage', 'Priority email support', 'SAML single sign-on'];

export default function BasicUsage() {
  return (
    <Card aria-labelledby='plan-team-title' style={{ width: '100%', maxWidth: 320, gap: 'var(--spacing-6)' }}>
      <Heading id='plan-team-title' as='h3' size={4} fontWeight={600}>Team</Heading>
      <Text size={3}>
        <Text size={6} fontWeight={500}>$12</Text> per member / month
      </Text>
      <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-9)', display: 'grid', gap: 'var(--spacing-2)' }}>
        {features.map((feature) => (
          <li key={feature}><Text size={2} style={{ color: 'var(--label-secondary)' }}>{feature}</Text></li>
        ))}
      </ul>
      <Button fullWidth style={{ marginBlockStart: 'var(--spacing-6)' }}>Start 14-day trial</Button>
    </Card>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Card used as the only semantic structure

The surface should not replace headings, landmarks, or real content hierarchy.

### Transparent card on a low-contrast background

The grouped content can lose visual separation entirely.
