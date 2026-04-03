# HelperText Patterns

## Inline Field Guidance

When to use:

- a field needs one short clarification

Composition notes:

- keep the copy below the field
- keep the message actionable

Trade-offs:

- improves completion
- adds vertical density to forms

```tsx
<HelperText>Use a work email so invites reach the correct mailbox.</HelperText>
```

## Local Validation Message

When to use:

- the error belongs to one field

Composition notes:

- set invalid state on the field as well
- keep the error copy specific

Trade-offs:

- fast to scan
- should not replace broader form error summaries when several fields fail

```tsx
<HelperText error>Enter a valid workspace URL.</HelperText>
```

## Group Hint

When to use:

- several related controls need one short instruction

Composition notes:

- place the helper text close to the group label
- avoid repeating the same message for every child control

Trade-offs:

- reduces duplication
- can be missed if visually disconnected from the group

```tsx
<HelperText>Choose at least one notification channel.</HelperText>
```
