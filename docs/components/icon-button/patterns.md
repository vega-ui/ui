# IconButton Patterns

## Compact Toolbar Action

When to use:

- Dense toolbars or headers need compact actions.

Composition notes:

- Keep labels explicit through `aria-label`.
- Reserve icon-only treatment for familiar actions.

Trade-offs:

- Saves space.
- Less explicit than text buttons.

```tsx
<IconButton aria-label='Close'>
  <Icon><X /></Icon>
</IconButton>
```

## Inline Clear Action

When to use:

- A small local control clears or removes adjacent state.

Composition notes:

- Place the button close to the thing it affects.
- Keep the action narrowly scoped.

Trade-offs:

- Very compact.
- Easy to overuse in forms without enough context.

```tsx
<IconButton aria-label='Clear filter' appearance='transparent'>
  <Icon><X /></Icon>
</IconButton>
```

## Navigational Icon Surface

When to use:

- Navigation needs icon-button visuals while preserving link semantics.

Composition notes:

- Use `asChild` with a real anchor.
- Keep the destination obvious from the surrounding context and accessible label.

Trade-offs:

- Strong visual consistency.
- Easy to misuse for ambiguous navigation.

```tsx
<IconButton asChild aria-label='Open documentation'>
  <a href='/docs'>
    <Icon><GlobeIcon /></Icon>
  </a>
</IconButton>
```
