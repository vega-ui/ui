# YearPicker Patterns

## Static Year Grid

When to use:

- the year range is compact enough for one screen

Composition notes:

- use `YearPickerLayout`
- keep the visible year context explicit

Trade-offs:

- simple and stable
- not enough for very large ranges

```tsx
<YearPicker>
  <YearPickerLayout />
</YearPicker>
```

## Paged Year Range

When to use:

- the year range is large and benefits from snap paging

Composition notes:

- use `YearPickerScroller` and `YearPickerScrollerLayout`
- keep the year/index mapping stable

Trade-offs:

- scalable
- more complex than a static grid

```tsx
<YearPicker>
  <YearPickerScroller>
    <YearPickerScrollerContent>
      <YearPickerScrollerLayout />
    </YearPickerScrollerContent>
  </YearPickerScroller>
</YearPicker>
```

## Custom Year Labels

When to use:

- years need richer explanatory content

Composition notes:

- use `createYearPickerGrid` to preserve year ordering
- keep selection semantics on the year items

Trade-offs:

- flexible
- easier to drift from the standard year-grid contract

```tsx
{createYearPickerGrid({ start: 2025, rows: 4, cols: 3, offset: 0 }).map(({ row, data }) => (
  <div key={row}>{data.length}</div>
))}
```
