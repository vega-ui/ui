# Slot Examples

## Basic

### Basic: link rendered through button styling

```tsx
<ButtonBase asChild>
  <a href='/pricing'>Pricing</a>
</ButtonBase>
```

## Controlled/Stateful

### Controlled/Stateful: slotted trigger element

```tsx
<DialogTrigger asChild>
  <button type='button'>Open dialog</button>
</DialogTrigger>
```

## Form/Integration

### Form/Integration: semantic link in action surface

```tsx
<Button asChild>
  <a href='/members'>Manage members</a>
</Button>
```

## Layout/Overlay

### Layout/Overlay: custom overlay trigger

```tsx
<PopoverTrigger asChild>
  <button type='button'>Open details</button>
</PopoverTrigger>
```

## Error

### Error: invalid direct text child

```tsx
// invalid: Slot expects one valid React element child
```

## Disabled

### Disabled: slotted disabled button

```tsx
<ButtonBase asChild>
  <button type='button' disabled>Disabled action</button>
</ButtonBase>
```

## Edge

### Edge: preserving semantics intentionally

```tsx
<ButtonBase asChild>
  <a href='/docs'>Docs</a>
</ButtonBase>
```
