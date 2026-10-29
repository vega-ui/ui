# CheckboxCard Examples

## Basic

### Basic: plan option tile

```tsx
<CheckboxCard>
  <CheckboxCardContent>
    <CheckboxCardTitle>Starter</CheckboxCardTitle>
    <CheckboxCardDescription>For small projects.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl>
    <CheckboxCardControlInput />
    <CheckboxCardControlIndicator>
      <CheckboxCardControlCheckedIcon />
      <CheckboxCardControlIndeterminateIcon />
    </CheckboxCardControlIndicator>
  </CheckboxCardControl>
</CheckboxCard>
```

## Controlled/Stateful

### Controlled/Stateful: parent-managed checked state

```tsx
<CheckboxCard>
  <CheckboxCardContent>
    <CheckboxCardTitle>Email notifications</CheckboxCardTitle>
  </CheckboxCardContent>
  <CheckboxCardControl>
    <CheckboxCardControlInput checked={checked} onChange={(e) => setChecked(e.currentTarget.checked)} />
    <CheckboxCardControlIndicator>
      <CheckboxCardControlCheckedIcon />
      <CheckboxCardControlIndeterminateIcon />
    </CheckboxCardControlIndicator>
  </CheckboxCardControl>
</CheckboxCard>
```

## Form/Integration

### Form/Integration: named input inside the control

```tsx
<CheckboxCard>
  <CheckboxCardContent>
    <CheckboxCardTitle>Include archived projects</CheckboxCardTitle>
  </CheckboxCardContent>
  <CheckboxCardControl>
    <CheckboxCardControlInput name='archived' defaultChecked />
    <CheckboxCardControlIndicator>
      <CheckboxCardControlCheckedIcon />
      <CheckboxCardControlIndeterminateIcon />
    </CheckboxCardControlIndicator>
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
  <CheckboxCardControl>
    <CheckboxCardControlInput />
    <CheckboxCardControlIndicator>
      <CheckboxCardControlCheckedIcon />
      <CheckboxCardControlIndeterminateIcon />
    </CheckboxCardControlIndicator>
  </CheckboxCardControl>
</CheckboxCard>
```

## Disabled

### Disabled: blocked upgrade option

```tsx
<CheckboxCard>
  <CheckboxCardContent>
    <CheckboxCardTitle>Premium reports</CheckboxCardTitle>
    <CheckboxCardDescription>Available on enterprise only.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl>
    <CheckboxCardControlInput disabled />
    <CheckboxCardControlIndicator>
      <CheckboxCardControlCheckedIcon />
      <CheckboxCardControlIndeterminateIcon />
    </CheckboxCardControlIndicator>
  </CheckboxCardControl>
</CheckboxCard>
```

## Edge

### Edge: indeterminate aggregate card

```tsx
<CheckboxCard>
  <CheckboxCardContent>
    <CheckboxCardTitle>Regional offices</CheckboxCardTitle>
    <CheckboxCardDescription>Some offices are enabled.</CheckboxCardDescription>
  </CheckboxCardContent>
  <CheckboxCardControl>
    <CheckboxCardControlInput indeterminate />
    <CheckboxCardControlIndicator>
      <CheckboxCardControlCheckedIcon />
      <CheckboxCardControlIndeterminateIcon />
    </CheckboxCardControlIndicator>
  </CheckboxCardControl>
</CheckboxCard>
```
