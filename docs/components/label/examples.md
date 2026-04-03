# Label Examples

## Basic

### Basic: explicit label and input id

```tsx
<>
  <Label htmlFor='email'>Email</Label>
  <TextField id='email'>
    <TextFieldInput placeholder='name@company.com' />
  </TextField>
</>
```

## Controlled/Stateful

### Controlled/Stateful: label with controlled field

```tsx
const [value, setValue] = useState('');

<>
  <Label htmlFor='project-name'>Project name</Label>
  <TextField id='project-name'>
    <TextFieldInput value={value} onChange={(e) => setValue(e.currentTarget.value)} />
  </TextField>
</>
```

## Form/Integration

### Form/Integration: wrapping a checkbox

```tsx
<Label>
  <Checkbox />
  Email me weekly updates
</Label>
```

## Layout/Overlay

### Layout/Overlay: stacked field label in a dialog

```tsx
<div style={{ display: 'grid', gap: 8 }}>
  <Label htmlFor='workspace'>Workspace name</Label>
  <TextField id='workspace'>
    <TextFieldInput />
  </TextField>
</div>
```

## Error

### Error: label with helper and invalid field

```tsx
<>
  <Label htmlFor='slug'>Workspace slug</Label>
  <TextField id='slug' aria-invalid='true'>
    <TextFieldInput />
  </TextField>
</>
```

## Disabled

### Disabled: label for disabled control

```tsx
<>
  <Label htmlFor='timezone'>Timezone</Label>
  <Select disabled>
    <SelectHiddenSelect />
    <SelectCombobox id='timezone'>
      <SelectValue placeholder='UTC+03:00' />
      <SelectIcon />
    </SelectCombobox>
  </Select>
</>
```

## Edge

### Edge: inline checkbox label

```tsx
<Label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Checkbox />
  Require approval for new devices
</Label>
```
