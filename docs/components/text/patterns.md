# Text Patterns

## Helper Copy Below A Field

When to use:

- a field needs short explanatory text

Composition notes:

- keep helper copy secondary in tone
- place it close to the associated field

Trade-offs:

- improves clarity
- adds vertical density

```tsx
<div style={{ display: 'grid', gap: 4 }}>
  <Label htmlFor='slug'>Workspace slug</Label>
  <TextField id='slug'>
    <TextFieldInput />
  </TextField>
  <Text size={2}>Used in invite links and public URLs.</Text>
</div>
```

## Status Copy

When to use:

- a UI surface needs concise state text

Composition notes:

- keep the copy short
- choose color based on state semantics

Trade-offs:

- fast to scan
- color-only meaning should still be avoided

```tsx
<Text size={2} style={{ '--t-color': 'var(--label-secondary)' } as React.CSSProperties}>
  Last synced 4 minutes ago
</Text>
```

## Multiline Descriptive Copy

When to use:

- the content contains intentional newline breaks

Composition notes:

- `Text` uses `white-space: pre-line`
- keep line breaks meaningful rather than decorative

Trade-offs:

- preserves authored copy structure
- unexpected newlines in data will also be rendered

```tsx
<Text size={2}>{'Daily export\nCSV retained for 30 days'}</Text>
```
