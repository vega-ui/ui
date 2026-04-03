# Link Examples

## Basic

### Basic: standalone navigation link

Use this for a simple standalone navigation action.

```tsx
<Link href='/billing'>Open billing settings</Link>
```

## Controlled/Stateful

### Controlled/Stateful: router-composed link

Use `asChild` when the consumer integrates VegaUI link styling with a router-specific component.

```tsx
<Link asChild>
  <RouterLink to='/settings'>Settings</RouterLink>
</Link>
```

## Form/Integration

### Form/Integration: footer terms link

Use this for supporting navigation inside forms.

```tsx
<Link href='/terms'>Terms of service</Link>
```

## Layout/Overlay

### Layout/Overlay: inline help link inside dialog copy

Use this when a dialog needs a navigational secondary reference.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Publish</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <Text size={2}>
          Review the <Link href='/docs/publishing-policy'>publishing policy</Link> before continuing.
        </Text>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: recovery link after a failed flow

Use this when navigation helps recover from an error state.

```tsx
<Link href='/billing/retry'>Retry billing setup</Link>
```

## Disabled

### Disabled: visually blocked navigation hint

Use sparingly; often a disabled-looking link should become explanatory text instead.

```tsx
<span aria-disabled='true' style={{ opacity: 0.6 }}>
  <Link href='/archived'>Archived workspace</Link>
</span>
```

## Edge

### Edge: inline link in running copy

Use this when navigation belongs naturally inside a sentence.

```tsx
<Text size={2}>
  Read the <Link href='/docs'>documentation</Link> before publishing.
</Text>
```
