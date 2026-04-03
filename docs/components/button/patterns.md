# Button Patterns

## Primary Form Action

When to use:

- A form needs one clear primary action.

Composition notes:

- Keep the primary action visually stronger than nearby secondary actions.
- Use `type='submit'` deliberately.

Trade-offs:

- Strong action clarity.
- Can become visually noisy if too many buttons compete for emphasis.

```tsx
<Button type='submit'>Save changes</Button>
```

## Secondary Action Pair

When to use:

- A local flow needs primary and secondary actions side by side.

Composition notes:

- Use a lower-emphasis treatment for cancel or back actions.
- Keep the button texts complementary rather than ambiguous.

Trade-offs:

- Easy to scan.
- Can become confusing if both buttons use the same emphasis.

```tsx
<div style={{ display: 'flex', gap: 12 }}>
  <Button variant='secondary' appearance='outline'>Cancel</Button>
  <Button>Save</Button>
</div>
```

## Navigation With Button Visuals

When to use:

- Navigation needs to look like a button while staying semantically navigational.

Composition notes:

- Use `asChild` with a real anchor.
- Preserve link semantics when the interaction truly navigates.

Trade-offs:

- Strong visual emphasis for navigation.
- Easy to misuse when a plain link would be clearer.

```tsx
<Button asChild>
  <a href='/billing'>Open billing</a>
</Button>
```
