# SegmentedControl Examples

## Basic

### Basic: view range selector

Use this when a short set of exclusive options should stay visible at all times.

```tsx
<SegmentedControl name='view' defaultValue='week'>
  <SegmentedControlItem value='day'>
    <SegmentedControlItemInput />
    Day
  </SegmentedControlItem>
  <SegmentedControlItem value='week'>
    <SegmentedControlItemInput />
    Week
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned selected segment

Use a controlled wrapper when parent state needs to own the selected value.

```tsx
const [view, setView] = useState('week');

<SegmentedControl name='view' value={view} onChange={(e) => setView(e.currentTarget.value)}>
  <SegmentedControlItem value='day'>
    <SegmentedControlItemInput />
    Day
  </SegmentedControlItem>
  <SegmentedControlItem value='week'>
    <SegmentedControlItemInput />
    Week
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```

## Form/Integration

### Form/Integration: native radio-group participation

Give `SegmentedControl` a `name` so the item inputs submit like a real radio group in a native form.

```tsx
<SegmentedControl name='theme' defaultValue='light'>
  <SegmentedControlItem value='light'>
    <SegmentedControlItemInput />
    Light
  </SegmentedControlItem>
  <SegmentedControlItem value='dark'>
    <SegmentedControlItemInput />
    Dark
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```

## Layout/Overlay

### Layout/Overlay: segmented control inside a dialog

Use this when one short exclusive selector belongs inside an overlay settings flow.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Display settings</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <SegmentedControl name='theme' defaultValue='light'>
          <SegmentedControlItem value='light'>
            <SegmentedControlItemInput />
            Light
          </SegmentedControlItem>
          <SegmentedControlItem value='dark'>
            <SegmentedControlItemInput />
            Dark
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: required visible choice without a selection

Use this when the user must pick one visible option before continue.

```tsx
<FormRow label='Display mode' error='Choose one display mode.'>
  <SegmentedControl name='mode'>
    <SegmentedControlItem value='light'>
      <SegmentedControlItemInput aria-invalid='true' />
      Light
    </SegmentedControlItem>
    <SegmentedControlItem value='dark'>
      <SegmentedControlItemInput aria-invalid='true' />
      Dark
    </SegmentedControlItem>
    <SegmentedControlIndicator />
  </SegmentedControl>
</FormRow>
```

## Disabled

### Disabled: selected disabled control

Use this when the current exclusive choice remains visible but locked.

```tsx
<SegmentedControl name='theme' value='dark' disabled>
  <SegmentedControlItem value='light'>
    <SegmentedControlItemInput />
    Light
  </SegmentedControlItem>
  <SegmentedControlItem value='dark'>
    <SegmentedControlItemInput />
    Dark
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```

## Edge

### Edge: icon-only mode selector

Use this when the choice set is tiny and the icons are already strongly recognizable.

```tsx
<SegmentedControl name='theme' variant='secondary'>
  <SegmentedControlItem value='light'>
    <SegmentedControlItemInput />
    <Icon size='sm'><SunIcon /></Icon>
  </SegmentedControlItem>
  <SegmentedControlItem value='dark'>
    <SegmentedControlItemInput />
    <Icon size='sm'><MoonIcon /></Icon>
  </SegmentedControlItem>
  <SegmentedControlIndicator />
</SegmentedControl>
```
