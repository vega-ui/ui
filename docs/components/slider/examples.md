# Slider Examples

## Basic

### Basic: slider with default value

```tsx
<Slider defaultValue={30} style={{ width: 400 }}>
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='volume' />
  </SliderThumb>
</Slider>
```

## Controlled/Stateful

### Controlled/Stateful: controlled brightness

```tsx
const [value, setValue] = useState(60);

<>
  <Text size={2}>Brightness: {value}%</Text>
  <Slider value={value} onChangeValue={setValue} style={{ width: 400 }}>
    <SliderProgress />
    <SliderThumb>
      <SliderHiddenInput name='brightness' />
    </SliderThumb>
  </Slider>
</>
```

## Form/Integration

### Form/Integration: native form value

```tsx
<form>
  <Slider defaultValue={50} style={{ width: 400 }}>
    <SliderProgress />
    <SliderThumb>
      <SliderHiddenInput name='volume' />
    </SliderThumb>
  </Slider>
  <Button type='submit'>Save</Button>
</form>
```

## Layout/Overlay

### Layout/Overlay: vertical slider

```tsx
<Slider orientation='vertical' style={{ height: 240 }}>
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='brightness' />
  </SliderThumb>
</Slider>
```

## Error

### Error: value outside policy hint

```tsx
<>
  <Slider defaultValue={90} style={{ width: 400 }}>
    <SliderProgress />
    <SliderThumb>
      <SliderHiddenInput name='cpu_limit' />
    </SliderThumb>
  </Slider>
  <HelperText error>Values above 80% may impact shared workloads.</HelperText>
</>
```

## Disabled

### Disabled: locked slider

```tsx
<Slider disabled style={{ width: 400 }}>
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='disabled_example' />
  </SliderThumb>
</Slider>
```

## Edge

### Edge: free precision step

```tsx
<Slider step='any' defaultValue={12.5} style={{ width: 400 }}>
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='opacity' />
  </SliderThumb>
</Slider>
```
