# CheckboxCard Patterns

## Plan Selection Tile

When to use:
Present plan features or package options where the whole card should be clickable.

Composition notes:
Keep title and description in `CheckboxCardContent` and render the control on the opposite edge.

Trade-offs:
The pattern is expressive, but consumes more space than a normal checkbox row.

```tsx
<CheckboxCard>
  <CheckboxCardContent>
    <CheckboxCardTitle>Pro plan</CheckboxCardTitle>
    <CheckboxCardDescription>Advanced roles, exports, and audit history for growing teams.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl />
</CheckboxCard>
```

## Settings Tile With Native Form Participation

When to use:
The app wants a rich tile UI, but still submits through a native form.

Composition notes:
Render `CheckboxCardControlHiddenInput` inside the control region.

Trade-offs:
Form integration becomes easier, but layout and semantics still need to keep the full card readable.

```tsx
<CheckboxCardControl>
  <CheckboxCardControlHiddenInput />
</CheckboxCardControl>
```
