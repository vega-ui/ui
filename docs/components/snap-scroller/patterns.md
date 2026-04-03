# SnapScroller Patterns

## Button-Controlled Carousel

When to use:

- a snapped surface should also support explicit previous/next controls

Composition notes:

- keep `apiRef` stable
- let external controls call `prev()` and `next()`

Trade-offs:

- explicit and easy to control
- adds more integration logic than passive snapping

```tsx
const api = useRef<SnapScrollerApiRef>(null);
```

## Highlight Current Page

When to use:

- the snapped page should visibly stand out

Composition notes:

- derive highlighted state from `onScrollSnapChange` or `onScrollSnapChanging`
- keep the same keyed ordering in the content list

Trade-offs:

- clearer current-page feedback
- one more state synchronization path to maintain

```tsx
<SnapScroller onScrollSnapChange={(_, index) => setActive(index)}>
  <SnapScrollerContent index={0}>Overview</SnapScrollerContent>
  <SnapScrollerContent index={1}>Usage</SnapScrollerContent>
  <SnapScrollerContent index={2}>Billing</SnapScrollerContent>
</SnapScroller>
```

## Stable Wizard Pages

When to use:

- a short step flow benefits from physical paging

Composition notes:

- keep each page width stable
- use stable indexes that match the intended order

Trade-offs:

- tactile, clear progression
- mixed widths or unstable ordering degrade the experience

```tsx
<SnapScroller>
  <SnapScrollerContent index={0}>Profile</SnapScrollerContent>
  <SnapScrollerContent index={1}>Billing</SnapScrollerContent>
</SnapScroller>
```
