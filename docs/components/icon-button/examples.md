# IconButton Examples

## Basic

### Basic: compact close action

Use this when one compact icon-only action is already recognizable.

```tsx
<IconButton aria-label='Close'>
  <Icon><X /></Icon>
</IconButton>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned favorite toggle

Use a controlled wrapper when the icon changes with external state.

```tsx
const [favorite, setFavorite] = useState(false);

<IconButton
  aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
  variant='secondary'
  appearance='ghost'
  onClick={() => setFavorite((v) => !v)}
>
  <Icon>{favorite ? <HeartFilled /> : <Heart />}</Icon>
</IconButton>
```

## Form/Integration

### Form/Integration: clear selected filter

Use this when a small action sits next to another input or selected filter.

```tsx
<IconButton variant='secondary' appearance='transparent' aria-label='Remove status filter'>
  <Icon><X /></Icon>
</IconButton>
```

## Layout/Overlay

### Layout/Overlay: toolbar navigation controls

Use this when icon-only actions belong in dense toolbars or overlay headers.

```tsx
<div style={{ display: 'flex', gap: 8 }}>
  <IconButton aria-label='Previous'><Icon><ChevronLeft /></Icon></IconButton>
  <IconButton aria-label='Next'><Icon><ChevronRight /></Icon></IconButton>
</div>
```

## Error

### Error: destructive icon action requiring strong labeling

Use this only when the action is already contextually obvious and the label remains explicit.

```tsx
<IconButton aria-label='Remove favorite' variant='secondary' appearance='ghost'>
  <Icon><Trash /></Icon>
</IconButton>
```

## Disabled

### Disabled: blocked icon action

Use this when the action is visible but currently unavailable.

```tsx
<IconButton aria-label='Delete' disabled>
  <Icon><Trash /></Icon>
</IconButton>
```

## Edge

### Edge: polymorphic anchor with icon-button visuals

Use this when the interaction navigates but still needs icon-button presentation.

```tsx
<IconButton asChild aria-label='Open documentation'>
  <a href='/docs'>
    <Icon><GlobeIcon /></Icon>
  </a>
</IconButton>
```
