# VisuallyHidden Examples

## Basic

### Basic: icon-only control label

```tsx
<IconButton aria-label=''>
  <Icon />
  <VisuallyHidden>Search</VisuallyHidden>
</IconButton>
```

## Controlled/Stateful

### Controlled/Stateful: hidden status text

```tsx
const [loading] = useState(true);

<>
  <Spinner size={2} />
  {loading && <VisuallyHidden>Loading workspace settings</VisuallyHidden>}
</>
```

## Form/Integration

### Form/Integration: hidden helper description

```tsx
<>
  <VisuallyHidden asChild>
    <span id='password-hint'>Use at least 12 characters.</span>
  </VisuallyHidden>
  <PasswordFieldInput aria-describedby='password-hint' />
</>
```

## Layout/Overlay

### Layout/Overlay: hidden dialog cue

```tsx
<VisuallyHidden>Dialog opened. Use tab to navigate actions.</VisuallyHidden>
```

## Error

### Error: hidden validation cue

```tsx
<VisuallyHidden asChild>
  <span id='email-error'>Enter a valid email address.</span>
</VisuallyHidden>
```

## Disabled

### Disabled: hidden disabled explanation

```tsx
<VisuallyHidden>Billing changes are unavailable on the current plan.</VisuallyHidden>
```

## Edge

### Edge: slotted hidden element

```tsx
<VisuallyHidden asChild>
  <span>Accessibility-only status</span>
</VisuallyHidden>
```
