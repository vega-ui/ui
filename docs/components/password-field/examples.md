# PasswordField Examples

## Basic

### Basic: standard password field

```tsx
<PasswordField>
  <PasswordFieldInput placeholder='Password' autoComplete='current-password' />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon />
    <PasswordFieldHiddenIcon />
  </PasswordFieldToggleIconButton>
</PasswordField>
```

## Controlled/Stateful

### Controlled/Stateful: password with strength meter

```tsx
const [value, setValue] = useState('');

<>
  <PasswordField>
    <PasswordFieldInput
      autoComplete='new-password'
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
    <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
      <PasswordFieldShownIcon />
      <PasswordFieldHiddenIcon />
    </PasswordFieldToggleIconButton>
  </PasswordField>
  <HelperText>Use 12+ characters, mixed case, numbers, and symbols.</HelperText>
</>
```

## Form/Integration

### Form/Integration: sign-in password row

```tsx
<>
  <Label htmlFor='password'>Password</Label>
  <PasswordField>
    <PasswordFieldInput id='password' autoComplete='current-password' />
    <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
      <PasswordFieldShownIcon />
      <PasswordFieldHiddenIcon />
    </PasswordFieldToggleIconButton>
  </PasswordField>
</>
```

## Layout/Overlay

### Layout/Overlay: custom icons in modal form

```tsx
<PasswordField>
  <PasswordFieldInput autoComplete='new-password' />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon><Lock /></PasswordFieldShownIcon>
    <PasswordFieldHiddenIcon><LockOpen /></PasswordFieldHiddenIcon>
  </PasswordFieldToggleIconButton>
</PasswordField>
```

## Error

### Error: invalid password requirement

```tsx
<>
  <PasswordField error>
    <PasswordFieldInput autoComplete='new-password' />
    <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
      <PasswordFieldShownIcon />
      <PasswordFieldHiddenIcon />
    </PasswordFieldToggleIconButton>
  </PasswordField>
  <HelperText error>Password must include a number and a symbol.</HelperText>
</>
```

## Disabled

### Disabled: locked password field

```tsx
<PasswordField disabled>
  <PasswordFieldInput placeholder='Disabled password' />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon />
    <PasswordFieldHiddenIcon />
  </PasswordFieldToggleIconButton>
</PasswordField>
```

## Edge

### Edge: autofill-friendly password creation

```tsx
<PasswordField>
  <PasswordFieldInput autoComplete='new-password' />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon />
    <PasswordFieldHiddenIcon />
  </PasswordFieldToggleIconButton>
</PasswordField>
```
