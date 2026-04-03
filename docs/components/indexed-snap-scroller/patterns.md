# IndexedSnapScroller Patterns

## Controlled Virtual Index

When to use:

- the logical page index should stay in sync with external UI such as numeric controls

Composition notes:

- drive both the external control and the scroller from the same index state
- let `onScrollSnapChanging` or `onScrollSnapChange` update that state

Trade-offs:

- explicit synchronization
- more moving parts than an uncontrolled scroller

```tsx
<IndexedSnapScroller index={index} onScrollSnapChanging={(_, next) => setIndex(next)}>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Virtual Timeline Window

When to use:

- the visible page set should shift as users move forward or backward

Composition notes:

- tune `size`, `shift`, and `start`
- keep the page content resilient to changing logical indexes

Trade-offs:

- scalable
- harder to reason about than a fixed page list

```tsx
<IndexedSnapScroller start={-10} shift={3} size={7}>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Low-Level Calendar Or Timeline Paging

When to use:

- another subsystem needs virtual page indexing but not a domain-specific wrapper yet

Composition notes:

- keep domain logic outside the scroller
- use the exposed index context inside content rendering

Trade-offs:

- reusable foundation
- easy to over-abstract if a higher-level wrapper already exists

```tsx
<IndexedSnapScroller>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```
