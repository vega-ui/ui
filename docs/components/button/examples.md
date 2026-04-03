# Button Examples

## Basic

### Basic: primary action button

Use this for the main action in a local product flow.

```tsx
<Button>Save</Button>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned loading action

Use this when a parent flow controls loading and disabled state explicitly.

```tsx
const [saving, setSaving] = useState(false);

<Button disabled={saving} onClick={() => setSaving(true)}>
  {saving ? <Spinner size={3} /> : 'Save changes'}
</Button>
```

## Form/Integration

### Form/Integration: form footer actions

Use this when primary and secondary actions sit together in a form footer.

```tsx
<div style={{ display: 'flex', gap: 12 }}>
  <Button variant='secondary' appearance='outline'>
    Cancel
  </Button>
  <Button type='submit'>Save changes</Button>
</div>
```

## Layout/Overlay

### Layout/Overlay: dialog confirmation actions

Use this when actions live inside dialogs, drawers, or sheets.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Delete file</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant='secondary' appearance='outline'>Cancel</Button>
          <Button>Delete</Button>
        </div>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: destructive action with explicit emphasis

Use secondary copy plus stronger button emphasis when the action is irreversible.

```tsx
<Button variant='primary' appearance='fill'>
  Remove workspace
</Button>
```

## Disabled

### Disabled: blocked primary action

Use this when the action is visible but not currently available.

```tsx
<Button disabled>Create invoice</Button>
```

## Edge

### Edge: polymorphic anchor with button styling

Use this when the element should navigate but still keep button visuals.

```tsx
<Button asChild appearance='ghost'>
  <a href='/billing'>Open billing</a>
</Button>
```
