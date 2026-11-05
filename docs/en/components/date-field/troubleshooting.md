# DateField Troubleshooting

## Calendar Button Opens Nothing

### Symptom

The trigger icon button renders, but clicking it never shows a calendar.

### Likely Cause

`DateFieldTriggerIconButton` was rendered without a surrounding `Popover` or without `DateFieldCalendar` inside the overlay.

### How To Verify

- Check whether the trigger is wrapped in `PopoverTrigger`.
- Check whether `PopoverContent` contains `DateFieldCalendar`.

### Fix

Compose the trigger and calendar through `Popover`, inside `DateField`.

<!-- example: date-field/minimal-composition.tsx -->
```tsx
import {
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DateField format='dd.MM.yyyy' separator='.'>
      <DateFieldInput aria-label='Due date' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTriggerIconButton aria-label='Choose due date' />
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
  );
}
```
<!-- /example -->

## Typed Value Looks Wrong

### Symptom

The input format shown to users does not match parsing behavior.

### Likely Cause

`format` or `separator` does not match the date copy used in labels, hints, and validation messages.

### How To Verify

- Compare the configured `format` with the visible form hint.
- Type a representative value and inspect how it is interpreted.

### Fix

Keep visible guidance, parsing rules, and validation copy aligned around the same format.

## Submitted Value Is Not An ISO Date

### Symptom

The form submits `15.01.2026` instead of `2026-01-15`.

### Likely Cause

`DateFieldInput` is a native input, and `name` submits its typed text.

### How To Verify

- Read the field from `FormData` in the submit handler.

### Fix

Take the ISO day from `onChangeValue` on the root instead of the text. To submit it with the form, drop `name` from the input and put it on a hidden input that holds the day, as in [Form/Integration](./examples.md#formintegration).

## Disabled Dates Can Still Be Typed

### Symptom

The calendar blocks some days, but typing one of them is accepted and submitted.

### Likely Cause

`min` and `max` clamp typed dates, but `disabledDates` applies only to the calendar.

### How To Verify

- Type a disabled day and submit the form.

### Fix

Check the same `disabledDates` rule in submit validation and on the server.
