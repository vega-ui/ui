# Drawer Examples

## Basic

### Basic: drawer with header and close button

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button fullWidth>Open drawer</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent shadowed>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <Text size={3}>Manage workspace members, roles, and pending invitations.</Text>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Controlled/Stateful

### Controlled/Stateful: controlled open state

```tsx
const [open, setOpen] = useState(false);

<Drawer open={open} onChangeOpen={setOpen}>
  <DrawerTrigger asChild>
    <Button>Open controlled drawer</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <Text size={3}>Parent owns the drawer state.</Text>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Form/Integration

### Form/Integration: short action flow

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button fullWidth>Invite members</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent shadowed style={{ maxWidth: 520 }}>
        <DrawerHeader>
          <DrawerTitle>Invite members</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <Label htmlFor='invite-email'>Email</Label>
        <TextField size='sm'>
          <TextFieldInput id='invite-email' placeholder='name@company.com' />
        </TextField>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Layout/Overlay

### Layout/Overlay: scrollable content drawer

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button fullWidth>Activity</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent shadowed style={{ maxWidth: 560 }}>
        <DrawerHeader>
          <DrawerTitle>Activity</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <div style={{ maxHeight: 360, overflow: 'auto', paddingRight: 8 }}>
          <Text size={2}>10:41 Jane invited Alex to the workspace.</Text>
          <Text size={2}>10:18 Billing plan changed to Pro.</Text>
          <Text size={2}>09:52 Export finished successfully.</Text>
        </div>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

### Layout/Overlay: drawer without overlay

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button fullWidth>Open side panel</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerContent shadowed style={{ maxWidth: '80%' }}>
      <Text size={3}>Contextual inspector for the selected dashboard widget.</Text>
    </DrawerContent>
  </DrawerPortal>
</Drawer>
```

## Error

### Error: destructive review panel

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button variant='secondary'>Review removal</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent shadowed>
        <DrawerHeader>
          <DrawerTitle>Remove member access</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <Text size={3}>This change takes effect immediately across the workspace.</Text>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Disabled

### Disabled: disabled trigger

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button disabled>Open archived drawer</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Archived panel</DrawerTitle>
          <DrawerCloseButton />
        </DrawerHeader>
        <Text size={3}>The trigger is disabled, so this content is shown only as a structural example.</Text>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```

## Edge

### Edge: nested drawers

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button>Open parent drawer</Button>
  </DrawerTrigger>
  <DrawerPortal>
    <DrawerBackdrop>
      <DrawerContent shadowed>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant='secondary'>Open nested drawer</Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerBackdrop />
            <DrawerContent shadowed>
              <DrawerHeader>
                <DrawerTitle>Nested details</DrawerTitle>
                <DrawerCloseButton />
              </DrawerHeader>
              <Text size={3}>Nested drawers need explicit focus and dismissal testing.</Text>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </DrawerContent>
    </DrawerBackdrop>
  </DrawerPortal>
</Drawer>
```
