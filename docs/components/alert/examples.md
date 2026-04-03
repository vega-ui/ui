# Alert Examples

## Basic

### Basic: inline informational alert

Use this for short neutral guidance or product hints.

```tsx
<Alert variant='info' appearance='surface'>
  <AlertIcon />
  <AlertContent>Changes are saved automatically.</AlertContent>
</Alert>
```

## Controlled/Stateful

### Controlled/Stateful: dismissible alert row

Use parent state when the alert can be removed from the current view.

```tsx
const [visible, setVisible] = useState(true);

visible && (
  <Alert variant='success'>
    <AlertIcon />
    <AlertMain>
      <AlertTitle>Saved</AlertTitle>
      <AlertContent>Profile updated successfully.</AlertContent>
    </AlertMain>
    <IconButton aria-label='Dismiss' size='xs' onClick={() => setVisible(false)}>
      <Icon><X /></Icon>
    </IconButton>
  </Alert>
)
```

## Form/Integration

### Form/Integration: warning alert in settings

Use this when surrounding settings depend on one visible warning.

```tsx
<Alert variant='warning' appearance='surface'>
  <AlertIcon />
  <AlertMain>
    <AlertTitle>Action required</AlertTitle>
    <AlertContent>Finish domain verification before enabling SSO.</AlertContent>
  </AlertMain>
</Alert>
```

## Layout/Overlay

### Layout/Overlay: alert inside a dialog

Use this when a modal flow still needs compact inline feedback.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Review billing</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <Alert variant='error' appearance='surface'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>Payment failed</AlertTitle>
            <AlertContent>Check your card details and try again.</AlertContent>
          </AlertMain>
        </Alert>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: payment failure alert

Use this for compact failure feedback with clear severity.

```tsx
<Alert variant='error' appearance='fill'>
  <AlertIcon />
  <AlertMain>
    <AlertTitle>Payment failed</AlertTitle>
    <AlertContent>Check your card details and try again.</AlertContent>
  </AlertMain>
</Alert>
```

## Disabled

### Disabled: archived informational surface

Use a subdued surrounding layout when the alert-like content remains visible but less active.

```tsx
<div style={{ opacity: 0.7 }}>
  <Alert variant='info' appearance='surface'>
    <AlertContent>This workspace is archived.</AlertContent>
  </Alert>
</div>
```

## Edge

### Edge: alert with custom children

Use this when compact rich content still fits within alert semantics.

```tsx
<Alert variant='info' appearance='surface'>
  <AlertIcon />
  <AlertMain>
    <AlertTitle>Reference</AlertTitle>
    <AlertContent>
      Read the <Link href='/docs'>documentation</Link> before publishing.
    </AlertContent>
  </AlertMain>
</Alert>
```
