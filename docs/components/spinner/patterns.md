# Spinner Patterns

## Inline Status Row

When to use:

- one action is pending and nearby text can explain it

Composition notes:

- pair the spinner with short status text
- keep the size small

Trade-offs:

- compact and clear
- depends on nearby copy for meaning

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Spinner size={2} />
  <Text size={2}>Syncing member permissions</Text>
</div>
```

## Centered Surface Loader

When to use:

- a panel or section is loading and content is not yet ready

Composition notes:

- center the spinner within a reserved area
- choose a larger size than inline usage

Trade-offs:

- easy to notice
- removes content detail while loading

```tsx
<div style={{ display: 'grid', placeItems: 'center', minHeight: 120 }}>
  <Spinner size={5} variant='secondary' />
</div>
```

## Button Pending State

When to use:

- an action is in progress and the button is temporarily disabled

Composition notes:

- keep the spinner compact
- disable the button while pending

Trade-offs:

- clear immediate feedback
- if text disappears entirely, context may be weaker

```tsx
<Button disabled>
  <Spinner size={2} />
</Button>
```
