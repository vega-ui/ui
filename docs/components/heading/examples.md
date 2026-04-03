# Heading Examples

## Basic

### Basic: section heading

```tsx
<Heading as='h2' size={6}>Workspace settings</Heading>
```

## Controlled/Stateful

### Controlled/Stateful: heading with dynamic count

```tsx
const [count, setCount] = useState(12);

<Heading as='h3' size={5}>Members ({count})</Heading>
```

## Form/Integration

### Form/Integration: fieldset section title

```tsx
<>
  <Heading as='h3' size={4}>Billing details</Heading>
  <Fieldset appearance='transparent'>
    <FieldsetLegend>Company information</FieldsetLegend>
  </Fieldset>
</>
```

## Layout/Overlay

### Layout/Overlay: dialog title hierarchy

```tsx
<Heading as='h2' size={6}>Invite members</Heading>
```

## Error

### Error: destructive section heading

```tsx
<Heading as='h3' size={4} style={{ color: 'var(--color-error)' }}>
  Delete workspace
</Heading>
```

## Disabled

### Disabled: muted configuration heading

```tsx
<Heading as='h4' size={3} style={{ color: 'var(--disable-text-color)' }}>
  Legacy integration
</Heading>
```

## Edge

### Edge: visual size smaller than semantic level

```tsx
<Heading as='h2' size={4}>Compact section title</Heading>
```
