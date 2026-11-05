# Calendar Patterns

## Booking Calendar

When to use:

users pick a stay or a rental period from a visible calendar, and some days cannot be booked.

Composition notes:

Use `selection='range'` with `min` for the first bookable day, `max` for the end of the booking window, and a `disabledDates` predicate for unavailable days. The predicate receives ISO days, so it can look them up in the availability data directly. A range can span a disabled day, so validate the range before accepting it (see [Error: range across a blocked day](./examples.md#error-range-across-a-blocked-day)); here one message linked to the day grid shows the hint, the error, or the summary, and the Reserve button waits for a valid range.

Trade-offs:

Users see availability before they pick, but the calendar takes much more room than a date field and the app owns range validation.

<!-- example: calendar/booking-calendar.tsx -->
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
  HelperText,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const DAY = 86_400_000;
const booked = new Set(['2026-11-12', '2026-11-13', '2026-11-20', '2026-11-21', '2026-12-05']);
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

function isBooked(date: string) {
  return booked.has(date);
}

function spansBookedNight(start: string, end: string) {
  for (let time = Date.parse(start); time < Date.parse(end); time += DAY) {
    if (booked.has(new Date(time).toISOString().slice(0, 10))) return true;
  }

  return false;
}

export default function BookingCalendar() {
  const [[start, end], setRange] = useState<[string, string]>(['', '']);
  const messageId = useId();

  const complete = start !== '' && end !== '';
  const invalid = complete && spansBookedNight(start, end);
  const nights = complete ? (Date.parse(end) - Date.parse(start)) / DAY : 0;

  let message = 'Pick check-in and check-out. Unavailable days are booked.';
  if (invalid) message = 'These dates include a booked night. Pick another range.';
  if (complete && !invalid) message = `${dateFormat.formatRange(new Date(start), new Date(end))}, ${nights} nights`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start' }}>
        <Calendar
          compact
          locale='en-US'
          selection='range'
          min='2026-11-01'
          max='2027-04-30'
          defaultMonth='2026-11-01'
          disabledDates={isBooked}
          value={[start, end]}
          onChangeValue={setRange}
        >
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous' />
            <CalendarViewButtonGroup>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarViewButtonGroup>
            <CalendarNextButton aria-label='Next' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Stay dates' aria-describedby={messageId}>
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
        <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
      </div>
      <Button disabled={!complete || invalid}>Reserve</Button>
    </div>
  );
}
```
<!-- /example -->

## Day-Cell Custom Rendering

When to use:

days need extra content such as a price, a status, or a count of events.

Composition notes:

Children of `CalendarWeeks` are the template of a day cell: they are rendered once per day inside a cell context. Read the day with `useCalendarDayContext()` and put the content inside `CalendarDay`, so the cell keeps selection, focus, disabled, and overflow behavior. The same works for `CalendarMonths` with `CalendarMonth` and `useCalendarMonthContext()`, and for `CalendarYears` with `CalendarYear` and `useCalendarYearContext()`.

The day context is `{ col, date, fields, label, inMonth }`; `date` is `undefined` for an empty overflow cell. Take the day number from `label` or `fields.day`, never from the ISO `date` string: in non-Gregorian calendars they differ. Look up data by `date`, which is the same in every calendar.

Trade-offs:

Users compare days at a glance, but cells get crowded at small sizes (the example uses `size='md'`), and the extra content is not announced unless it is part of the cell's text. Define the template component outside of render, so React keeps the cells mounted between renders.

<!-- example: calendar/day-cell-custom-rendering.tsx -->
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

const fares: Record<string, number> = {
  '2026-11-02': 89,
  '2026-11-03': 89,
  '2026-11-05': 112,
  '2026-11-06': 129,
  '2026-11-09': 74,
  '2026-11-10': 74,
  '2026-11-13': 149,
  '2026-11-16': 89,
  '2026-11-19': 99,
  '2026-11-20': 139,
};

const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function hasNoFare(date: string) {
  return fares[date] === undefined;
}

function FareDay() {
  const { date, label } = useCalendarDayContext();
  const fare = date === undefined ? undefined : fares[date];

  if (fare === undefined) return <CalendarDay />;

  return (
    <CalendarDay style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1.1 }}>
      <span>{label}</span>
      <small style={{ fontSize: '0.7em', color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{price.format(fare)}</small>
    </CalendarDay>
  );
}

export default function DayCellCustomRendering() {
  return (
    <Calendar size='md' locale='en-US' defaultMonth='2026-11-01' disabledDates={hasNoFare}>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Departure date'>
          <CalendarWeekdays>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <FareDay />
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

## Weekday, Month And Year Templates

When to use:

weekday headers, months, or years need their own look, such as dimmed weekends, quarter marks on months, or marked leap years.

Composition notes:

Children of `CalendarWeekdays`, `CalendarMonths`, and `CalendarYears` are templates, like the day cell. Read the item with `useCalendarWeekdayContext()`, `useCalendarMonthContext()`, or `useCalendarYearContext()` and render `CalendarWeekday`, `CalendarMonth`, or `CalendarYear`, so the item keeps its default behavior.

Trade-offs:

Each view can carry its own hint, but visual-only marks such as color or bold text are not announced; the example repeats the quarter and the leap year in the item's `aria-label`.

<!-- example: calendar/weekday-month-year-templates.tsx -->
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
  useCalendarMonthContext,
  useCalendarWeekdayContext,
  useCalendarYearContext,
} from '@vega-ui/react';

function isLeapYear(year: number) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;

  return year % 4 === 0;
}

function Weekday() {
  const { weekday } = useCalendarWeekdayContext();
  const isWeekend = weekday === 0 || weekday === 6;

  if (!isWeekend) return <CalendarWeekday />;

  return <CalendarWeekday style={{ color: 'var(--label-quaternary)' }} />;
}

function QuarterMonth() {
  const { label, fields } = useCalendarMonthContext();

  if (!fields) return <CalendarMonth />;

  const quarter = Math.ceil(fields.month / 3);

  return <CalendarMonth aria-label={`${label}, quarter ${quarter}`}>{label} · Q{quarter}</CalendarMonth>;
}

function LeapYear() {
  const { label, fields } = useCalendarYearContext();

  if (!fields || !isLeapYear(fields.year)) return <CalendarYear />;

  return <CalendarYear aria-label={`${label}, leap year`} style={{ fontWeight: 700 }}>{label}*</CalendarYear>;
}

export default function WeekdayMonthYearTemplates() {
  return (
    <Calendar locale='en-US' defaultMonth='2026-11-01' defaultView='month'>
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
            <Weekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarMonths aria-label='Months' format='short'>
          <QuarterMonth />
        </CalendarMonths>
        <CalendarYears aria-label='Years'>
          <LeapYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Non-Gregorian Calendar

When to use:

the product audience uses a Persian, Hebrew, Japanese, Buddhist, Islamic, or other calendar.

Composition notes:

Create the calendar once with `createCalendarSystem`, outside of render (see [Dates And Calendar Systems](../../i18n.md#calendar-system-adapter)), and pass it to `calendar` together with a matching `locale`. Month lengths, the number of months, eras, and labels follow the calendar; `value`, `min`, `max`, and `disabledDates` stay ISO `YYYY-MM-DD` days. `Calendar` sets `lang` from `locale` but not `dir`: for a right-to-left locale such as `fa-IR` put `dir='rtl'` on the root or an ancestor, and the navigation buttons and chevrons flip with it.

Trade-offs:

Native month lengths, leap months, and eras without changing the stored value or adding dependencies; the calendar data comes from the `Intl` of the runtime.

<!-- example: calendar/non-gregorian-calendar.tsx -->
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

const persianCalendar = createCalendarSystem('persian');

export default function NonGregorianCalendar() {
  const [date, setDate] = useState('2026-03-21');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Calendar dir='rtl' locale='fa-IR' calendar={persianCalendar} value={date} onChangeValue={setDate}>
        <CalendarHeader>
          <CalendarPrevButton aria-label='ماه قبل' />
          <CalendarViewButtonGroup>
            <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
            <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
          </CalendarViewButtonGroup>
          <CalendarNextButton aria-label='ماه بعد' />
        </CalendarHeader>
        <CalendarContent>
          <CalendarDays aria-label='روزها'>
            <CalendarWeekdays format='narrow'>
              <CalendarWeekday />
            </CalendarWeekdays>
            <CalendarWeeks>
              <CalendarDay />
            </CalendarWeeks>
          </CalendarDays>
          <CalendarMonths aria-label='ماه‌ها'>
            <CalendarMonth />
          </CalendarMonths>
          <CalendarYears aria-label='سال‌ها'>
            <CalendarYear />
          </CalendarYears>
        </CalendarContent>
      </Calendar>
      <Text style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {date || 'none'}</Text>
    </div>
  );
}
```
<!-- /example -->

## One Date In Two Calendars

When to use:

users need to see a date in two calendar systems at once, for example a Gregorian and a Hijri calendar on a travel or government form.

Composition notes:

Share one ISO value between two controlled roots with different `calendar` and `locale`. Picking a day in either calendar selects the same day in the other. Each root keeps its own visible month. The roots here show only the days with a plain month label, and the Arabic one is `dir='rtl'`.

Trade-offs:

No conversion code in the app, but two calendars double the footprint; on narrow screens prefer one calendar and show the other date as text with `formatCalendarDate`.

<!-- example: calendar/one-date-in-two-calendars.tsx -->
```tsx
import { createCalendarSystem } from '@vega-ui/i18n';
import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonthLabel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearLabel,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const islamicCalendar = createCalendarSystem('islamic-umalqura');

export default function OneDateInTwoCalendars() {
  const [date, setDate] = useState('2026-10-23');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start' }}>
        <Calendar compact locale='en-GB' value={date} onChangeValue={setDate}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous month' />
            <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
            <CalendarNextButton aria-label='Next month' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Gregorian date'>
              <CalendarWeekdays>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <CalendarDay />
              </CalendarWeeks>
            </CalendarDays>
          </CalendarContent>
        </Calendar>
        <Calendar compact dir='rtl' locale='ar-SA' calendar={islamicCalendar} value={date} onChangeValue={setDate}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='الشهر السابق' />
            <Text fontWeight={600}><CalendarMonthLabel /> <CalendarYearLabel /></Text>
            <CalendarNextButton aria-label='الشهر التالي' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='التاريخ الهجري'>
              <CalendarWeekdays format='narrow'>
                <CalendarWeekday />
              </CalendarWeekdays>
              <CalendarWeeks>
                <CalendarDay />
              </CalendarWeeks>
            </CalendarDays>
          </CalendarContent>
        </Calendar>
      </div>
      <Text style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {date}</Text>
    </div>
  );
}
```
<!-- /example -->

## App-Wide Locale

When to use:

every calendar of the app shares one locale or calendar system.

Composition notes:

The library has no global providers. Wrap `Calendar` once with the app settings and the parts, and use the wrapper everywhere; props given to the wrapper still win, as `locale='fr-FR'` on the second calendar shows.

Trade-offs:

One place to change the settings, but an extra component for each date root the app uses.

<!-- example: calendar/app-wide-locale.tsx -->
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
  type CalendarProps,
  type CalendarSelection,
} from '@vega-ui/react';

const appSettings = { locale: 'en-GB', min: '1900-01-01', max: '2099-12-31' };

function AppCalendar<S extends CalendarSelection = 'single'>(props: Omit<CalendarProps<S>, 'children'>) {
  return (
    <Calendar<S> locale={appSettings.locale} min={appSettings.min} max={appSettings.max} {...props}>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
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
    </Calendar>
  );
}

export default function AppWideLocale() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start', justifyContent: 'center', width: '100%' }}>
      <AppCalendar compact defaultValue='2026-11-03' />
      <AppCalendar compact selection='range' locale='fr-FR' defaultValue={['2026-11-09', '2026-11-13']} />
    </div>
  );
}
```
<!-- /example -->
