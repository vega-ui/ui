# Badge Patterns

## Inline Status Label

When to use:

- A row or card needs one compact status.

Composition notes:

- Keep the text very short.
- Pair with surrounding content that explains the object being labeled.

Trade-offs:

- Very compact.
- Weak fit for explanatory feedback.

```tsx
<Badge variant='success'>Active</Badge>
```

## Metadata Flag

When to use:

- Small supporting metadata should sit next to a heading or field label.

Composition notes:

- Use lower-emphasis appearance for secondary metadata.
- Keep the badge visually subordinate to the main content.

Trade-offs:

- Strong scanability.
- Easy to overuse as visual noise.

```tsx
<Badge size='xs' appearance='ghost' variant='info'>New</Badge>
```

## Count Badge

When to use:

- A short numeric or count signal is enough.

Composition notes:

- Prefer very short numeric content.
- Avoid putting large counts or long labels into a tiny badge.

Trade-offs:

- Works well for compact counts.
- Loses clarity when the text grows.

```tsx
<Badge size='xs' appearance='fill' variant='info'>3</Badge>
```
