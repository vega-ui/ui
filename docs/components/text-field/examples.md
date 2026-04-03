# TextField Examples

## Basic

### Basic: plain email field

```tsx
<TextField>
  <TextFieldInput placeholder='name@company.com' />
</TextField>
```

## Controlled/Stateful

### Controlled/Stateful: input with character counter

```tsx
const [value, setValue] = useState('Example');

<TextField>
  <TextFieldInput value={value} onChange={(e) => setValue(e.currentTarget.value)} />
  <Text size={2} style={{ opacity: 0.7, whiteSpace: 'nowrap', paddingInline: 24 }}>
    {value.length}
  </Text>
</TextField>
```

## Form/Integration

### Form/Integration: search row with trailing action

```tsx
<TextField>
  <TextFieldInput type='search' placeholder='Search invoices' />
  <Button size='md'>Search</Button>
</TextField>
```

## Layout/Overlay

### Layout/Overlay: form row inside modal content

```tsx
<div style={{ display: 'grid', gap: 6 }}>
  <Label htmlFor='email'>Email</Label>
  <TextField>
    <TextFieldInput id='email' type='email' autoComplete='email' />
  </TextField>
</div>
```

## Error

### Error: invalid field row

```tsx
<>
  <Label htmlFor='email'>Email</Label>
  <TextField error>
    <TextFieldInput id='email' type='email' placeholder='name@company.com' />
  </TextField>
  <HelperText error>Enter a valid email address.</HelperText>
</>
```

## Disabled

### Disabled: disabled search field

```tsx
<TextField>
  <TextFieldInput disabled value='Workspace locked' />
  <Button size='md' disabled>
    Search
  </Button>
</TextField>
```

## Edge

### Edge: prefix and suffix controls

```tsx
<TextField>
  <IconButton size='md' variant='secondary' appearance='ghost' aria-label='Decrease'>
    <Icon><Minus /></Icon>
  </IconButton>
  <TextFieldInput inputMode='numeric' placeholder='0' />
  <IconButton size='md' variant='secondary' appearance='ghost' aria-label='Increase'>
    <Icon><Plus /></Icon>
  </IconButton>
</TextField>
```
