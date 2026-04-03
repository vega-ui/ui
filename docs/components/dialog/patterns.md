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
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
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

## Scrollable Modal Content

When to use:

- the content can grow beyond a comfortable modal height

Composition notes:

- make the inner body scroll, not the whole viewport
- keep the header and actions visible

Trade-offs:

- preserves modal framing
- requires deliberate layout to avoid trapped content

```tsx
  <DialogContent>
  <DialogHeader>
    <DialogTitle>Activity log</DialogTitle>
    <DialogCloseButton />
  </DialogHeader>
  <div style={{ maxHeight: 280, overflow: 'auto' }}>
    <Text size={2}>10:41 Updated invoice owner</Text>
    <Text size={2}>10:18 Added workspace member</Text>
    <Text size={2}>09:52 Exported monthly report</Text>
  </div>
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
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parent dialog</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='secondary'>Open confirm step</Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogBackdrop>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm publish</DialogTitle>
                  <DialogCloseButton />
                </DialogHeader>
                <Text size={3}>Publishing makes the page visible to everyone.</Text>
              </DialogContent>
            </DialogBackdrop>
          </DialogPortal>
        </Dialog>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```
