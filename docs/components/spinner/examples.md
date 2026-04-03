# Spinner Examples

## Basic

### Basic: inline loading state

```tsx
<Button disabled>
  <Spinner size={3} />
</Button>
```

## Controlled/Stateful

### Controlled/Stateful: conditional async state

```tsx
const [loading, setLoading] = useState(true);

{loading ? <Spinner size={3} /> : <Text size={2}>Completed</Text>}
```

## Form/Integration

### Form/Integration: status row

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Spinner size={2} />
  <Text size={2}>Syncing member permissions</Text>
</div>
```

## Layout/Overlay

### Layout/Overlay: centered section loader

```tsx
<div style={{ display: 'grid', placeItems: 'center', minHeight: 120 }}>
  <Spinner size={5} variant='secondary' />
</div>
```

## Error

### Error: retry row still pending

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Spinner size={2} />
  <Text size={2}>Retrying failed sync…</Text>
</div>
```

## Disabled

### Disabled: button pending state

```tsx
<Button disabled>
  <Spinner size={2} />
</Button>
```

## Edge

### Edge: large surface loading

```tsx
<div style={{ display: 'grid', placeItems: 'center', minHeight: 240 }}>
  <Spinner size={7} />
</div>
```
