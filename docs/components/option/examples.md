# Option Examples

## Basic

### Basic: simple option row

```tsx
<Option value='alpha'>Alpha</Option>
```

## Controlled/Stateful

### Controlled/Stateful: selected state from parent

```tsx
const [value, setValue] = useState('pro');

<Option value='pro' selected={value === 'pro'} onClick={() => setValue('pro')}>
  Pro
</Option>
```

## Form/Integration

### Form/Integration: option in custom selector list

```tsx
<Option value='enterprise'>Enterprise</Option>
```

## Layout/Overlay

### Layout/Overlay: rich option content

```tsx
<Option value='pro'>
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
  <Option value='legacy' disabled>
    Legacy
  </Option>
  <HelperText error>This plan is no longer available for new workspaces.</HelperText>
</>
```

## Disabled

### Disabled: blocked option row

```tsx
<Option value='enterprise' disabled>
  Enterprise
</Option>
```

## Edge

### Edge: focusable but not selected row

```tsx
<Option value='review' focusable>
  In review
</Option>
```
