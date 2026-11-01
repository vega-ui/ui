# Option Patterns

## Rich Selector Row

When to use:

- an option needs iconography or secondary visual context

Composition notes:

- keep the row a single selection surface

Trade-offs:

- scanable and expressive
- more complex than plain text rows

```tsx
<Option>
  <Icon size='sm'>
    <Star />
  </Icon>
  Pro
</Option>
```

## Parent-Owned Selection

When to use:

- the list state lives in a custom parent control

Composition notes:

- derive `selected` and click handlers from the parent state
- keep roving-focus behavior outside the row

Trade-offs:

- flexible
- requires a real parent selection model

```tsx
<Option selected={value === 'review'} onClick={() => setValue('review')}>
  In review
</Option>
```

## Disabled Business State

When to use:

- an option is visible but unavailable

Composition notes:

- keep the reason visible elsewhere when needed
- leave the row non-interactive

Trade-offs:

- preserves discoverability
- unavailable options still need explanatory context

```tsx
<Option disabled>
  Enterprise
</Option>
```
