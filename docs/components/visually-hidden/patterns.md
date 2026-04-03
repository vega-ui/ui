# VisuallyHidden Patterns

## Icon-Only Control Label

When to use:

- a control is visually icon-only but still needs an accessible name

Composition notes:

- keep the hidden label concise
- prefer one clear hidden phrase

Trade-offs:

- preserves compact visuals
- visible clarity still depends on icon recognition

```tsx
<IconButton aria-label=''>
  <Icon />
  <VisuallyHidden>Search</VisuallyHidden>
</IconButton>
```

## Hidden ARIA Description

When to use:

- a field needs extra assistive-only context

Composition notes:

- give the hidden node an id
- reference it from the control with `aria-describedby`

Trade-offs:

- flexible and reusable
- easy to forget to update the hidden copy

```tsx
<>
  <VisuallyHidden asChild>
    <span id='password-hint'>Use at least 12 characters.</span>
  </VisuallyHidden>
  <PasswordFieldInput aria-describedby='password-hint' />
</>
```

## Hidden Status Copy

When to use:

- visual loading or status UI needs assistive-only text

Composition notes:

- keep the text synchronized with the real state
- do not duplicate misleading stale messages

Trade-offs:

- improves non-visual clarity
- state drift is easy if the parent logic is sloppy

```tsx
<>
  <Spinner size={2} />
  <VisuallyHidden>Loading workspace settings</VisuallyHidden>
</>
```
