# Dialog Examples

## Basic

### Basic: confirm dialog with primary and secondary actions

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Delete item</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <Text size={3}>This operation cannot be undone.</Text>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Button fullWidth>Delete</Button>
          <Button fullWidth variant='secondary'>Cancel</Button>
        </div>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Controlled/Stateful

### Controlled/Stateful: controlled open state

```tsx
const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open dialog</Button>

  <Dialog open={open} onOpenChange={setOpen}>
    <DialogPortal>
      <DialogBackdrop>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogCloseButton />
          </DialogHeader>
          <Text size={3}>Open state is owned by the parent.</Text>
        </DialogContent>
      </DialogBackdrop>
    </DialogPortal>
  </Dialog>
</>
```

## Form/Integration

### Form/Integration: form field inside dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Rename</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <TextField>
          <TextFieldInput placeholder='Project name' />
        </TextField>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Layout/Overlay

### Layout/Overlay: scrollable content dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Activity log</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activity log</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <div style={{ maxHeight: 280, overflow: 'auto' }}>
          <Card size='sm'>
            <Text size={2}>Invoice #1042 paid by card ending in 4242.</Text>
          </Card>
          <Card size='sm'>
            <Text size={2}>Seat count changed from 8 to 12.</Text>
          </Card>
          <Card size='sm'>
            <Text size={2}>New admin invited to the workspace.</Text>
          </Card>
        </div>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: destructive confirm with explicit consequence text

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant='secondary'>Remove workspace</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove workspace</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <Text size={3}>Removing the workspace also deletes billing history and invites.</Text>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Disabled

### Disabled: disabled trigger

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button disabled>Open archived dialog</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archived</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Edge

### Edge: nested dialog flow

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open parent dialog</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parent dialog</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant='secondary'>Open nested confirm</Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nested confirm</DialogTitle>
                  <DialogCloseButton />
                </DialogHeader>
              </DialogContent>
            </DialogBackdrop>
          </DialogPortal>
        </Dialog>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```
