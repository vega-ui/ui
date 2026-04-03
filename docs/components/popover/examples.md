# Popover Examples

## Basic

### Basic: quick actions menu

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant='secondary'>Actions</Button>
  </PopoverTrigger>
  <PopoverContent style={{ maxWidth: 300 }}>
    <Text size={3}>Quick actions</Text>
  </PopoverContent>
</Popover>
```

## Controlled/Stateful

### Controlled/Stateful: controlled open state

```tsx
const [open, setOpen] = useState(false);

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button>Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>Controlled content</PopoverContent>
</Popover>
```

## Form/Integration

### Form/Integration: inline form popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Rename</Button>
  </PopoverTrigger>
  <PopoverBackdrop />
  <PopoverContent style={{ maxWidth: 300 }}>
    <Heading size={4} fontWeight={600} as='h3'>Rename</Heading>
    <TextField style={{ marginBlock: 12 }}>
      <TextFieldInput placeholder='Document' />
    </TextField>
    <Button size='sm'>Save</Button>
  </PopoverContent>
</Popover>
```

## Layout/Overlay

### Layout/Overlay: user menu with backdrop

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant='secondary' appearance='transparent'>Profile</Button>
  </PopoverTrigger>
  <PopoverBackdrop />
  <PopoverContent style={{ display: 'grid', gap: 8 }}>
    <Button appearance='transparent' variant='secondary'>View profile</Button>
    <Button appearance='transparent' variant='secondary'>Billing</Button>
    <Button appearance='transparent' variant='secondary'>Sign out</Button>
  </PopoverContent>
</Popover>
```

## Error

### Error: destructive confirm in a popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Delete</Button>
  </PopoverTrigger>
  <PopoverBackdrop />
  <PopoverContent style={{ maxWidth: 300 }}>
    <Heading size={4} fontWeight={600} as='h3'>Delete the file?</Heading>
    <Text size={2}>This action can’t be undone.</Text>
  </PopoverContent>
</Popover>
```

## Disabled

### Disabled: disabled trigger

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button disabled>Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>Content</PopoverContent>
</Popover>
```

## Edge

### Edge: nested popover

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant='secondary'>Open menu</Button>
  </PopoverTrigger>
  <PopoverBackdrop />
  <PopoverContent>
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm'>Open nested popover</Button>
      </PopoverTrigger>
      <PopoverContent>Nested content</PopoverContent>
    </Popover>
  </PopoverContent>
</Popover>
```
