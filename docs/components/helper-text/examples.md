# HelperText Examples

## Basic

### Basic: password hint

```tsx
<HelperText>Use at least 8 characters.</HelperText>
```

## Controlled/Stateful

### Controlled/Stateful: dynamic character guidance

```tsx
const [value, setValue] = useState('');

<>
  <TextField>
    <TextFieldInput value={value} onChange={(e) => setValue(e.currentTarget.value)} />
  </TextField>
  <HelperText>{20 - value.length} characters remaining.</HelperText>
</>
```

## Form/Integration

### Form/Integration: helper copy below a field row

```tsx
<>
  <Label htmlFor='phone'>Phone</Label>
  <TextField id='phone'>
    <TextFieldInput type='tel' />
  </TextField>
  <HelperText>We only use this number for security notices.</HelperText>
</>
```

## Layout/Overlay

### Layout/Overlay: supporting copy in a dialog form

```tsx
<HelperText>Changes apply to all members in this workspace.</HelperText>
```

## Error

### Error: validation message

```tsx
<HelperText error>Enter a valid email address.</HelperText>
```

## Disabled

### Disabled: muted note for unavailable field

```tsx
<HelperText>Billing exports are unavailable on the current plan.</HelperText>
```

## Edge

### Edge: grouped control hint

```tsx
<HelperText>Choose at least one notification channel.</HelperText>
```
