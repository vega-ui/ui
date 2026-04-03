# Icon Examples

## Basic

### Basic: decorative status icon

```tsx
<Icon size='xs'>
  <Check />
</Icon>
```

## Controlled/Stateful

### Controlled/Stateful: dynamic icon swap

```tsx
const [expanded, setExpanded] = useState(false);

<Icon size='sm'>
  {expanded ? <ChevronUp /> : <ChevronDown />}
</Icon>
```

## Form/Integration

### Form/Integration: icon inside a button

```tsx
<Button>
  <Icon size='sm'>
    <ChevronDown />
  </Icon>
  Open menu
</Button>
```

## Layout/Overlay

### Layout/Overlay: info row

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Icon size='sm'>
    <InfoIcon />
  </Icon>
  <Text size={2}>SSO is enabled for this workspace.</Text>
</div>
```

## Error

### Error: destructive indicator

```tsx
<Icon size='sm' color='var(--color-error)'>
  <AlertTriangle />
</Icon>
```

## Disabled

### Disabled: muted control icon

```tsx
<Icon size='sm' color='var(--disable-text-color)'>
  <Lock />
</Icon>
```

## Edge

### Edge: explicit SVG sizing

```tsx
<Icon height={64}>
  <HeartPlus />
</Icon>
```
