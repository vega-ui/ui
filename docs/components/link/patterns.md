# Link Patterns

## Inline Reference Link

When to use:

- Navigation belongs naturally inside a sentence or help copy.

Composition notes:

- Keep the linked words descriptive.
- Do not break reading flow with vague or overly long linked phrases.

Trade-offs:

- Strong for documentation and secondary navigation.
- Weaker for primary actions.

```tsx
<Text size={2}>
  Read the <Link href='/docs'>documentation</Link> before publishing.
</Text>
```

## Standalone Secondary Navigation

When to use:

- A page or panel needs one lightweight secondary navigation target.

Composition notes:

- Keep the link scannable and destination-oriented.
- Use surrounding copy when the destination context is not obvious.

Trade-offs:

- Light visual weight.
- Easier to overlook than a button.

```tsx
<Link href='/billing'>Open billing settings</Link>
```

## Router-Composed Link

When to use:

- The app uses a routing library and still wants VegaUI link styling.

Composition notes:

- Use `asChild` with a real router link component.
- Preserve navigation semantics at the rendered root.

Trade-offs:

- Keeps styling consistent across routing layers.
- Requires the child component to support the expected semantics.

```tsx
<Link asChild>
  <RouterLink to='/settings'>Settings</RouterLink>
</Link>
```
