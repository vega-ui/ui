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

```tsx
<Card size='md'>
  <Heading size={3}>Notifications</Heading>
  <Text size={2}>Manage your email and push preferences.</Text>
</Card>
```

## Invalid Composition Patterns

### Card used as the only semantic structure

The surface should not replace headings, landmarks, or real content hierarchy.

### Transparent card on a low-contrast background

The grouped content can lose visual separation entirely.
