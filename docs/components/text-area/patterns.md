# TextArea Patterns

## Long-Form Feedback

When to use:

- users need space for detailed comments

Composition notes:

- keep a visible label above the field
- add helper text when the expected content is not obvious

Trade-offs:

- supports richer input
- takes more layout space than a single-line field

```tsx
<>
  <Label htmlFor='details'>Details</Label>
  <TextArea id='details' placeholder='Describe the situation' />
</>
```

## Full-Width Notes Area

When to use:

- the form layout already spans a wide panel

Composition notes:

- use `fullWidth`
- keep surrounding width constraints predictable

Trade-offs:

- easier to scan long text
- can dominate narrow layouts

```tsx
<TextArea fullWidth placeholder='Add rollout notes' />
```

## Compact Internal Note

When to use:

- the field is multiline but still secondary

Composition notes:

- reduce density with `size='sm'`
- keep the prompt concise

Trade-offs:

- saves space
- less comfortable for long responses

```tsx
<TextArea size='sm' placeholder='Short internal note' />
```
