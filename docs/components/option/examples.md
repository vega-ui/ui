# Option Examples

## Basic

### Basic: simple option row

```tsx
<Option>Alpha</Option>
```

## Controlled/Stateful

### Controlled/Stateful: selected state from parent

```tsx
const [value, setValue] = useState('pro');

<Option selected={value === 'pro'} onClick={() => setValue('pro')}>
  Pro
</Option>
```

## Form/Integration

### Form/Integration: option in custom selector list

```tsx
<Option>Enterprise</Option>
```

## Layout/Overlay

### Layout/Overlay: rich option content

```tsx
<Option>
  <Icon size='sm'>
    <Star />
  </Icon>
  Pro
</Option>
```

## Error

### Error: unavailable plan hint

```tsx
<>
  <Option disabled>
    Legacy
  </Option>
  <HelperText error>This plan is no longer available for new workspaces.</HelperText>
</>
```

## Disabled

### Disabled: blocked option row

```tsx
<Option disabled>
  Enterprise
</Option>
```

## Edge

### Edge: active but not selected row

```tsx
<Option active>
  In review
</Option>
```
