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
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='brightness' />
  </SliderThumb>
</Slider>
```

## Form-Submitted Slider

When to use:

- a native form should submit the scalar value

Composition notes:

- include `SliderHiddenInput`
- keep the control inside the form boundary

Trade-offs:

- easy native submission
- still needs surrounding label/value context

```tsx
<Slider defaultValue={50}>
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='volume' />
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
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='brightness' />
  </SliderThumb>
</Slider>
```
