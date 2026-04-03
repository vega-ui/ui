# Tooltip Patterns

## Icon Hint

When to use:

- An icon or compact trigger needs a short explanation.

Composition notes:

- Keep the trigger labeled independently.
- Keep the tooltip content shorter than a popover would need.

Trade-offs:

- Low-friction help.
- Weak fit for required instructions.

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <IconButton aria-label='Billing info'>
      <Icon><InfoIcon /></Icon>
    </IconButton>
  </TooltipTrigger>
  <TooltipContent>Billing is charged at the start of each monthly cycle.</TooltipContent>
</Tooltip>
```

## Field Helper

When to use:

- A field needs optional background context.

Composition notes:

- Keep the main label outside the tooltip.
- Use the tooltip only for optional explanation, not validation.

Trade-offs:

- Preserves clean forms.
- Easy to misuse for mandatory instructions.

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <IconButton appearance='transparent' aria-label='Role info'>
      <Icon><InfoIcon /></Icon>
    </IconButton>
  </TooltipTrigger>
  <TooltipContent>Editors can change content but cannot publish workflow settings.</TooltipContent>
</Tooltip>
```

## Dense Data Hint

When to use:

- Tables, metrics, or compact settings rows need a very short explanation.

Composition notes:

- Keep the copy descriptive and scannable.
- Prefer one sentence over multi-step instructions.

Trade-offs:

- Helps preserve dense layouts.
- Breaks down quickly if the explanation becomes workflow guidance.

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant='secondary'>Info</Button>
  </TooltipTrigger>
  <TooltipContent>Conversion is updated every 15 minutes from the warehouse feed.</TooltipContent>
</Tooltip>
```
