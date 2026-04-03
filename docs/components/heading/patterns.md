# Heading Patterns

## Section Heading

When to use:

- a page or panel needs a visible structural title

Composition notes:

- choose `as` from the document outline first
- choose `size` second based on visual rhythm

Trade-offs:

- preserves semantics and visual flexibility
- requires discipline when multiple headings are present

```tsx
<Heading as='h2' size={6}>Workspace settings</Heading>
```

## Compact Hierarchy In Dense Panels

When to use:

- a dense settings page needs smaller visual headings without changing semantic level

Composition notes:

- keep the correct `as`
- reduce `size` only if the hierarchy remains clear

Trade-offs:

- saves space
- can weaken visual hierarchy if overused

```tsx
<Heading as='h3' size={4}>API keys</Heading>
```

## Heading With Supporting Copy

When to use:

- the section title needs a short description

Composition notes:

- keep `Heading` as the title only
- place supporting text in `Text`

Trade-offs:

- clear separation of roles
- requires one extra text element

```tsx
<div style={{ display: 'grid', gap: 4 }}>
  <Heading as='h3' size={5}>Billing contacts</Heading>
  <Text size={2}>Invoices will be sent to the primary owner by default.</Text>
</div>
```
