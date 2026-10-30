# Dialog Examples

## Basic

### Basic: confirm dialog with primary and secondary actions

```tsx
import type { CSSProperties } from 'react';

<Dialog>
  <DialogTrigger asChild>
    <Button>Delete item</Button>
  </DialogTrigger>
  <DialogContent aria-labelledby='confirm-title'>
    <Heading id='confirm-title' as='h2' size={4} fontWeight={600}>Confirm action</Heading>
    <DialogClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DialogClose>
    <Text size={3}>This operation cannot be undone.</Text>
    <form method='dialog' style={{ display: 'flex', gap: 10, marginTop: 16 }}>
      <Button type='submit' value='delete' fullWidth>Delete</Button>
      <Button type='submit' value='cancel' fullWidth variant='secondary'>Cancel</Button>
    </form>
  </DialogContent>
</Dialog>
```

## Controlled/Stateful

### Controlled/Stateful: controlled open state

```tsx
const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)}>Open dialog</Button>

  <Dialog open={open} onChangeOpen={setOpen}>
    <DialogContent aria-labelledby='controlled-title'>
      <Heading id='controlled-title' as='h2' size={4} fontWeight={600}>Controlled dialog</Heading>
      <Text size={3}>Open state is owned by the parent.</Text>
      <Button onClick={() => setOpen(false)}>Close</Button>
    </DialogContent>
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
  <DialogContent aria-labelledby='rename-title'>
    <Heading id='rename-title' as='h2' size={4} fontWeight={600}>Rename project</Heading>
    <form method='dialog' style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
      <TextField>
        <TextFieldInput name='name' placeholder='Project name' aria-label='Project name' required />
      </TextField>
      <Button type='submit' formNoValidate variant='secondary'>Cancel</Button>
      <Button type='submit'>Save</Button>
    </form>
  </DialogContent>
</Dialog>
```

## Layout/Overlay

### Layout/Overlay: scrollable content dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Activity log</Button>
  </DialogTrigger>
  <DialogContent aria-labelledby='activity-title' style={{ maxHeight: '70vh' }}>
    <Heading id='activity-title' as='h2' size={4} fontWeight={600}>Activity log</Heading>
    <div style={{ overflow: 'auto' }}>
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
    <form method='dialog' style={{ marginTop: 16 }}>
      <Button type='submit'>Done</Button>
    </form>
  </DialogContent>
</Dialog>
```

## Error

### Error: destructive confirm with explicit consequence text

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant='secondary'>Remove workspace</Button>
  </DialogTrigger>
  <DialogContent closedBy='none' aria-labelledby='remove-title'>
    <Heading id='remove-title' as='h2' size={4} fontWeight={600}>Remove workspace</Heading>
    <Text size={3}>Removing the workspace also deletes billing history and invites.</Text>
    <form method='dialog' style={{ display: 'flex', gap: 10, marginTop: 16 }}>
      <Button type='submit' value='cancel' variant='secondary'>Cancel</Button>
      <Button type='submit' value='remove'>Remove</Button>
    </form>
  </DialogContent>
</Dialog>
```

## Disabled

### Disabled: disabled trigger

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button disabled>Open archived dialog</Button>
  </DialogTrigger>
  <DialogContent aria-label='Archived'>
    <Text size={3}>This project is archived.</Text>
  </DialogContent>
</Dialog>
```

## Edge

### Edge: nested dialog flow

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open parent dialog</Button>
  </DialogTrigger>
  <DialogContent aria-labelledby='parent-title'>
    <Heading id='parent-title' as='h2' size={4} fontWeight={600}>Parent dialog</Heading>

    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary'>Open nested confirm</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='nested-title'>
        <Heading id='nested-title' as='h2' size={4} fontWeight={600}>Nested confirm</Heading>
        <form method='dialog'>
          <Button type='submit'>Confirm</Button>
        </form>
      </DialogContent>
    </Dialog>
  </DialogContent>
</Dialog>
```
