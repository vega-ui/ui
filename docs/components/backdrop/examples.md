# Backdrop Examples

## Basic

### Basic: visual dimmer

```tsx
<Backdrop visible lockScroll={false} />
```

## Controlled/Stateful

### Controlled/Stateful: dismissable custom overlay

```tsx
const [open, setOpen] = useState(true);

{open && <Backdrop visible onClick={() => setOpen(false)} />}
```

## Form/Integration

### Form/Integration: custom modal shell

```tsx
<>
  <Backdrop visible onClick={onDismiss} />
  <Card style={{ position: 'fixed', inset: '20% auto auto 20%' }}>
    Custom overlay content
  </Card>
</>
```

## Layout/Overlay

### Layout/Overlay: backdrop behind side panel

```tsx
<>
  <Backdrop visible />
  <DrawerContent shadowed>Filters</DrawerContent>
</>
```

## Error

### Error: blocked workflow overlay

```tsx
<>
  <Backdrop visible />
  <Card style={{ position: 'fixed', inset: '20% auto auto 20%' }}>
    Billing issue blocks publishing.
  </Card>
</>
```

## Disabled

### Disabled: passive visual backdrop

```tsx
<Backdrop visible lockScroll={false} />
```

## Edge

### Edge: non-blurred background layer

```tsx
<Backdrop visible blurred={false} />
```
