# Avatar Patterns

## User Identity Row

When to use:

- A list or settings view needs quick visual identity context.

Composition notes:

- Pair the avatar with visible name text.
- Keep fallback initials short and stable.

Trade-offs:

- Strong scanability for people and entities.
- Weak fit when identity is not important to the task.

```tsx
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Avatar size='sm'>
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <Text size={2}>Jane Doe</Text>
</div>
```

## Image-First Avatar With Safe Fallback

When to use:

- A profile image is available but should fail safely.

Composition notes:

- Always pair `AvatarImage` with fallback content.
- Keep fallback text concise for the chosen size.

Trade-offs:

- Strong resilience when images fail.
- Requires good alt and fallback strategy.

```tsx
<Avatar>
  <AvatarImage src='/user.png' alt='Jane Doe' />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Generic Entity Avatar

When to use:

- The represented item is not a specific person or image-backed entity.

Composition notes:

- Use `AvatarIcon` when initials or images would be misleading.
- Keep surrounding labels explicit about the represented entity.

Trade-offs:

- Clear generic representation.
- Less personalized than image or initials.

```tsx
<Avatar variant='secondary'>
  <AvatarIcon />
</Avatar>
```
