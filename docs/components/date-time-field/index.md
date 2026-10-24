# DateTimeField

## Doc Profile

`advanced interactive`

## Summary

`DateTimeField` is a [compound component](../../glossary.md#compound-component) for combined date and time entry that coordinates typed input, optional calendar selection, and timestamp rules in one field. It is the field-first timestamp layer when one stored value represents a specific scheduled instant.

## Imports

```tsx
import {
  DateTimeField,
  DateTimeFieldInput,
  DateTimeFieldCalendar,
  DateTimeFieldTriggerIconButton,
  type DateTimeFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `DateTimeFieldProps`
- `DateTimeFieldInputProps`
- `DateTimeFieldCalendarProps`
- `DateTimeFieldTriggerIconButtonProps`

## Minimal Composition

```tsx
<DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:mm'>
  <DateTimeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateTimeFieldTriggerIconButton aria-label='Choose date' />
    </PopoverTrigger>
    <PopoverContent>
      <DateTimeFieldCalendar>
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
      </DateTimeFieldCalendar>
    </PopoverContent>
  </Popover>
</DateTimeField>
```

## Required Parts

- `DateTimeField`: root state and timestamp-format owner
- `DateTimeFieldInput`: typed date-time entry surface

## Optional Parts

- `DateTimeFieldTriggerIconButton`: calendar trigger affordance
- `DateTimeFieldCalendar`: visual picker content, usually mounted in `Popover`

## Composition Order

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTriggerIconButton`
5. `DateTimeFieldCalendar`

## Variants

- Input-only versus input-plus-calendar composition
- Minute-only versus second-level time formatting
- Constraint-driven scheduling through `min`, `max`, `disabledDates`, and `timeStep`

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

- Timezone interpretation belongs to the consumer and should be documented at the feature level.
- Partial timestamp editing is common and should not be treated as a final value too early.
- Overlay behavior should be tested inside dialogs, drawers, and sheets.
- Date validation and time validation should resolve into one timestamp policy, not two loosely connected checks.

## Common Mistakes

- Passing `Date` objects or display-format strings to `min` / `max` instead of ISO `YYYY-MM-DDTHH:mm[:ss]` strings.
- Treating date and time validation as unrelated rules.
- Leaving timezone meaning implicit in scheduling flows.
- Using field-level overrides that make invalid or disabled state harder to read.
