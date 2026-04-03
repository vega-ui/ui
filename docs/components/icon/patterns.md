# Icon Patterns

## Inline Control Icon

When to use:

- a button or trigger needs one decorative glyph

Composition notes:

- keep icon size aligned with the control density
- let `currentColor` inherit from the parent control

Trade-offs:

- consistent and compact
- easy to overuse decorative glyphs

```tsx
<Button>
  <Icon size='sm'>
    <ChevronDown />
  </Icon>
</Button>
```

## Status Row Icon

When to use:

- text needs a small adjacent symbol

Composition notes:

- keep the icon secondary to the text
- do not rely on the icon as the only status signal

Trade-offs:

- fast visual scanning
- still needs text for clarity

```tsx
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <Icon size='sm'>
    <InfoIcon />
  </Icon>
  <Text size={2}>SSO is enabled for this workspace.</Text>
</div>
```

## Custom SVG Wrapper

When to use:

- a custom or third-party SVG should use the same VegaUI sizing contract

Composition notes:

- keep the child SVG compatible with forwarded SVG props
- use explicit dimensions only when token sizing is not enough

Trade-offs:

- consistent icon integration
- easier to produce drift if every icon is explicitly sized

```tsx
<Icon size='xl'>
  <CustomLogo />
</Icon>
```
