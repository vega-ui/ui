# SnapScroller Examples

## Basic

### Basic: simple carousel shell

```tsx
<SnapScroller style={{ width: 400, gap: 12 }}>
  <SnapScrollerContent index={0}>Step 1: Connect workspace</SnapScrollerContent>
  <SnapScrollerContent index={1}>Step 2: Invite team</SnapScrollerContent>
  <SnapScrollerContent index={2}>Step 3: Publish theme</SnapScrollerContent>
</SnapScroller>
```

## Controlled/Stateful

### Controlled/Stateful: highlighted current snap

```tsx
const [active, setActive] = useState(0);

<SnapScroller
  style={{ width: 624, gap: 12 }}
  onScrollSnapChange={(_, index) => setActive(index)}
>
  <SnapScrollerContent index={0} style={{ scale: active === 0 ? 0.9 : undefined }}>0</SnapScrollerContent>
  <SnapScrollerContent index={1} style={{ scale: active === 1 ? 0.9 : undefined }}>1</SnapScrollerContent>
</SnapScroller>
```

## Form/Integration

### Form/Integration: stepper-like wizard pages

```tsx
<SnapScroller style={{ width: 400, gap: 12 }}>
  <SnapScrollerContent index={0}>Profile</SnapScrollerContent>
  <SnapScrollerContent index={1}>Billing</SnapScrollerContent>
  <SnapScrollerContent index={2}>Finish</SnapScrollerContent>
</SnapScroller>
```

## Layout/Overlay

### Layout/Overlay: button-controlled scroller

```tsx
const api = useRef<SnapScrollerApiRef>(null);

<>
  <IconButton appearance='ghost' onClick={() => api.current?.prev()}>
    <Icon><ChevronLeft /></Icon>
  </IconButton>
  <SnapScroller apiRef={api} style={{ width: 300, gap: 12 }}>
    <SnapScrollerContent index={0}>0</SnapScrollerContent>
    <SnapScrollerContent index={1}>1</SnapScrollerContent>
  </SnapScroller>
</>
```

## Error

### Error: unstable width hint

```tsx
<>
  <SnapScroller style={{ width: 525, gap: 12 }}>
    <SnapScrollerContent index={0} style={{ width: 300 }}>0</SnapScrollerContent>
    <SnapScrollerContent index={1} style={{ width: 450 }}>1</SnapScrollerContent>
  </SnapScroller>
  <HelperText error>Mixed item widths may produce less predictable snapping.</HelperText>
</>
```

## Disabled

### Disabled: passive read-only gallery

```tsx
<SnapScroller style={{ width: 400, gap: 12, pointerEvents: 'none' }}>
  <SnapScrollerContent index={0}>0</SnapScrollerContent>
  <SnapScrollerContent index={1}>1</SnapScrollerContent>
</SnapScroller>
```

## Edge

### Edge: random keyed pages

```tsx
<SnapScroller style={{ width: 300, gap: 12 }}>
  <SnapScrollerContent index={12}>12</SnapScrollerContent>
  <SnapScrollerContent index={47}>47</SnapScrollerContent>
</SnapScroller>
```
