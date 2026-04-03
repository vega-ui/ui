# RangeSlider Examples

## Basic

### Basic: default value range

```tsx
<RangeSlider defaultValue={[20, 80]} style={{ width: 400 }}>
  <RangeSliderProgress />
  <RangeSliderThumb index={0}>
    <RangeSliderHiddenInput name='min' />
  </RangeSliderThumb>
  <RangeSliderThumb index={1}>
    <RangeSliderHiddenInput name='max' />
  </RangeSliderThumb>
</RangeSlider>
```

## Controlled/Stateful

### Controlled/Stateful: controlled range with labels

```tsx
const [value, setValue] = useState<[number, number]>([30, 70]);

<>
  <div style={{ display: 'flex', justifyContent: 'space-between', width: 400 }}>
    <Text>{value[0]}</Text>
    <Text>{value[1]}</Text>
  </div>
  <RangeSlider value={value} onChangeValue={setValue} style={{ width: 400 }}>
    <RangeSliderProgress />
    <RangeSliderThumb index={0}>
      <RangeSliderHiddenInput name='min' />
    </RangeSliderThumb>
    <RangeSliderThumb index={1}>
      <RangeSliderHiddenInput name='max' />
    </RangeSliderThumb>
  </RangeSlider>
</>
```

## Form/Integration

### Form/Integration: filter form

```tsx
<form>
  <RangeSlider defaultValue={[10, 90]} style={{ width: 400 }}>
    <RangeSliderProgress />
    <RangeSliderThumb index={0}>
      <RangeSliderHiddenInput name='price_min' />
    </RangeSliderThumb>
    <RangeSliderThumb index={1}>
      <RangeSliderHiddenInput name='price_max' />
    </RangeSliderThumb>
  </RangeSlider>
  <Button type='submit'>Apply</Button>
</form>
```

## Layout/Overlay

### Layout/Overlay: vertical range slider

```tsx
<RangeSlider orientation='vertical' style={{ height: 200 }}>
  <RangeSliderProgress />
  <RangeSliderThumb index={0}>
    <RangeSliderHiddenInput name='min' />
  </RangeSliderThumb>
  <RangeSliderThumb index={1}>
    <RangeSliderHiddenInput name='max' />
  </RangeSliderThumb>
</RangeSlider>
```

## Error

### Error: unsupported interval hint

```tsx
<>
  <RangeSlider defaultValue={[5, 95]} style={{ width: 400 }}>
    <RangeSliderProgress />
    <RangeSliderThumb index={0}>
      <RangeSliderHiddenInput name='min' />
    </RangeSliderThumb>
    <RangeSliderThumb index={1}>
      <RangeSliderHiddenInput name='max' />
    </RangeSliderThumb>
  </RangeSlider>
  <HelperText error>The selected interval is wider than the allowed reporting window.</HelperText>
</>
```

## Disabled

### Disabled: locked filter range

```tsx
<RangeSlider disabled style={{ width: 400 }}>
  <RangeSliderProgress />
  <RangeSliderThumb index={0}>
    <RangeSliderHiddenInput name='min' />
  </RangeSliderThumb>
  <RangeSliderThumb index={1}>
    <RangeSliderHiddenInput name='max' />
  </RangeSliderThumb>
</RangeSlider>
```

## Edge

### Edge: minimum distance between thumbs

```tsx
<RangeSlider minRange={10} defaultValue={[20, 40]} style={{ width: 400 }}>
  <RangeSliderProgress />
  <RangeSliderThumb index={0}>
    <RangeSliderHiddenInput name='min' />
  </RangeSliderThumb>
  <RangeSliderThumb index={1}>
    <RangeSliderHiddenInput name='max' />
  </RangeSliderThumb>
</RangeSlider>
```
