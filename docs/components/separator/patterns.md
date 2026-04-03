# Separator Patterns

## Toolbar Divider

When to use:

- adjacent actions need a subtle visual boundary

Composition notes:

- use `orientation='vertical'`
- give the parent a real height

Trade-offs:

- low visual weight
- depends on parent sizing

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
  <Button appearance='ghost'>Back</Button>
  <Separator orientation='vertical' />
  <Button appearance='ghost'>Forward</Button>
</div>
```

## Section Break Inside A Panel

When to use:

- a panel has two related but distinct regions

Composition notes:

- keep the separator between already-labeled regions
- add spacing with layout, not with the separator itself

Trade-offs:

- keeps the surface clean
- does not explain the reason for the separation

```tsx
<div style={{ display: 'grid', gap: 16 }}>
  <Heading as='h3' size={4}>Profile</Heading>
  <Separator />
  <Heading as='h3' size={4}>Security</Heading>
</div>
```

## Dense Form Break

When to use:

- one form surface contains several short groups

Composition notes:

- use `Separator` together with explicit labels or legends
- avoid relying on the line alone

Trade-offs:

- keeps large forms readable
- still needs semantic section labeling nearby

```tsx
<div style={{ display: 'grid', gap: 12 }}>
  <Fieldset appearance='transparent'>
    <FieldsetLegend>Profile</FieldsetLegend>
  </Fieldset>
  <Separator />
  <Fieldset appearance='transparent'>
    <FieldsetLegend>Security</FieldsetLegend>
  </Fieldset>
</div>
```
