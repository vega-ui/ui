# Calendar Examples

## Basic

### Basic: single date in a locale

The full composition: header with navigation and view switches, then the day, month, and year views. `locale` sets the month and weekday names and the first day of the week; `defaultValue` is an ISO day and also opens its month. The navigation buttons and the views have no built-in names, so they get `aria-label`s in the language of the calendar.

<!-- example: calendar/single-date-in-a-locale.tsx -->
```tsx
import {
  Calendar,
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
} from '@vega-ui/react';

export default function SingleDateInALocale() {
  return (
    <Calendar locale='de-DE' defaultValue='2026-03-15'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Zurück' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'>
            <CalendarMonthLabel />
          </CalendarViewButton>
          <CalendarViewButton view='year'>
            <CalendarYearLabel />
          </CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Weiter' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Tage'>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarMonths aria-label='Monate'>
          <CalendarMonth />
        </CalendarMonths>
        <CalendarYears aria-label='Jahre'>
          <CalendarYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: value and visible month

`value` and `month` are both controlled, so a "Today" button can select today and scroll to it in one step. Navigating only calls `onChangeMonth`, which the readout below the calendar follows; the value changes only when a day is picked.

<!-- example: calendar/value-and-visible-month.tsx -->
```tsx
import {
  Button,
  Calendar,
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
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${now.getFullYear()}-${month}-${day}`;
}

export default function ValueAndVisibleMonth() {
  const [value, setValue] = useState('');
  const [month, setMonth] = useState(getToday);

  const showToday = () => {
    const today = getToday();
    setValue(today);
    setMonth(today);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' value={value} onChangeValue={setValue} month={month} onChangeMonth={setMonth}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Delivery date'>
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
      </Calendar>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Text aria-live='polite'>
          Delivery: {value ? dateFormat.format(new Date(value)) : 'not scheduled'}
        </Text>
        <Text style={{ color: 'var(--label-secondary)' }}>
          Showing {monthFormat.format(new Date(month))}
        </Text>
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={showToday}>Today</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setValue('')} disabled={!value}>Clear</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: range with a summary

In range mode the value is a `[start, end]` tuple; `''` marks a bound that is not picked yet. The bounds always come in order, `start` before `end`, whichever was picked first, so the summary can count nights without sorting.

<!-- example: calendar/range-with-a-summary.tsx -->
```tsx
import {
  Button,
  Calendar,
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
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const DAY = 86_400_000;
export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

function getSummary(locale: string, start: string, end: string) {
  const dateFormat = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', timeZone: 'UTC' });

  if (!start) return 'Pick a check-in date';
  if (!end) return `Check-in ${dateFormat.format(new Date(start))}, pick a check-out date`;

  const nights = (Date.parse(end) - Date.parse(start)) / DAY;
  const range = dateFormat.formatRange(new Date(start), new Date(end));

  if (nights === 1) return `${range}: 1 night`;

  return `${range}: ${nights} nights`;
}

export default function RangeWithASummary({ locale = 'en-US' }: { locale?: string }) {
  const [[start, end], setRange] = useState<[string, string]>(['', '']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale={locale} selection='range' value={[start, end]} onChangeValue={setRange}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Stay dates'>
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
      </Calendar>
      <Text aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>{getSummary(locale, start, end)}</Text>
      <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRange(['', ''])} disabled={!start}>
        Clear dates
      </Button>
    </div>
  );
}
```
<!-- /example -->

### Controlled/Stateful: multiple dates with a limit

`selection='multiple'` makes the value an array of ISO days in the order they were picked. A controlled value can refuse a change: here `onChangeValue` ignores a sixth day, so the calendar keeps showing five.

<!-- example: calendar/multiple-dates.tsx -->
```tsx
import {
  Calendar,
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
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const MAX_DAYS = 5;
const dateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });

export default function MultipleDates() {
  const [days, setDays] = useState<string[]>(['2026-11-04', '2026-11-11']);

  const change = (next: string[]) => {
    if (next.length > MAX_DAYS) return;
    setDays(next);
  };

  const sorted = [...days].sort();
  const isFull = days.length === MAX_DAYS;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' selection='multiple' value={days} onChangeValue={change}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Office days'>
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
      </Calendar>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text aria-live='polite' fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>
          {days.length} of {MAX_DAYS} office days{isFull ? ', unselect a day to pick another' : ''}
        </Text>
        <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-12)' }}>
          {sorted.map((day) => (
            <li key={day}><Text style={{ color: 'var(--label-secondary)' }}>{dateFormat.format(new Date(day))}</Text></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: submit the date with a form

`Calendar` has no form value of its own and no `required`: keep the ISO day in state, submit it with a hidden input, and read it back with `FormData`. The empty check runs on submit, and its message is linked to the day grid with `aria-describedby`; the reset button clears the state through the form's `reset` event.

<!-- example: calendar/submit-the-date-with-a-form.tsx -->
```tsx
import {
  Button,
  Calendar,
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
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function SubmitTheDateWithAForm() {
  const [date, setDate] = useState('');
  const [missing, setMissing] = useState(false);
  const [submitted, setSubmitted] = useState('');
  const errorId = useId();

  const pick = (next: string) => {
    setDate(next);
    setMissing(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const appointment = String(data.get('appointment'));

    if (!appointment) {
      setMissing(true);
      return;
    }

    setSubmitted(appointment);
  };

  const reset = () => {
    setDate('');
    setMissing(false);
    setSubmitted('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Appointment date</FieldsetLegend>
        <Calendar locale='en-US' value={date} onChangeValue={pick}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous' />
            <CalendarViewButtonGroup>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarViewButtonGroup>
            <CalendarNextButton aria-label='Next' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Appointment date' aria-describedby={missing ? errorId : undefined}>
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
        </Calendar>
        {missing && <HelperText id={errorId} error>Pick a date for the appointment.</HelperText>}
      </Fieldset>
      <input type='hidden' name='appointment' value={date} />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{submitted ? `Sent appointment=${submitted}` : ''}</Text>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: calendar in a popover

A date picker made of a trigger and a compact calendar in `Popover`. The popover is controlled, so it closes as soon as a day is picked; the trigger's accessible name keeps the field name next to the chosen date.

<!-- example: calendar/calendar-in-a-popover.tsx -->
```tsx
import {
  Button,
  Calendar,
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
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon } from '@vega-ui/icons';
import { useState } from 'react';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

export default function CalendarInAPopover() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');

  const pick = (next: string) => {
    setDate(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost' aria-label={date ? `Due date, ${dateFormat.format(new Date(date))}` : 'Due date'}>
          <Icon size='sm'><CalendarIcon /></Icon>
          {date ? dateFormat.format(new Date(date)) : 'Pick a due date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Choose a due date'>
        <Calendar compact locale='en-US' value={date} onChangeValue={pick}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous' />
            <CalendarViewButtonGroup>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarViewButtonGroup>
            <CalendarNextButton aria-label='Next' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Due date'>
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
        </Calendar>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Error

### Error: range across a blocked day

`disabledDates` stops a blocked day from being picked, but a range can still span it. Validate the range in the app, show the error only while the value is wrong, and link it to the day grid with `aria-describedby`.

<!-- example: calendar/range-across-a-blocked-day.tsx -->
```tsx
import {
  Calendar,
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
  HelperText,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const soldOut = ['2026-11-14', '2026-11-15'];
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });

function findSoldOut(start: string, end: string) {
  if (!start || !end) return [];

  return soldOut.filter((day) => day >= start && day <= end);
}

export default function RangeAcrossABlockedDay() {
  const [[start, end], setRange] = useState<[string, string]>(['2026-11-12', '2026-11-17']);
  const errorId = useId();

  const blocked = findSoldOut(start, end);
  const invalid = blocked.length > 0;
  const blockedLabel = blocked.map((day) => dateFormat.format(new Date(day))).join(' and ');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' selection='range' disabledDates={soldOut} value={[start, end]} onChangeValue={setRange}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Room dates' aria-describedby={invalid ? errorId : undefined}>
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
      </Calendar>
      {invalid && (
        <HelperText id={errorId} error>
          The room is sold out on {blockedLabel}. Pick dates before or after them.
        </HelperText>
      )}
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: whole calendar while saving

`disabled` turns off selection and navigation in every view, here while the new meeting date is being saved. The status next to the calendar says what is happening; a disabled calendar alone does not.

<!-- example: calendar/whole-calendar-while-saving.tsx -->
```tsx
import {
  Calendar,
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
  Spinner,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

function saveMeeting(date: string) {
  return new Promise<string>((resolve) => setTimeout(() => resolve(date), 1500));
}

export default function WholeCalendarWhileSaving() {
  const [date, setDate] = useState('2026-11-02');
  const [saving, setSaving] = useState(false);

  const reschedule = async (next: string) => {
    setDate(next);
    setSaving(true);
    await saveMeeting(next);
    setSaving(false);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' disabled={saving} value={date} onChangeValue={reschedule}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Meeting date'>
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
      </Calendar>
      <div aria-live='polite' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Text>
          {saving ? `Moving the meeting to ${dateFormat.format(new Date(date))}…` : `Meeting on ${dateFormat.format(new Date(date))}`}
        </Text>
        {saving && <Spinner size={2} aria-label='Saving' />}
      </div>
    </div>
  );
}
```
<!-- /example -->

### Disabled: booking window, weekends and holidays

Days before `min` and after `max` are disabled, and the previous / next buttons hide at those months. The `disabledDates` predicate closes weekends and a list of holidays; an array of ISO days works too when the list is all there is. The rule is written next to the calendar and linked with `aria-describedby`, because a disabled day does not say why.

<!-- example: calendar/booking-window-and-blocked-days.tsx -->
```tsx
import {
  Calendar,
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
  HelperText,
} from '@vega-ui/react';
import { useId } from 'react';

const holidays = ['2026-12-24', '2026-12-25', '2026-12-31'];

function isClosed(date: string) {
  const weekday = new Date(date).getUTCDay();
  if (weekday === 0 || weekday === 6) return true;

  return holidays.includes(date);
}

export default function BookingWindowAndBlockedDays() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' min='2026-12-01' max='2027-01-31' defaultMonth='2026-12-01' disabledDates={isClosed}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Pickup date' aria-describedby={hintId}>
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
      </Calendar>
      <HelperText id={hintId}>
        Pickup runs on weekdays from December 1 to January 31, except December 24, 25 and 31.
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: overflow days

`includeOverflowDays` fills the empty cells with days of the previous and next months. They are shown but cannot be selected; the day template styles them through `inMonth`.

<!-- example: calendar/overflow-days.tsx -->
```tsx
import {
  Calendar,
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
  useCalendarDayContext,
} from '@vega-ui/react';

function OverflowDay() {
  const { inMonth } = useCalendarDayContext();

  if (inMonth) return <CalendarDay />;

  return <CalendarDay style={{ color: 'var(--label-quaternary)' }} />;
}

export default function OverflowDays() {
  return (
    <Calendar locale='en-US' defaultMonth='2026-02-01'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Days'>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks includeOverflowDays>
            <OverflowDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarMonths>
          <CalendarMonth />
        </CalendarMonths>
        <CalendarYears>
          <CalendarYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

### Edge: min and max inside one month

When `min` and `max` fall in the same month, both previous and next buttons hide and only the days between them can be picked; keyboard focus starts on the first available day. The calendar does not move to `min` by itself: without `defaultMonth` it opens on the current month, even when that month is out of range.

<!-- example: calendar/min-and-max-inside-one-month.tsx -->
```tsx
import {
  Calendar,
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
  HelperText,
} from '@vega-ui/react';
import { useId } from 'react';

const conference = { min: '2026-11-10', max: '2026-11-20' };

export default function MinAndMaxInsideOneMonth() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <Calendar locale='en-US' min={conference.min} max={conference.max} defaultMonth={conference.min}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Session day' aria-describedby={hintId}>
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
      </Calendar>
      <HelperText id={hintId}>Sessions run from November 10 to 20.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Edge: 13-month year

With a calendar system from `createCalendarSystem` (see [Calendar System Adapter](../../i18n.md#calendar-system-adapter)), the month view follows that calendar. The Hebrew year 5784 is a leap year, so `CalendarMonths` shows 13 months, Adar I and Adar II included. The value is still an ISO day, as the readout shows.

<!-- example: calendar/13-month-year.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import {
  Calendar,
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
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const hebrewCalendar = createCalendarSystem('hebrew');
const hebrewDate = new Intl.DateTimeFormat('en-US-u-ca-hebrew', { dateStyle: 'long', timeZone: 'UTC' });

export default function ThirteenMonthYear() {
  const [date, setDate] = useState('2024-03-11');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar calendar={hebrewCalendar} locale='en-US' value={date} onChangeValue={setDate} defaultView='month'>
        <CalendarHeader>
          <CalendarPrevButton aria-label='Previous' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='Next' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='Days'>
            <CalendarWeekdays>
              <CalendarWeekday />
            </CalendarWeekdays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths aria-label='Months' cols={4}>
            <CalendarMonth />
          </CalendarMonths>
          <CalendarYears>
            <CalendarYear />
          </CalendarYears>
        </CalendarContent>
      </Calendar>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {date ? `${date} is ${hebrewDate.format(new Date(date))}` : 'Pick a day'}
      </Text>
    </div>
  );
}
```
<!-- /example -->
