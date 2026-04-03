# Meter Examples

## Basic

### Basic: score indicator

Use this for bounded descriptive measurements.

```tsx
<Meter value={84} style={{ width: 250 }}>
  <MeterTrack />
</Meter>
```

## Controlled/Stateful

### Controlled/Stateful: parent-owned quota value

Use this when external state drives the current measured value.

```tsx
const [quota, setQuota] = useState(72);

<Meter value={quota} style={{ width: 250 }}>
  <MeterTrack />
</Meter>
```

## Form/Integration

### Form/Integration: capacity usage row

Use this when a form or settings view shows one bounded measurement beside related controls.

```tsx
<>
  <Text size={2}>API quota</Text>
  <Meter value={72} style={{ width: 250 }}>
    <MeterTrack />
  </Meter>
</>
```

## Layout/Overlay

### Layout/Overlay: meter inside a card

Use this when a compact summary surface needs one quantified measurement.

```tsx
<Card size='sm'>
  <Text size={2}>Usage score</Text>
  <Meter value={60} style={{ width: '100%' }}>
    <MeterTrack />
  </Meter>
</Card>
```

## Error

### Error: low-state capacity warning

Use surrounding copy when the measured value has a bad or warning meaning.

```tsx
<>
  <Text size={2}>Storage health is in a low range.</Text>
  <Meter value={30} max={100} low={33} high={66} optimum={100} style={{ width: 150 }}>
    <MeterTrack />
  </Meter>
</>
```

## Disabled

### Disabled: subdued archived metric

Use subdued surrounding layout when the value remains visible but not actively actionable.

```tsx
<div style={{ opacity: 0.65 }}>
  <Meter value={40} style={{ width: 250 }}>
    <MeterTrack />
  </Meter>
</div>
```

## Edge

### Edge: threshold-aware optimum state

Use this when low, high, and optimum meaning should affect the visual result.

```tsx
<Meter value={75} max={100} high={66} low={33} optimum={100} style={{ width: 150 }}>
  <MeterTrack />
</Meter>
```
