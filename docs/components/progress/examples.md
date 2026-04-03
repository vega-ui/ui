# Progress Examples

## Basic

### Basic: deployment progress

Use this when a task is actively moving toward completion.

```tsx
<Progress value={90} style={{ width: 250 }}>
  <ProgressTrack />
</Progress>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned upload progress

Use a controlled value when external task state drives the bar.

```tsx
const [value, setValue] = useState(72);

<Progress value={value} style={{ width: 250 }}>
  <ProgressTrack />
</Progress>
```

## Form/Integration

### Form/Integration: upload status row

Use this when the progress bar needs surrounding explanatory text.

```tsx
<>
  <Text size={2}>Uploading assets</Text>
  <Progress value={72} style={{ width: 250 }}>
    <ProgressTrack />
  </Progress>
</>
```

## Layout/Overlay

### Layout/Overlay: progress inside a dialog

Use this when an overlay owns a running async task.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Deploy</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <Progress value={65} style={{ width: '100%' }}>
          <ProgressTrack />
        </Progress>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Error

### Error: failed progress flow with stopped completion

Use surrounding copy to explain failure while the progress bar remains incomplete.

```tsx
<>
  <Text size={2}>Upload failed at 65%.</Text>
  <Progress value={65} style={{ width: 250 }}>
    <ProgressTrack />
  </Progress>
</>
```

## Disabled

### Disabled: visually subdued progress in archived state

Use subdued surrounding layout when the value remains visible but inactive.

```tsx
<div style={{ opacity: 0.65 }}>
  <Progress value={40} style={{ width: 250 }}>
    <ProgressTrack />
  </Progress>
</div>
```

## Edge

### Edge: indeterminate progress

Use this when work is ongoing but exact completion is unknown.

```tsx
<Progress indeterminate style={{ width: 150 }}>
  <ProgressTrack />
</Progress>
```
