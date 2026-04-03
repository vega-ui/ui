# Separator Examples

## Basic

### Basic: horizontal section divider

```tsx
<Separator />
```

## Controlled/Stateful

### Controlled/Stateful: conditional divider

```tsx
const [showArchive, setShowArchive] = useState(true);

<>
  <Text>Active projects</Text>
  {showArchive && <Separator />}
  {showArchive && <Text>Archived projects</Text>}
</>
```

## Form/Integration

### Form/Integration: divider between field groups

```tsx
<div style={{ display: 'grid', gap: 16 }}>
  <Fieldset appearance='transparent'>
    <FieldsetLegend>Profile</FieldsetLegend>
  </Fieldset>
  <Separator />
  <Fieldset appearance='transparent'>
    <FieldsetLegend>Security</FieldsetLegend>
  </Fieldset>
</div>
```

## Layout/Overlay

### Layout/Overlay: vertical divider in toolbar

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
  <Button appearance='ghost'>Back</Button>
  <Separator orientation='vertical' />
  <Button appearance='ghost'>Forward</Button>
</div>
```

## Error

### Error: divider before destructive section

```tsx
<>
  <Separator />
  <Heading as='h3' size={4} style={{ color: 'var(--color-error)' }}>
    Delete workspace
  </Heading>
</>
```

## Disabled

### Disabled: muted section break in disabled panel

```tsx
<div style={{ opacity: 0.6 }}>
  <Separator />
</div>
```

## Edge

### Edge: constrained vertical divider

```tsx
<div style={{ display: 'flex', alignItems: 'stretch', height: 48 }}>
  <Separator orientation='vertical' />
</div>
```
