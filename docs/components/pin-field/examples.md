# PinField Examples

## Basic

### Basic: standard 4-digit PIN

```tsx
<PinField placeholder='••••' maxLength={4}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
</PinField>
```

## Controlled/Stateful

### Controlled/Stateful: alphanumeric code

```tsx
<PinField mask={/^[A-Za-z0-9]+$/} placeholder='A1B2' maxLength={4}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
</PinField>
```

## Form/Integration

### Form/Integration: 6-digit OTP

```tsx
<PinField placeholder='••••••' maxLength={6}>
  <PinFieldHiddenInput name='otp' />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
  <PinFieldSlot index={4} />
  <PinFieldSlot index={5} />
</PinField>
```

## Layout/Overlay

### Layout/Overlay: grouped code with separator

```tsx
<PinField maxLength={4}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSeparator />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
</PinField>
```

## Error

### Error: wrong verification code

```tsx
<>
  <PinField error maxLength={4}>
    <PinFieldHiddenInput />
    <PinFieldSlot index={0} />
    <PinFieldSlot index={1} />
    <PinFieldSlot index={2} />
    <PinFieldSlot index={3} />
  </PinField>
  <HelperText error>The code has expired. Request a new one.</HelperText>
</>
```

## Disabled

### Disabled: locked code entry

```tsx
<PinField disabled maxLength={4}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
</PinField>
```

## Edge

### Edge: grouped 8-character code

```tsx
<PinField maxLength={8}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
  <PinFieldSeparator />
  <PinFieldSlot index={4} />
  <PinFieldSlot index={5} />
  <PinFieldSlot index={6} />
  <PinFieldSlot index={7} />
</PinField>
```
