# DateRangeField

## Doc Profile

`advanced interactive`

## Summary

`DateRangeField` is a [compound component](../../glossary.md#compound-component) for connected start and end date entry that combines typed range input, optional calendar selection, and shared range validation. It is the field-first range layer when one business concept owns both dates.

## Imports

```tsx
import {
  DateRangeField,
  DateRangeFieldInput,
  DateRangeFieldCalendar,
  DateRangeFieldTriggerIconButton,
  type DateRangeFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `DateRangeFieldProps`
- `DateRangeFieldInputProps`
- `DateRangeFieldCalendarProps`
- `DateRangeFieldTriggerIconButtonProps`

## Minimal Composition

```tsx
<DateRangeField format='dd/MM/yyyy' separator='/' rangeSeparator=' - '>
  <DateRangeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateRangeFieldTriggerIconButton aria-label='Choose dates' />
    </PopoverTrigger>
    <PopoverContent>
      <DateRangeFieldCalendar>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous month' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next month' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays>
            <CalendarWeekdays>
              <CalendarWeekday />
            </CalendarWeekdays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths>
            <CalendarMonth />
          </CalendarMonths>
          <CalendarYears>
            <CalendarYear />
          </CalendarYears>
        </CalendarContent>
      </DateRangeFieldCalendar>
    </PopoverContent>
  </Popover>
</DateRangeField>
```

## Required Parts

- `DateRangeField`: root state and range-format owner
- `DateRangeFieldInput`: typed range entry surface

## Optional Parts

- `DateRangeFieldTriggerIconButton`: calendar trigger affordance
- `DateRangeFieldCalendar`: visual range picker content, usually mounted in `Popover`

## Composition Order

1. `DateRangeField`
2. `DateRangeFieldInput`
3. `Popover`
4. `DateRangeFieldTriggerIconButton`
5. `DateRangeFieldCalendar`

## Variants

- Input-only versus input-plus-calendar composition
- Compact filter range versus fuller booking range flows
- Constraint-driven range state through `min`, `max`, and `disabledDates`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)
- Locale and calendar system: `locale` and `calendar` root props, defaulting to the runtime locale and the Gregorian calendar; see [Dates And Calendar Systems](../../i18n.md#locale-and-calendar-props)

## Edge Cases

- Partial ranges are expected during editing and need explicit handling.
- Range semantics such as inclusive booking days or reporting cutoffs belong to the consumer.
- Overlay behavior should be tested inside filters, drawers, and other stacked layouts.
- Typed range parsing, visual blocked days, and final business validation should stay aligned instead of becoming separate rule systems.

## Common Mistakes

- Passing `Date` objects or display-format strings to `min` / `max` instead of ISO `YYYY-MM-DD` strings.
- Treating the start and end date as unrelated values.
- Leaving the meaning of the range ambiguous in labels or helper text.
- Relying on visual calendar blocking without matching validation rules.
