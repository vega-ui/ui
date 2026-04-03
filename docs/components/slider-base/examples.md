# SliderBase Examples

## Basic

### Basic: horizontal preview slider shell

```tsx
<SliderBase value={42} style={{ width: 320 }}>
  <SliderBaseProgress />
  <SliderBaseThumb />
</SliderBase>
```

## Controlled/Stateful

### Controlled/Stateful: parent-managed value shell

```tsx
<SliderBase value={volume} min={0} max={100}>
  <SliderBaseProgress />
  <SliderBaseThumb />
</SliderBase>
```

## Form/Integration

### Form/Integration: hidden input for native submission

```tsx
<SliderBase value={brightness}>
  <SliderBaseProgress />
  <SliderBaseThumb>
    <SliderBaseHiddenInput name='brightness' value={brightness} />
  </SliderBaseThumb>
</SliderBase>
```

## Layout/Overlay

### Layout/Overlay: vertical settings rail

```tsx
<SliderBase
  orientation='vertical'
  value={60}
  style={{ height: 240 }}
>
  <SliderBaseProgress orientation='vertical' />
  <SliderBaseThumb orientation='vertical' />
</SliderBase>
```

## Disabled

### Disabled: blocked visual position

```tsx
<SliderBase disabled value={75}>
  <SliderBaseProgress />
  <SliderBaseThumb />
</SliderBase>
```

## Edge

### Edge: custom min and max range

```tsx
<SliderBase min={-20} max={20} value={-5}>
  <SliderBaseProgress />
  <SliderBaseThumb />
</SliderBase>
```
