# RangeSlider Patterns

## Price Filter

When to use:

- users filter data by a bounded numeric interval

Composition notes:

- keep visible low/high values nearby
- submit both bounds when the filter form is applied

Trade-offs:

- fast interval adjustment
- less precise than typed min/max entry

```tsx
<RangeSlider defaultValue={[10, 90]} style={{ width: 400 }}>
  <RangeSliderProgress />
  <RangeSliderThumb index={0}>
    <RangeSliderHiddenInput name='price_min' />
  </RangeSliderThumb>
  <RangeSliderThumb index={1}>
    <RangeSliderHiddenInput name='price_max' />
  </RangeSliderThumb>
</RangeSlider>
```

## Vertical Interval Control

When to use:

- the layout is narrow or meter-like and a vertical interval reads better

Composition notes:

- provide height explicitly
- keep value labels obvious

Trade-offs:

- can fit specialized layouts well
- harder to read without value context

```tsx
<RangeSlider orientation='vertical' style={{ height: 200 }}>
  <RangeSliderProgress />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```

## Constrained Distance Selection

When to use:

- business logic requires a minimum span

Composition notes:

- set `minRange`
- retest drag behavior with real values

Trade-offs:

- prevents invalid ranges early
- can surprise users if the minimum distance is not communicated

```tsx
<RangeSlider minRange={10} defaultValue={[20, 40]}>
  <RangeSliderProgress />
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
```
