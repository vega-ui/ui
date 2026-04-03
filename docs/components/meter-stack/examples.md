# MeterStack Examples

## Basic

### Basic: multi-part health indicator

```tsx
<MeterStack value={1}>
  <MeterStackSegment value={0.2} />
  <MeterStackSegment value={0.3} />
  <MeterStackSegment value={0.5} />
</MeterStack>
```

## Controlled/Stateful

### Controlled/Stateful: score-driven strength view

```tsx
const [score] = useState(3);

<MeterStack value={score}>
  <MeterStackSegment value={0.25} />
  <MeterStackSegment value={0.25} />
  <MeterStackSegment value={0.25} />
  <MeterStackSegment value={0} />
</MeterStack>
```

## Form/Integration

### Form/Integration: revenue split summary

```tsx
<MeterStack value={1}>
  <MeterStackSegment value={0.4} />
  <MeterStackSegment value={0.35} />
  <MeterStackSegment value={0.25} />
</MeterStack>
```

## Layout/Overlay

### Layout/Overlay: full-width panel metric

```tsx
<MeterStack value={1} fullWidth>
  <MeterStackSegment value={0.15} />
  <MeterStackSegment value={0.35} />
  <MeterStackSegment value={0.5} />
</MeterStack>
```

## Error

### Error: overloaded quota breakdown

```tsx
<>
  <MeterStack value={1}>
    <MeterStackSegment value={0.7} style={{ '--meter-stack-segment-color': 'var(--color-error)' } as React.CSSProperties} />
    <MeterStackSegment value={0.3} />
  </MeterStack>
  <HelperText error>One quota segment is above the recommended threshold.</HelperText>
</>
```

## Disabled

### Disabled: muted segmented metric

```tsx
<div style={{ opacity: 0.6 }}>
  <MeterStack value={1}>
    <MeterStackSegment value={0.5} />
    <MeterStackSegment value={0.5} />
  </MeterStack>
</div>
```

## Edge

### Edge: custom segment colors

```tsx
<MeterStack value={1}>
  <MeterStackSegment value={0.15} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-100)' } as React.CSSProperties} />
  <MeterStackSegment value={0.35} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-300)' } as React.CSSProperties} />
  <MeterStackSegment value={0.2} style={{ '--meter-stack-segment-color': 'var(--color-blue-accent-500)' } as React.CSSProperties} />
</MeterStack>
```
