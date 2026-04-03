# Sheet Examples

## Basic

### Basic: sheet with header

```tsx
<Sheet>
  <SheetTrigger asChild><Button>Open profile sheet</Button></SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetHandle />
        <SheetHeader>
          <Text size={4} fontWeight={500}>Profile</Text>
        </SheetHeader>
        <SheetMain>
          <TextField>
            <TextFieldInput placeholder='Display name' />
          </TextField>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Controlled/Stateful

### Controlled/Stateful: sheet with snap points

```tsx
<Sheet snapPoints={[0.5, 1]}>
  <SheetTrigger asChild><Button>Open delivery selector</Button></SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetMain>
          <Text size={2}>Choose delivery method and review pricing before confirming.</Text>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Form/Integration

### Form/Integration: sheet with form content

```tsx
<Sheet snapPoints={['100px', 0.5, 1]}>
  <SheetTrigger asChild><Button>Edit</Button></SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetHeader>
          <Text size={4}>Profile</Text>
        </SheetHeader>
        <SheetMain>
          <Fieldset>
            <Label htmlFor='name'>Name</Label>
            <TextField>
              <TextFieldInput id='name' />
            </TextField>
          </Fieldset>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Layout/Overlay

### Layout/Overlay: scrollable sheet

```tsx
<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent style={{ maxHeight: '430px' }}>
        <SheetMain>
          <Text size={2}>Order #1045 confirmed</Text>
          <Text size={2}>Order #1044 packed</Text>
          <Text size={2}>Order #1043 shipped</Text>
          <Text size={2}>Order #1042 delivered</Text>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Error

### Error: not-closable confirmation step

```tsx
<Sheet closable={false}>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetPortal>
    <SheetContent>
      <SheetMain>
        <Text size={3}>This step must be completed before leaving.</Text>
      </SheetMain>
    </SheetContent>
  </SheetPortal>
</Sheet>
```

## Disabled

### Disabled: disabled trigger

```tsx
<Sheet>
  <SheetTrigger asChild><Button disabled>Open sheet</Button></SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetMain>
          <Text size={3}>The trigger is disabled, so this panel is shown only as a structural example.</Text>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Edge

### Edge: stepped snap points

```tsx
<Sheet snapPoints={[0.25, 0.5, 0.75, 1]} steppedSnapPoints>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetMain>
          <Text size={3}>Quarter steps expose progressively larger review surfaces.</Text>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```
