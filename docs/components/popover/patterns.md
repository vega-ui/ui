# Popover Patterns

## Quick Actions

When to use:

- Several small actions should stay attached to one trigger.

Composition notes:

- Keep the content compact.
- Prefer action lists or short grouped commands over paragraph-heavy content.

Trade-offs:

- Fast contextual access.
- Easy to overload with too many actions.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant='secondary'>Actions</Button>
  </PopoverTrigger>
  <PopoverContent style={{ display: 'grid', gap: 8 }}>
    <Button size='sm' variant='secondary'>Duplicate</Button>
    <Button size='sm' variant='secondary'>Archive</Button>
    <Button size='sm' variant='secondary'>Delete</Button>
  </PopoverContent>
</Popover>
```

## Inline Rename Flow

When to use:

- A tiny form should stay near its trigger.

Composition notes:

- Use backdrop only when outside-click separation helps.
- Keep validation and submit behavior simple.

Trade-offs:

- Efficient for small edits.
- Too small for longer form flows.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Rename</Button>
  </PopoverTrigger>
  <PopoverBackdrop />
  <PopoverContent style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
    <Heading size={4} as='h3'>Rename project</Heading>
    <TextField>
      <TextFieldInput placeholder='Project Phoenix' />
    </TextField>
    <Button size='sm'>Save</Button>
  </PopoverContent>
</Popover>
```

## Anchored User Menu

When to use:

- Account or context actions should stay visibly attached to the trigger.

Composition notes:

- Keep the content narrow and scannable.
- Do not turn the menu into a full settings surface.

Trade-offs:

- Strong spatial relationship to the trigger.
- Weaker fit once the content becomes form-heavy or destructive.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant='secondary' appearance='transparent'>Profile</Button>
  </PopoverTrigger>
  <PopoverContent style={{ display: 'grid', gap: 8 }}>
    <Text size={2}>Signed in as jane@company.com</Text>
    <Button size='sm' variant='secondary'>Settings</Button>
    <Button size='sm' variant='secondary'>Logout</Button>
  </PopoverContent>
</Popover>
```
