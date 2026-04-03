# IndexedSnapScroller Examples

## Basic

### Basic: onboarding steps with virtual index

```tsx
<IndexedSnapScroller style={{ width: 300, gap: 12 }}>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Controlled/Stateful

### Controlled/Stateful: external index control

```tsx
const [index, setIndex] = useState(0);

<IndexedSnapScroller index={index} onScrollSnapChanging={(_, next) => setIndex(next)}>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Form/Integration

### Form/Integration: numbered step flow

```tsx
<IndexedSnapScroller>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Layout/Overlay

### Layout/Overlay: scroller paired with numeric controller

```tsx
<IndexedSnapScroller index={index}>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Error

### Error: unstable offset assumptions

```tsx
<>
  <IndexedSnapScroller>
    <IndexedSnapScrollerContent />
  </IndexedSnapScroller>
  <HelperText error>Changing child order without aligning index logic can break paging expectations.</HelperText>
</>
```

## Disabled

### Disabled: passive virtual timeline

```tsx
<IndexedSnapScroller style={{ pointerEvents: 'none' }}>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Edge

### Edge: shifted index window

```tsx
<IndexedSnapScroller start={-10} shift={3} size={7}>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```
