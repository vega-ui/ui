# Text Examples

## Basic

### Basic: body copy

```tsx
<Text size={3}>Invoice sent successfully.</Text>
```

## Controlled/Stateful

### Controlled/Stateful: dynamic helper copy

```tsx
const [count, setCount] = useState(3);

<Text size={2}>{count} seats remaining in the current plan.</Text>
```

## Form/Integration

### Form/Integration: helper text below a field

```tsx
<div style={{ display: 'grid', gap: 4 }}>
  <Label htmlFor='slug'>Workspace slug</Label>
  <TextField id='slug'>
    <TextFieldInput />
  </TextField>
  <Text size={2}>Used in public URLs and invite links.</Text>
</div>
```

## Layout/Overlay

### Layout/Overlay: descriptive copy in a dialog

```tsx
<Text size={3}>
  Members added here will inherit the default workspace permissions.
</Text>
```

## Error

### Error: inline validation copy

```tsx
<Text size={2} style={{ color: 'var(--color-error)' }}>
  Enter a valid workspace URL.
</Text>
```

## Disabled

### Disabled: muted explanatory text

```tsx
<Text size={2} style={{ color: 'var(--disable-label-text-color)' }}>
  Billing exports are unavailable on the current plan.
</Text>
```

## Edge

### Edge: multiline content

```tsx
<Text size={2}>{'Daily backup\nStored for 30 days'}</Text>
```
