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
<DateTimeField dateFormat='dd/MM/yyyy' dateSeparator='/' timeFormat='HH:MM'>
  <DateTimeFieldInput />
  <Popover placement='bottom-end'>
    <PopoverTrigger asChild>
      <DateTimeFieldTriggerIconButton />
    </PopoverTrigger>
    <PopoverContent>
      <DateTimeFieldCalendar>
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

## Edge Cases

- Timezone interpretation belongs to the consumer and should be documented at the feature level.
- Partial timestamp editing is common and should not be treated as a final value too early.
- Overlay behavior should be tested inside dialogs, drawers, and sheets.
- Date validation and time validation should resolve into one timestamp policy, not two loosely connected checks.

## Common Mistakes

- Treating date and time validation as unrelated rules.
- Leaving timezone meaning implicit in scheduling flows.
- Using field-level overrides that make invalid or disabled state harder to read.
