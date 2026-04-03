# ButtonBase Examples

## Basic

### Basic: reset action in a filter bar

```tsx
<ButtonBase type='button' variant='secondary' appearance='ghost'>
  Reset filters
</ButtonBase>
```

## Controlled/Stateful

### Controlled/Stateful: busy action with external pending state

```tsx
<ButtonBase type='button' disabled={isSaving}>
  {isSaving ? 'Saving…' : 'Save changes'}
</ButtonBase>
```

## Form/Integration

### Form/Integration: submit button with explicit type

```tsx
<ButtonBase type='submit' variant='primary' appearance='fill'>
  Continue
</ButtonBase>
```

## Layout/Overlay

### Layout/Overlay: router link with shared button styling

```tsx
<ButtonBase asChild appearance='outline'>
  <a href='/settings/billing'>Open billing settings</a>
</ButtonBase>
```

## Disabled

### Disabled: blocked action while permissions are loading

```tsx
<ButtonBase disabled appearance='transparent' variant='secondary'>
  Change owner
</ButtonBase>
```

## Edge

### Edge: icon-only action with explicit label

```tsx
<ButtonBase type='button' aria-label='Close panel' appearance='ghost'>
  <Icon />
</ButtonBase>
```
