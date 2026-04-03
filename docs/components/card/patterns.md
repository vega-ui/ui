# Card Patterns

## Settings Surface

When to use:

- A small set of related settings should share one surface.

Composition notes:

- Use headings and internal spacing explicitly.
- Keep the surface responsible for grouping, not for every spacing decision.

Trade-offs:

- Strong visual grouping.
- Easy to overuse as generic padding wrappers.

```tsx
<Card size='md'>
  <Heading size={3}>Notifications</Heading>
</Card>
```

## Metrics Or Summary Surface

When to use:

- A dashboard or billing view needs grouped summary content.

Composition notes:

- Keep key metrics visually prominent within the card.
- Use content hierarchy, not only surface styling.

Trade-offs:

- Good for summaries and grouped metadata.
- Weak fit when the content is really just one inline label.

```tsx
<Card size='sm'>
  <Text size={2}>Monthly spend</Text>
  <Heading size={4}>$12,480</Heading>
</Card>
```

## Navigational Surface

When to use:

- One grouped surface should navigate to a deeper screen.

Composition notes:

- Use `asChild` with a real anchor or router link.
- Keep the destination understandable from the card content.

Trade-offs:

- Good for dashboard entry points.
- Easy to blur layout and navigation semantics if overused.

```tsx
<Card asChild>
  <a href='/billing'>Billing</a>
</Card>
```
