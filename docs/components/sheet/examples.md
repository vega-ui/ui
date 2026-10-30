# Sheet Examples

## Basic

### Basic: sheet with heading and close button

```tsx
import type { CSSProperties } from 'react';

<Sheet>
  <SheetTrigger asChild><Button>Open profile sheet</Button></SheetTrigger>
  <SheetContent aria-labelledby='profile-title'>
    <SheetHandle aria-label='Resize sheet' />
    <Heading id='profile-title' size={4} fontWeight={600} as='h2'>Profile</Heading>
    <SheetClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </SheetClose>
    <form method='dialog' style={{ display: 'grid', gap: 8 }}>
      <TextField>
        <TextFieldInput placeholder='Display name' aria-label='Display name' />
      </TextField>
      <Button type='submit'>Save</Button>
    </form>
  </SheetContent>
</Sheet>
```

## Controlled/Stateful

### Controlled/Stateful: sheet with snap points

```tsx
<Sheet snapPoints={[0.5, 1]}>
  <SheetTrigger asChild><Button>Open delivery selector</Button></SheetTrigger>
  <SheetContent aria-label='Delivery'>
    <SheetHandle aria-label='Resize sheet' />
    <Text size={2}>Choose delivery method and review pricing before confirming.</Text>
  </SheetContent>
</Sheet>
```

## Form/Integration

### Form/Integration: sheet with form content

```tsx
<Sheet snapPoints={['100px', 0.5, 1]}>
  <SheetTrigger asChild><Button>Edit</Button></SheetTrigger>
  <SheetContent aria-labelledby='edit-profile-title'>
    <Heading id='edit-profile-title' size={4} fontWeight={600} as='h2'>Profile</Heading>
    <form method='dialog'>
      <Fieldset>
        <Label htmlFor='name'>Name</Label>
        <TextField>
          <TextFieldInput id='name' />
        </TextField>
      </Fieldset>
      <Button type='submit'>Save</Button>
    </form>
  </SheetContent>
</Sheet>
```

## Layout/Overlay

### Layout/Overlay: scrollable sheet

```tsx
<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent aria-label='Orders' style={{ maxHeight: '430px' }}>
    <div style={{ overflow: 'auto' }}>
      <Text size={2}>Order #1045 confirmed</Text>
      <Text size={2}>Order #1044 packed</Text>
      <Text size={2}>Order #1043 shipped</Text>
      <Text size={2}>Order #1042 delivered</Text>
    </div>
  </SheetContent>
</Sheet>
```

## Error

### Error: not-closable confirmation step

```tsx
<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent closedBy='none' aria-label='Confirm step'>
    <Text size={3}>This step must be completed before leaving.</Text>
    <form method='dialog'>
      <Button type='submit'>Complete</Button>
    </form>
  </SheetContent>
</Sheet>
```

## Disabled

### Disabled: disabled trigger

```tsx
<Sheet>
  <SheetTrigger asChild><Button disabled>Open sheet</Button></SheetTrigger>
  <SheetContent aria-label='Archived'>
    <Text size={3}>The trigger is disabled, so this panel is shown only as a structural example.</Text>
  </SheetContent>
</Sheet>
```

## Edge

### Edge: stepped snap points

```tsx
<Sheet snapPoints={[0.25, 0.5, 0.75, 1]} steppedSnapPoints>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent aria-label='Review'>
    <SheetHandle aria-label='Resize sheet' />
    <Text size={3}>Quarter steps expose progressively larger review surfaces.</Text>
  </SheetContent>
</Sheet>
```
