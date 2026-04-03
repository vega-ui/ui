# Meter Patterns

## Capacity Indicator

When to use:

- The UI shows quota, storage, or bounded capacity.

Composition notes:

- Pair the bar with text that explains both the subject and scale.
- Use thresholds when the measurement has meaningful zones.

Trade-offs:

- Strong for quantitative summaries.
- Weak fit when the range is not meaningful to users.

```tsx
<Meter value={72}>
  <MeterTrack />
</Meter>
```

## Health Or Score Summary

When to use:

- A score or health measure belongs in a compact summary surface.

Composition notes:

- Keep threshold meaning explicit.
- Use card or row context so the user knows what is being measured.

Trade-offs:

- Good for dashboards and summaries.
- Can be misread as progress if surrounding text is weak.

```tsx
<Card>
  <Meter value={60}>
    <MeterTrack />
  </Meter>
</Card>
```

## Threshold-Aware Measurement

When to use:

- The range has good, warning, and bad zones.

Composition notes:

- Configure `low`, `high`, and `optimum` intentionally.
- Do not rely on the color shift alone to communicate meaning.

Trade-offs:

- Richer semantic feedback for one measurement.
- Requires more product discipline around thresholds.

```tsx
<Meter value={75} max={100} high={66} low={33} optimum={100}>
  <MeterTrack />
</Meter>
```
