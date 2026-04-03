# MeterStack Patterns

## Segmented Health Indicator

When to use:

- a status metric is easier to read as several component parts

Composition notes:

- keep segment ordering meaningful
- keep nearby labels if colors alone are insufficient

Trade-offs:

- expressive
- harder to interpret than a single bar without context

```tsx
<MeterStack value={1}>
  <MeterStackSegment value={0.2} />
  <MeterStackSegment value={0.3} />
  <MeterStackSegment value={0.5} />
</MeterStack>
```

## Password Strength Breakdown

When to use:

- a score is represented as discrete segments

Composition notes:

- keep the segment count stable
- pair with textual strength labeling

Trade-offs:

- intuitive segment-based feedback
- can be mistaken for exact validation without copy

```tsx
<MeterStack value={3}>
  <MeterStackSegment value={0.25} />
  <MeterStackSegment value={0.25} />
  <MeterStackSegment value={0.25} />
  <MeterStackSegment value={0} />
</MeterStack>
```

## Revenue Or Quota Split

When to use:

- one total should be shown as several contributing parts

Composition notes:

- make segment values sum to the intended total
- use color intentionally

Trade-offs:

- good comparative summary
- tiny segments may need labels outside the component

```tsx
<MeterStack value={1}>
  <MeterStackSegment value={0.4} />
  <MeterStackSegment value={0.35} />
  <MeterStackSegment value={0.25} />
</MeterStack>
```
