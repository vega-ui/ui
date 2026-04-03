# Calendar

## Doc Profile

`advanced interactive`

## Summary

`Calendar` is an [advanced interactive](../structure.md#advanced-interactive) [compound component](../../glossary.md#compound-component) for coordinated date selection across day, month, and year views. It is the consumer-facing orchestration layer on top of the lower-level picker family.

## Imports

```tsx
import {
  Calendar,
  type CalendarProps,
  type CalendarPicker,
  type CalendarSelection,
  type CalendarDatesDisabled,
} from '@vega-ui/react';
```

## Exported Types

- `CalendarProps`
- `CalendarPicker`
- `CalendarSelection`
- `CalendarDatesDisabled`

## Minimal Composition

```tsx
<Calendar selection='single'>
  <CalendarHeader>
    <CalendarPrevYearGroupButton><Icon><ArrowLeft /></Icon></CalendarPrevYearGroupButton>
    <CalendarPrevButton><Icon><ChevronLeft /></Icon></CalendarPrevButton>
    <CalendarPickerButtonGroup>
      <CalendarMonthPickerButton><CalendarMonthLabel /></CalendarMonthPickerButton>
      <CalendarYearPickerButton><CalendarYearLabel /></CalendarYearPickerButton>
    </CalendarPickerButtonGroup>
    <CalendarNextButton><Icon><ChevronRight /></Icon></CalendarNextButton>
    <CalendarNextYearGroupButton><Icon><ArrowRight /></Icon></CalendarNextYearGroupButton>
  </CalendarHeader>
  <CalendarContent>
    <CalendarDayPicker>
      <CalendarWeekLabels>
        {getWeekDayNames(navigator.language, 'short').map((name) => (
          <CalendarWeekLabel key={name}>{name}</CalendarWeekLabel>
        ))}
      </CalendarWeekLabels>
      <CalendarDayPickerScroller>
        <CalendarDayPickerScrollerContent>
          <CalendarDayPickerScrollerLayout />
        </CalendarDayPickerScrollerContent>
      </CalendarDayPickerScroller>
    </CalendarDayPicker>
    <CalendarMonthPicker>
      <CalendarMonthPickerLayout />
    </CalendarMonthPicker>
    <CalendarYearPicker>
      <CalendarYearPickerScroller>
        <CalendarYearPickerScrollerContent>
          <CalendarYearPickerScrollerLayout />
        </CalendarYearPickerScrollerContent>
      </CalendarYearPickerScroller>
    </CalendarYearPicker>
  </CalendarContent>
</Calendar>
```

## Required Parts

- `Calendar`: root state and date-selection model

## Optional Parts

- `CalendarHeader`, `CalendarPrevButton`, `CalendarNextButton`: navigation chrome
- `CalendarPickerButtonGroup`, `CalendarMonthPickerButton`, `CalendarYearPickerButton`: view-switching controls
- `CalendarContent`: wrapper for the active picker view
- `CalendarWeekLabels`, `CalendarWeekLabel`: weekday header chrome
- `CalendarDayPicker*`, `CalendarMonthPicker*`, `CalendarYearPicker*`: coordinated picker families

## Composition Order

Typical composition:

1. `Calendar`
2. `CalendarHeader`
3. picker buttons and navigation controls
4. `CalendarContent`
5. `CalendarDayPicker` or `CalendarMonthPicker` or `CalendarYearPicker`

## Variants

- Selection: `single`, `multiple`, `range`
- View switching: day, month, year
- Density: `compact` plus size variants
- Composition depth: root-only usage versus fully customized picker layouts

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Selection mode changes the value shape.
- Disabled-date constraints can come from a value list or predicate logic.
- Custom picker layouts should be retested for keyboard flow, excluded days, and visible period changes.
- `Calendar` expects real `Date` objects at the component boundary; serialization belongs in the application layer.

## Common Mistakes

- Forgetting that `selection` changes the expected value model.
- Passing serialized business dates instead of `Date` objects.
- Customizing picker internals without retesting navigation flow.
- Combining `from`, `to`, and disabled dates without validating the resulting UX.
