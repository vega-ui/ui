# CalendarBase Patterns

## Shared Calendar Header

When to use:

- several calendar-family views should share one navigation header

Composition notes:

- keep size and variant in the root
- render control and picker buttons inside `CalendarBaseHeader`

Trade-offs:

- consistent family chrome
- still requires embedded picker logic elsewhere

```tsx
<CalendarBase>
  <CalendarBaseHeader>
    <CalendarBaseControlIconButton />
    <CalendarBasePickerButton>May</CalendarBasePickerButton>
    <CalendarBaseControlIconButton />
  </CalendarBaseHeader>
</CalendarBase>
```

## Shared Weekday Row

When to use:

- a derived day-grid view should reuse the standard weekday presentation

Composition notes:

- keep exactly seven labels
- align them with the embedded day grid

Trade-offs:

- reusable and consistent
- still depends on the underlying grid logic to stay aligned

```tsx
<CalendarBaseWeekLabels>
  <CalendarBaseWeekLabel>Mo</CalendarBaseWeekLabel>
</CalendarBaseWeekLabels>
```

## Compact Embedded Shell

When to use:

- a calendar surface needs a tighter width footprint

Composition notes:

- use `compact`
- verify that the embedded picker still fits without clipping

Trade-offs:

- tighter presentation
- easier to crowd larger picker content

```tsx
<CalendarBase compact>
  <CalendarBaseHeader />
</CalendarBase>
```
