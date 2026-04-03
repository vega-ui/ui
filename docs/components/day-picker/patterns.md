# DayPicker Patterns

## Static Month Grid

When to use:

- one month view is enough

Composition notes:

- use `DayPickerLayout` for the default shape
- keep the visible period explicit

Trade-offs:

- simple and stable
- not enough for timeline-like month navigation

```tsx
<DayPicker>
  <DayPickerLayout />
</DayPicker>
```

## Swipable Month Paging

When to use:

- users should move between months with snap paging

Composition notes:

- use `DayPickerScroller` plus `DayPickerScrollerLayout`
- keep period change logic synchronized with the visible month

Trade-offs:

- tactile and polished
- more moving parts than a static grid

```tsx
<DayPicker>
  <DayPickerScroller>
    <DayPickerScrollerContent>
      <DayPickerScrollerLayout />
    </DayPickerScrollerContent>
  </DayPickerScroller>
</DayPicker>
```

## Custom Grid Rendering

When to use:

- the default layout is close but not sufficient

Composition notes:

- prefer `createDayPickerGrid` over reimplementing date math
- keep item disabled/excluded semantics aligned with the data

Trade-offs:

- flexible
- easier to drift from the system contract

```tsx
{createDayPickerGrid({ year: 2025, month: 10, offset: 0 }).map(({ row, data }) => (
  <div key={row}>{data.length}</div>
))}
```
