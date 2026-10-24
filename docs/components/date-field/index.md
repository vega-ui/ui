# DateField

## Doc Profile

`advanced interactive`

## Summary

`DateField` is a [compound component](../../glossary.md#compound-component) for single-date entry that combines typed input, optional calendar selection, and field-level constraints in one control. It is the field-first date-input layer, with the calendar acting as an optional picking aid rather than the primary abstraction.

## Imports

```tsx
import {
  DateField,
  DateFieldInput,
  DateFieldCalendar,
  DateFieldTriggerIconButton,
  type DateFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `DateFieldProps`
- `DateFieldInputProps`
- `DateFieldCalendarProps`
- `DateFieldTriggerIconButtonProps`

## Minimal Composition

```tsx
<DateField format='dd/MM/yyyy' separator='/'>
  <DateFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateFieldTriggerIconButton aria-label='Choose date' />
    </PopoverTrigger>
    <PopoverContent>
      <DateFieldCalendar>
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
      </DateFieldCalendar>
    </PopoverContent>
  </Popover>
</DateField>
```

## Required Parts

- `DateField`: root state and formatting owner
- `DateFieldInput`: typed date entry surface

## Optional Parts

- `DateFieldTriggerIconButton`: calendar trigger affordance
- `DateFieldCalendar`: visual picker content, usually mounted in `Popover`

## Composition Order

1. `DateField`
2. `DateFieldInput`
3. `Popover`
4. `DateFieldTriggerIconButton`
5. `DateFieldCalendar`

## Variants

- Input-only versus input-plus-calendar composition
- Trigger-driven picker versus typed entry only
- Constrained state through `min`, `max`, and `disabledDates`

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

- Locale, timezone, and serialization rules still belong to the consumer.
- Partial typed values are common during editing and should not be treated as final values.
- Overlay behavior should be tested inside dialogs, drawers, and scroll containers.
- The same business rule should drive typed validation and calendar blocking; they should not drift into two different policies.

## Common Mistakes

- Passing `Date` objects or display-format strings to `min` / `max` instead of ISO `YYYY-MM-DD` strings.
- Assuming the field solves timezone policy by itself.
- Leaving the trigger icon button unlabeled in accessible flows.
- Treating `min`, `max`, and `disabledDates` as visual hints instead of validation rules.
