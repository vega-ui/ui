# Avatar Examples

## Basic

### Basic: fallback initials avatar

Use this when an image may not be available.

```tsx
<Avatar size='md'>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Controlled/Stateful

### Controlled/Stateful: image-first avatar with fallback

Use this when parent state decides which user or entity is shown.

```tsx
const user = { name: 'Jane Doe', initials: 'JD', src: '/user.png' };

<Avatar size='md'>
  <AvatarImage src={user.src} alt={user.name} />
  <AvatarFallback>{user.initials}</AvatarFallback>
</Avatar>
```

## Form/Integration

### Form/Integration: assignee row

Use this when the avatar supports surrounding form or selection content.

```tsx
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar size='sm'>
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Text size={2}>Jane Doe</Text>
</div>
```

## Layout/Overlay

### Layout/Overlay: profile summary row

Use this inside drawers, dialogs, and menu headers where identity context matters.

```tsx
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar size='sm'>
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Text size={2}>Jane Doe</Text>
</div>
```

## Error

### Error: fallback-first avatar when image is unavailable

Use this when the image should fail safely into initials.

```tsx
<Avatar size='md'>
  <AvatarImage src='/missing-user.png' alt='Jane Doe' />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Disabled

### Disabled: subdued archived entity avatar

Use this when the represented entity is visible but de-emphasized.

```tsx
<div style={{ opacity: 0.65 }}>
  <Avatar size='sm'>
    <AvatarFallback>AR</AvatarFallback>
  </Avatar>
</div>
```

## Edge

### Edge: icon-only avatar

Use this when an entity is generic or user-specific imagery is unavailable.

```tsx
<Avatar variant='secondary'>
  <AvatarIcon />
</Avatar>
```
