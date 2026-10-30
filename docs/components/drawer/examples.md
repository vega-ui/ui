# Drawer Examples

## Basic

### Basic: drawer with header and close button

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button fullWidth>Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent shadowed aria-labelledby='drawer-title'>
    <Heading id='drawer-title' as='h2' size={4} fontWeight={600}>Drawer title</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <Text size={3}>Manage workspace members, roles, and pending invitations.</Text>
  </DrawerContent>
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
  <DrawerContent aria-labelledby='controlled-title'>
    <Heading id='controlled-title' as='h2' size={4} fontWeight={600}>Controlled drawer</Heading>
    <Text size={3}>Parent owns the drawer state.</Text>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </DrawerContent>
</Drawer>
```

## Form/Integration

### Form/Integration: short action flow

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button fullWidth>Invite members</Button>
  </DrawerTrigger>
  <DrawerContent shadowed style={{ maxWidth: 520 }} aria-labelledby='invite-members-title'>
    <Heading id='invite-members-title' as='h2' size={4} fontWeight={600}>Invite members</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <form method='dialog' style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Label htmlFor='invite-email'>Email</Label>
      <TextField size='sm'>
        <TextFieldInput id='invite-email' placeholder='name@company.com' />
      </TextField>
      <Button type='submit'>Send invite</Button>
    </form>
  </DrawerContent>
</Drawer>
```

## Layout/Overlay

### Layout/Overlay: scrollable content drawer

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button fullWidth>Activity</Button>
  </DrawerTrigger>
  <DrawerContent shadowed fullHeight style={{ maxWidth: 560 }} aria-labelledby='activity-title'>
    <Heading id='activity-title' as='h2' size={4} fontWeight={600}>Activity</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <div style={{ overflow: 'auto', paddingRight: 8 }}>
      <Text size={2}>10:41 Jane invited Alex to the workspace.</Text>
      <Text size={2}>10:18 Billing plan changed to Pro.</Text>
      <Text size={2}>09:52 Export finished successfully.</Text>
    </div>
  </DrawerContent>
</Drawer>
```

### Layout/Overlay: drawer from the start side

```tsx
import type { CSSProperties } from 'react';

<Drawer position='start'>
  <DrawerTrigger asChild>
    <Button fullWidth>Open navigation</Button>
  </DrawerTrigger>
  <DrawerContent shadowed aria-labelledby='navigation-title'>
    <Heading id='navigation-title' as='h2' size={4} fontWeight={600}>Navigation</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <Text size={3}>The drawer opens from the start side, which is the left side in left-to-right text.</Text>
  </DrawerContent>
</Drawer>
```

### Layout/Overlay: drawer without overlay

```tsx
<Drawer>
  <DrawerTrigger asChild>
    <Button fullWidth>Open side panel</Button>
  </DrawerTrigger>
  <DrawerContent shadowed overlay={false} style={{ maxWidth: '80%' }} aria-label='Widget inspector'>
    <Text size={3}>Contextual inspector for the selected dashboard widget.</Text>
  </DrawerContent>
</Drawer>
```

## Error

### Error: destructive review panel

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button variant='secondary'>Review removal</Button>
  </DrawerTrigger>
  <DrawerContent shadowed aria-labelledby='remove-member-access-title'>
    <Heading id='remove-member-access-title' as='h2' size={4} fontWeight={600}>Remove member access</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <Text size={3}>This change takes effect immediately across the workspace.</Text>
    <form method='dialog' style={{ display: 'flex', gap: 8 }}>
      <Button type='submit' value='cancel' variant='secondary'>Cancel</Button>
      <Button type='submit' value='remove'>Remove access</Button>
    </form>
  </DrawerContent>
</Drawer>
```

## Disabled

### Disabled: disabled trigger

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button disabled>Open archived drawer</Button>
  </DrawerTrigger>
  <DrawerContent aria-labelledby='archived-panel-title'>
    <Heading id='archived-panel-title' as='h2' size={4} fontWeight={600}>Archived panel</Heading>
    <DrawerClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DrawerClose>
    <Text size={3}>The trigger is disabled, so this content is shown only as a structural example.</Text>
  </DrawerContent>
</Drawer>
```

## Edge

### Edge: nested drawers

```tsx
import type { CSSProperties } from 'react';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open parent drawer</Button>
  </DrawerTrigger>
  <DrawerContent shadowed aria-labelledby='parent-title'>
    <Heading id='parent-title' as='h2' size={4} fontWeight={600}>Parent drawer</Heading>
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary'>Open nested drawer</Button>
      </DrawerTrigger>
      <DrawerContent shadowed aria-labelledby='nested-details-title'>
        <Heading id='nested-details-title' as='h2' size={4} fontWeight={600}>Nested details</Heading>
        <DrawerClose asChild>
          <IconButton
            aria-label='Close'
            variant='secondary'
            appearance='ghost'
            style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
          >
            <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
          </IconButton>
        </DrawerClose>
        <Text size={3}>Nested drawers need explicit focus and dismissal testing.</Text>
      </DrawerContent>
    </Drawer>
  </DrawerContent>
</Drawer>
```
