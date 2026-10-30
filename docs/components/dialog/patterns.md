# Dialog Patterns

## Confirm Action

When to use:

- a destructive or high-signal action needs confirmation

Composition notes:

- keep the content short
- use explicit primary and secondary actions
- keep the title consequence-oriented

Trade-offs:

- strong interruption improves safety
- overuse increases friction

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
    <form method='dialog' style={{ display: 'flex', gap: 8, marginTop: 16 }}>
      <Button type='submit' value='cancel' variant='secondary'>Cancel</Button>
      <Button type='submit' value='delete'>Delete</Button>
    </form>
  </DialogContent>
</Dialog>
```

## Form In Modal

When to use:

- a small editing flow should stay on the current page

Composition notes:

- keep the form short
- ensure close and submit remain visible

Trade-offs:

- good for focused edits
- weak fit for long, multi-step forms

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Rename project</Button>
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

## Scrollable Modal Content

When to use:

- the content can grow beyond a comfortable modal height

Composition notes:

- give `DialogContent` a `max-height` and make the inner body an `overflow: auto` region
- keep the heading and actions outside the scrolling body

Trade-offs:

- preserves modal framing
- requires deliberate layout to avoid trapped content

```tsx
<DialogContent aria-labelledby='activity-title' style={{ maxHeight: '70vh' }}>
  <Heading id='activity-title' as='h2' size={4} fontWeight={600}>Activity log</Heading>
  <div style={{ overflow: 'auto' }}>
    <Text size={2}>10:41 Updated invoice owner</Text>
    <Text size={2}>10:18 Added workspace member</Text>
    <Text size={2}>09:52 Exported monthly report</Text>
  </div>
  <form method='dialog' style={{ marginTop: 16 }}>
    <Button type='submit'>Done</Button>
  </form>
</DialogContent>
```

## Nested Confirm Step

When to use:

- a parent modal flow still needs a smaller confirm step

Composition notes:

- treat nested dialogs as an edge case
- retest focus restoration and escape handling

Trade-offs:

- can preserve the parent workflow context
- raises overlay and accessibility complexity quickly

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open parent dialog</Button>
  </DialogTrigger>
  <DialogContent aria-labelledby='parent-title'>
    <Heading id='parent-title' as='h2' size={4} fontWeight={600}>Parent dialog</Heading>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary'>Open confirm step</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='publish-title'>
        <Heading id='publish-title' as='h2' size={4} fontWeight={600}>Confirm publish</Heading>
        <Text size={3}>Publishing makes the page visible to everyone.</Text>
        <form method='dialog' style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Button type='submit' variant='secondary'>Cancel</Button>
          <Button type='submit'>Publish</Button>
        </form>
      </DialogContent>
    </Dialog>
  </DialogContent>
</Dialog>
```
