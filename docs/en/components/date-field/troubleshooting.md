# DateField Troubleshooting

## Calendar Button Opens Nothing

### Symptom

The trigger icon button renders, but clicking it never shows a calendar.

### Likely Cause

`DateFieldTrigger` was rendered without a surrounding `Popover` or without `DateFieldCalendar` inside the overlay.

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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <DateField format='dd.MM.yyyy' separator='.'>
      <DateFieldInput aria-label='Due date' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTrigger square aria-label='Choose due date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateFieldCalendar aria-label='Choose due date'>
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

`DateFieldInput` submits the text it shows under its `name`, like any native input.

### How To Verify

- Read the field from `FormData` in the submit handler.

### Fix

Keep the `YYYY-MM-DD` day from `onChangeValue` in state and submit it through a hidden input of your own. See [Form/Integration](./examples.md#formintegration).

## Disabled Dates Can Still Be Typed

### Symptom

The calendar blocks some days, but typing one of them is accepted and submitted.

### Likely Cause

Like a date outside `min` and `max`, a typed day from `disabledDates` stays in the input and only makes it invalid.

### How To Verify

- Type a disabled day and check `input.validity.customError` or `:invalid`.

### Fix

Let the browser block the submit (do not use `noValidate`), or check `form.checkValidity()` yourself, and show your message from `onInvalid`. Check the same rule on the server.

## Calendar Closes After A Pick

### Symptom

The popup closes as soon as a day is picked, but the product wants it to stay open.

### Likely Cause

Picking closes the popup and returns the focus to the trigger, as the WAI-ARIA date picker dialog pattern describes.

### How To Verify

- Pick a day with a click or <kbd>Enter</kbd> and check whether the popup hides.

### Fix

Control `open` on the `Popover` and set it back to `true` in `onChangeValue` of `DateFieldCalendar`. It runs after the field closes the popup, in the same update, so the popup never hides.

## Two-Digit Year Reads The Wrong Century

### Symptom

With a format such as `MM/dd/yy`, a typed year lands in an unexpected century.

### Likely Cause

A two-digit year is read within 80 years before and 19 years after the year of `today`, like CLDR and ICU. A wrong device date or `today` moves the window.

### How To Verify

- Check `today` on the root, or the date of the device when it is not set.

### Fix

Pass `today` explicitly, or use a four-digit year (`yyyy`) when dates far in the past or future are expected.
