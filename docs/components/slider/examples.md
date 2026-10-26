# Slider Examples

## Basic

### Basic: slider with default value

```tsx
<Slider defaultValue={30} name='volume' style={{ width: 400 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Volume' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

### Basic: range slider

```tsx
<Slider defaultValue={[20, 80]} minStepsBetweenThumbs={5} style={{ width: 400 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb index={0}>
    <SliderThumbInput name='min_price' aria-label='Minimum price' />
    <SliderThumbIndicator />
  </SliderThumb>
  <SliderThumb index={1}>
    <SliderThumbInput name='max_price' aria-label='Maximum price' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

## Controlled/Stateful

### Controlled/Stateful: controlled brightness

```tsx
const [brightness, setBrightness] = useState(60);

<>
  <Text size={2}>Brightness: {brightness}%</Text>
  <Slider value={brightness} onChangeValue={setBrightness} style={{ width: 400 }}>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb>
      <SliderThumbInput aria-label='Brightness' />
      <SliderThumbIndicator />
    </SliderThumb>
  </Slider>
</>
```

### Controlled/Stateful: controlled range

```tsx
const [price, setPrice] = useState([200, 800]);

<>
  <Text size={2}>${price[0]} – ${price[1]}</Text>
  <Slider min={0} max={1000} step={10} minStepsBetweenThumbs={5} value={price} onChangeValue={setPrice} style={{ width: 400 }}>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb index={0}>
      <SliderThumbInput aria-label='Minimum price' />
      <SliderThumbIndicator />
    </SliderThumb>
    <SliderThumb index={1}>
      <SliderThumbInput aria-label='Maximum price' />
      <SliderThumbIndicator />
    </SliderThumb>
  </Slider>
</>
```

### Controlled/Stateful: any number of thumbs

```tsx
const [stops, setStops] = useState([10, 50, 90]);

<Slider value={stops} onChangeValue={setStops} minStepsBetweenThumbs={5} style={{ width: 400 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  {stops.map((_, index) => (
    <SliderThumb key={index} index={index}>
      <SliderThumbInput aria-label={`Stop ${index + 1}`} />
      <SliderThumbIndicator />
    </SliderThumb>
  ))}
</Slider>
```

## Form/Integration

### Form/Integration: native form value

```tsx
<form>
  <Slider defaultValue={[20, 80]} name='price' style={{ width: 400 }}>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb index={0}>
      <SliderThumbInput aria-label='Minimum price' />
      <SliderThumbIndicator />
    </SliderThumb>
    <SliderThumb index={1}>
      <SliderThumbInput aria-label='Maximum price' />
      <SliderThumbIndicator />
    </SliderThumb>
  </Slider>
  <Button type='submit'>Save</Button>
</form>
```

## Layout/Overlay

### Layout/Overlay: vertical slider

```tsx
<Slider orientation='vertical' style={{ height: 240 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput name='brightness' aria-label='Brightness' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

## Error

### Error: value outside policy hint

```tsx
<>
  <Slider defaultValue={90} name='cpu_limit' style={{ width: 400 }}>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb>
      <SliderThumbInput aria-label='CPU limit' />
      <SliderThumbIndicator />
    </SliderThumb>
  </Slider>
  <HelperText error>Values above 80% may impact shared workloads.</HelperText>
</>
```

## Disabled

### Disabled: locked slider

```tsx
<Slider disabled style={{ width: 400 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Locked' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

## Edge

### Edge: free precision step

```tsx
<Slider step='any' defaultValue={12.5} style={{ width: 400 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput name='opacity' aria-label='Opacity' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

### Edge: value text for screen readers

```tsx
const [temperature, setTemperature] = useState(20);

<Slider min={-10} max={30} value={temperature} onChangeValue={setTemperature} style={{ width: 400 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Temperature' aria-valuetext={`${temperature} °C`} />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

### Edge: markers from a datalist

```tsx
<>
  <datalist id='zoom-markers'>
    <option value='0' />
    <option value='50' />
    <option value='100' />
  </datalist>
  <Slider defaultValue={40} style={{ width: 400 }}>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb>
      <SliderThumbInput list='zoom-markers' aria-label='Zoom' />
      <SliderThumbIndicator />
    </SliderThumb>
  </Slider>
</>
```
