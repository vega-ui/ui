# Card Examples

## Basic

### Basic: settings card

Use this when related content should share one surface.

```tsx
<Card size='md'>
  <Heading size={3}>Notifications</Heading>
  <Text size={2}>Manage your email and push preferences.</Text>
</Card>
```

## Controlled/Stateful

### Controlled/Stateful: state-driven metrics card

Use this when the card surface stays stable while the content updates from parent state.

```tsx
const [spend, setSpend] = useState('$12,480');

<Card size='sm'>
  <Text size={2}>Monthly spend</Text>
  <Heading size={4}>{spend}</Heading>
</Card>
```

## Form/Integration

### Form/Integration: grouped form section

Use this when a form subsection should be grouped visually.

```tsx
<Card size='md'>
  <Heading size={3}>Workspace limits</Heading>
  <TextField>
    <TextFieldInput placeholder='Seat limit' />
  </TextField>
</Card>
```

## Layout/Overlay

### Layout/Overlay: transparent card inside a richer panel

Use this when the parent surface already provides the main contrast.

```tsx
<Card appearance='transparent' size='sm'>
  <Text size={2}>Secondary content inside a parent panel.</Text>
</Card>
```

## Error

### Error: warning summary card

Use this when a grouped surface highlights an issue through its content rather than badge-only styling.

```tsx
<Card size='md'>
  <Heading size={3}>Billing issue</Heading>
  <Text size={2}>Your payment method needs to be updated before the next renewal.</Text>
</Card>
```

## Disabled

### Disabled: subdued archived card

Use this when the content remains visible but less active.

```tsx
<Card size='sm' style={{ opacity: 0.65 }}>
  <Text size={2}>Archived workspace</Text>
</Card>
```

## Edge

### Edge: polymorphic anchor card

Use this when the whole surface should navigate while keeping card visuals.

```tsx
<Card asChild>
  <a href='/billing'>
    <Heading size={3}>Billing</Heading>
  </a>
</Card>
```
