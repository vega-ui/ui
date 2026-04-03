# TextArea Examples

## Basic

### Basic: issue description

```tsx
<TextArea placeholder='Describe the issue you ran into' />
```

## Controlled/Stateful

### Controlled/Stateful: controlled multiline input

```tsx
const [value, setValue] = useState('');

<TextArea value={value} onChange={(e) => setValue(e.currentTarget.value)} />
```

## Form/Integration

### Form/Integration: labeled feedback field

```tsx
<>
  <Label htmlFor='details'>Details</Label>
  <TextArea id='details' placeholder='Describe the situation' />
  <HelperText>Include context that helps reproduce the issue.</HelperText>
</>
```

## Layout/Overlay

### Layout/Overlay: full-width notes area

```tsx
<TextArea fullWidth placeholder='Add rollout notes for reviewers' />
```

## Error

### Error: invalid long-form answer

```tsx
<TextArea error placeholder='Describe the issue' />
```

## Disabled

### Disabled: locked comment field

```tsx
<TextArea disabled value='Comments are closed for this request.' />
```

## Edge

### Edge: compact textarea in dense forms

```tsx
<TextArea size='sm' placeholder='Short internal note' />
```
