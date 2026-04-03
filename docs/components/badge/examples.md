# Badge Examples

## Basic

### Basic: status badge

Use this for a short visible state label.

```tsx
<Badge variant='success' appearance='fill'>Active</Badge>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned sync status

Use this when parent state drives a small status label.

```tsx
const [status, setStatus] = useState<'syncing' | 'done'>('syncing');

<Badge variant={status === 'done' ? 'success' : 'info'}>
  {status === 'done' ? 'Done' : 'Syncing'}
</Badge>
```

## Form/Integration

### Form/Integration: required field metadata

Use this when a form surface needs a small semantic flag.

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Label htmlFor='workspace-name'>Workspace name</Label>
  <Badge size='xs' variant='info' appearance='ghost'>Required</Badge>
</div>
```

## Layout/Overlay

### Layout/Overlay: inline metadata inside a panel header

Use this when a dashboard block or overlay header needs compact supporting status.

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Text size={2}>Billing</Text>
  <Badge size='xs' variant='info' appearance='ghost'>New</Badge>
</div>
```

## Error

### Error: failure state badge

Use this for a compact error or failure flag, not a full error explanation.

```tsx
<Badge variant='error' appearance='fill'>Failed</Badge>
```

## Disabled

### Disabled: subdued archived flag

Use this when the label should remain visible but de-emphasized by surrounding layout.

```tsx
<span style={{ opacity: 0.65 }}>
  <Badge variant='warning' appearance='surface'>Archived</Badge>
</span>
```

## Edge

### Edge: tiny count badge

Use this when space is extremely constrained and the label is numeric.

```tsx
<Badge size='xs' variant='info' appearance='fill'>3</Badge>
```
