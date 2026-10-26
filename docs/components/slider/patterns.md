# Slider Patterns

## Volume Or Brightness Control

When to use:

- users adjust one bounded setting quickly

Composition notes:

- show the current value nearby when precision matters
- keep the slider wide enough for comfortable dragging

Trade-offs:

- fast and tactile
- less exact than typed entry

```tsx
<Slider defaultValue={60} style={{ width: 400 }}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput name='brightness' aria-label='Brightness' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

## Price Range Filter

When to use:

- users pick a lower and an upper bound

Composition notes:

- label both thumbs
- set `minStepsBetweenThumbs` when the bounds must not meet

Trade-offs:

- one control for two related values
- thumbs close together are harder to grab; a click on the track moves the nearest one

```tsx
<Slider min={0} max={1000} step={10} minStepsBetweenThumbs={1} defaultValue={[100, 600]} name='price' style={{ width: 400 }}>
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
```

## Vertical Control

When to use:

- the layout is narrow and a vertical control reads better

Composition notes:

- set `orientation='vertical'`
- provide a real height

Trade-offs:

- efficient in certain dense layouts
- easier to render incorrectly than the horizontal default

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
