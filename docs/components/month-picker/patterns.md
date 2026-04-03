# MonthPicker Patterns

## Standard Month Grid

When to use:

- the default month matrix is enough

Composition notes:

- let `MonthPickerLayout` generate the grid
- keep locale formatting consistent

Trade-offs:

- simple and reliable
- less custom than hand-authored month UIs

```tsx
<MonthPicker>
  <MonthPickerLayout />
</MonthPicker>
```

## Dense Embedded Month Selector

When to use:

- the month selector is part of a larger calendar workflow

Composition notes:

- tune `rows`, `cols`, and width for the embedded layout
- keep labels short when density increases

Trade-offs:

- compact
- easier to crowd on small surfaces

```tsx
<MonthPicker>
  <MonthPickerLayout rows={3} cols={4} start={0} />
</MonthPicker>
```

## Custom Month Labels

When to use:

- months need richer content than plain labels

Composition notes:

- prefer `createMonthPickerGrid` over manual month ordering
- keep the month value contract stable

Trade-offs:

- flexible
- easier to drift from system consistency

```tsx
{createMonthPickerGrid({ start: 0, rows: 4, cols: 3 }).map(({ row, data }) => (
  <div key={row}>{data.length}</div>
))}
```
