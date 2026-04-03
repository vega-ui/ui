# CheckboxCard Examples

## Basic

### Basic: plan option tile

```tsx
<CheckboxCard>
  <CheckboxCardContent>
    <CheckboxCardTitle>Starter</CheckboxCardTitle>
    <CheckboxCardDescription>For small projects.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl />
</CheckboxCard>
```

## Controlled/Stateful

### Controlled/Stateful: parent-managed checked state

```tsx
<CheckboxCard checked={checked} onChangeChecked={setChecked}>
  <CheckboxCardContent>
    <CheckboxCardTitle>Email notifications</CheckboxCardTitle>
  </CheckboxCardContent>
  <CheckboxCardControl />
</CheckboxCard>
```

## Form/Integration

### Form/Integration: hidden input inside the control

```tsx
<CheckboxCard defaultChecked>
  <CheckboxCardContent>
    <CheckboxCardTitle>Include archived projects</CheckboxCardTitle>
  </CheckboxCardContent>
  <CheckboxCardControl>
    <CheckboxCardControlHiddenInput />
  </CheckboxCardControl>
</CheckboxCard>
```

## Layout/Overlay

### Layout/Overlay: horizontal settings tile

```tsx
<CheckboxCard orientation='horizontal'>
  <CheckboxCardContent>
    <CheckboxCardTitle>SMS alerts</CheckboxCardTitle>
    <CheckboxCardDescription>Critical incidents only.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl />
</CheckboxCard>
```

## Disabled

### Disabled: blocked upgrade option

```tsx
<CheckboxCard disabled>
  <CheckboxCardContent>
    <CheckboxCardTitle>Premium reports</CheckboxCardTitle>
    <CheckboxCardDescription>Available on enterprise only.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl />
</CheckboxCard>
```

## Edge

### Edge: indeterminate aggregate card

```tsx
<CheckboxCard indeterminate>
  <CheckboxCardContent>
    <CheckboxCardTitle>Regional offices</CheckboxCardTitle>
    <CheckboxCardDescription>Some offices are enabled.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl>
    <CheckboxCardControlIndeterminateIcon />
  </CheckboxCardControl>
</CheckboxCard>
```
