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
  DateTimeFieldTrigger,
  DateTimeFieldColumn,
  DateTimeFieldTime,
  type DateTimeFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `DateTimeFieldProps`
- `DateTimeFieldInputProps`
- `DateTimeFieldCalendarProps`
- `DateTimeFieldTriggerProps`
- `DateTimeFieldColumnProps`
- `DateTimeFieldTimeProps`

## Minimal Composition

<!-- example: date-time-field/minimal-composition.tsx -->
```tsx
import {
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <DateTimeField dateFormat='dd.MM.yyyy' style={{ width: '100%', maxWidth: 320 }}>
      <DateTimeFieldInput aria-label='Starts at' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTrigger square aria-label='Choose start date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label='Choose start date'>
          <DateTimeFieldCalendar>
            <CalendarHeader>
              <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarHeading>
              <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
            </CalendarHeader>
            <CalendarContent>
              <CalendarDays>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarDaysScroller>
                  <CalendarDaysScrollerContent>
                    <CalendarWeeks>
                      <CalendarDay />
                    </CalendarWeeks>
                  </CalendarDaysScrollerContent>
                </CalendarDaysScroller>
              </CalendarDays>
              <CalendarMonths>
                <CalendarMonthsGrid>
                  <CalendarMonth />
                </CalendarMonthsGrid>
              </CalendarMonths>
              <CalendarYears>
                <CalendarYearsScroller>
                  <CalendarYearsScrollerContent>
                    <CalendarYearsGrid>
                      <CalendarYear />
                    </CalendarYearsGrid>
                  </CalendarYearsScrollerContent>
                </CalendarYearsScroller>
              </CalendarYears>
            </CalendarContent>
          </DateTimeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyDateTimeField` passes its props to `DateTimeField`, its `id` and `name` to the input, and takes the names of the picker, the month buttons, the time label and the time columns as props; the time button under the calendar opens the wheels in a nested popover. See [Component recipes](../../recipes.md).

<!-- example: date-time-field/recipe.tsx -->
```tsx
import {
  Button,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldColumn,
  DateTimeFieldInput,
  DateTimeFieldTime,
  DateTimeFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type DateTimeFieldProps,
  Text,
  TimeFieldOption,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyDateTimeFieldProps extends DateTimeFieldProps {
  name?: string
  pickerLabel: string
  previousLabel: string
  nextLabel: string
  timeLabel: string
  hoursLabel: string
  minutesLabel: string
  secondsLabel?: string
}

export function MyDateTimeField({ id, name, pickerLabel, previousLabel, nextLabel, timeLabel, hoursLabel, minutesLabel, secondsLabel, ...props }: MyDateTimeFieldProps) {
  const seconds = props.timeFormat === 'HH:mm:ss';
  const timeLabelId = useId();
  const timeButtonId = useId();

  return (
    <DateTimeField {...props}>
      <DateTimeFieldInput id={id} name={name} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTrigger square aria-label={pickerLabel}><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent role='dialog' aria-label={pickerLabel}>
          <DateTimeFieldCalendar>
            <CalendarHeader>
              <CalendarPrevButton square aria-label={previousLabel}><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarHeading>
              <CalendarNextButton square aria-label={nextLabel}><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
            </CalendarHeader>
            <CalendarContent>
              <CalendarDays>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarDaysScroller>
                  <CalendarDaysScrollerContent>
                    <CalendarWeeks>
                      <CalendarDay />
                    </CalendarWeeks>
                  </CalendarDaysScrollerContent>
                </CalendarDaysScroller>
              </CalendarDays>
              <CalendarMonths>
                <CalendarMonthsGrid>
                  <CalendarMonth />
                </CalendarMonthsGrid>
              </CalendarMonths>
              <CalendarYears>
                <CalendarYearsScroller>
                  <CalendarYearsScrollerContent>
                    <CalendarYearsGrid>
                      <CalendarYear />
                    </CalendarYearsGrid>
                  </CalendarYearsScrollerContent>
                </CalendarYearsScroller>
              </CalendarYears>
            </CalendarContent>
          </DateTimeFieldCalendar>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', padding: '0 var(--spacing-6) var(--spacing-6)' }}>
            <Text id={timeLabelId}>{timeLabel}</Text>
            <Popover placement='top-end'>
              <PopoverTrigger asChild>
                <Button id={timeButtonId} aria-labelledby={`${timeLabelId} ${timeButtonId}`} aria-haspopup='dialog' size={props.size} variant='secondary' appearance='ghost'>
                  <DateTimeFieldTime placeholder='--:--' />
                </Button>
              </PopoverTrigger>
              <PopoverContent role='dialog' aria-labelledby={timeLabelId} style={{ padding: 'var(--spacing-6)' }}>
                <WheelPicker aria-labelledby={timeLabelId}>
                  <DateTimeFieldColumn unit='hour' aria-label={hoursLabel} autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                  <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                  <DateTimeFieldColumn unit='minute' aria-label={minutesLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>
                  {seconds && <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>}
                  {seconds && <DateTimeFieldColumn unit='second' aria-label={secondsLabel}><TimeFieldOption><WheelPickerFace /></TimeFieldOption></DateTimeFieldColumn>}
                </WheelPicker>
              </PopoverContent>
            </Popover>
          </div>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Webinar starts at</Label>
      <MyDateTimeField
        id={id}
        name='startsAt'
        dateFormat='dd.MM.yyyy'
        dateSeparator='.'
        separator=', '
        defaultValue='2026-07-15T18:30'
        pickerLabel='Choose webinar date and time'
        previousLabel='Previous month'
        nextLabel='Next month'
        timeLabel='Time'
        hoursLabel='Hours'
        minutesLabel='Minutes'
      />
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `DateTimeField`: root state and timestamp-format owner
- `DateTimeFieldInput`: typed date-time entry surface

## Optional Parts

- `DateTimeFieldTrigger`: calendar trigger affordance
- `DateTimeFieldCalendar`: visual picker content, usually mounted in `Popover`
- `DateTimeFieldColumn`: a wheel of the hours, the minutes or the seconds by `unit`, inside a `WheelPicker`
- `DateTimeFieldTime`: the time of the field as text for the button that opens the wheels

## Composition Order

1. `DateTimeField`
2. `DateTimeFieldInput`
3. `Popover`
4. `DateTimeFieldTrigger`
5. `DateTimeFieldCalendar`
6. Under the calendar, a nested `Popover` with a `Button` showing `DateTimeFieldTime` and a `WheelPicker` of `DateTimeFieldColumn`

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
- Locale and calendar system: `locale` and `calendar` root props, defaulting to `"en-US"` and the Gregorian calendar; see [Dates And Calendar Systems](../../i18n.md#locale-and-calendar-props)

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
