# Alert Patterns

## Inline Feedback Message

When to use:

- A local flow needs short visible feedback.

Composition notes:

- Keep the message concise.
- Use title only when extra hierarchy helps.

Trade-offs:

- Strong semantic feedback.
- Weak fit for long explanations.

```tsx
<Alert variant='success'>
  <AlertIcon />
  <AlertMain>
    <AlertTitle>Saved</AlertTitle>
    <AlertContent>Profile updated successfully.</AlertContent>
  </AlertMain>
</Alert>
```

## Settings Warning

When to use:

- A settings page or panel needs one visible caution or prerequisite.

Composition notes:

- Keep the alert near the setting it affects.
- Do not let the warning become the only place where the setting is explained.

Trade-offs:

- Good local visibility.
- Can create noise if every section has multiple alerts.

```tsx
<Alert variant='warning' appearance='surface'>
  <AlertIcon />
  <AlertMain>
    <AlertTitle>Review required</AlertTitle>
    <AlertContent>Changing the billing owner affects invoice delivery and seat management.</AlertContent>
  </AlertMain>
</Alert>
```

## Dismissible Feedback

When to use:

- The alert may be removed after acknowledgment.

Composition notes:

- Consumer state should own dismissal.
- Keep the dismiss action secondary to the message itself.

Trade-offs:

- Useful for temporary feedback.
- Easy to overuse if important alerts can disappear too soon.

```tsx
<Alert>
  <AlertMain>
    <AlertTitle>Connection restored</AlertTitle>
    <AlertContent>Background sync resumed successfully.</AlertContent>
  </AlertMain>
  <IconButton aria-label='Dismiss'>
    <Icon><X /></Icon>
  </IconButton>
</Alert>
```
