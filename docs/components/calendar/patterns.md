# Calendar Patterns

## Booking Calendar

When to use:

users pick a stay or a rental period from a visible calendar, and some days cannot be booked.

Composition notes:

Use `selection='range'` with `min` for the first bookable day, `max` for the end of the booking window, and a `disabledDates` predicate for unavailable days. The predicate receives ISO days, so it can look them up in the availability data directly. A range can span a disabled day, so validate the range before accepting it (see [Error: range across a blocked day](./examples.md#error-range-across-a-blocked-day)).

Trade-offs:

Users see availability before they pick, but the calendar takes much more room than a date field and the app owns range validation.

```tsx
const BookingCalendar = ({ isBooked }: { isBooked(date: string): boolean }) => {
  const [range, setRange] = useState<[string, string]>(['', '']);

  return (
    <Calendar compact selection='range' min='2026-10-23' max='2027-04-30' disabledDates={isBooked} value={range} onChangeValue={setRange}>
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
};
```

## Day-Cell Custom Rendering

When to use:

days need extra content such as a price, a status, or a count of events.

Composition notes:

Children of `CalendarWeeks` are the template of a day cell: they are rendered once per day inside a cell context. Read the day with `useCalendarDayContext()` and put the content inside `CalendarDay`, so the cell keeps selection, focus, disabled, and overflow behavior. The same works for `CalendarMonths` with `CalendarMonth` and `useCalendarMonthContext()`, and for `CalendarYears` with `CalendarYear` and `useCalendarYearContext()`.

The day context is `{ col, date, fields, label, inMonth }`; `date` is `undefined` for an empty overflow cell. Take the day number from `label` or `fields.day`, never from the ISO `date` string: in non-Gregorian calendars they differ. Look up data by `date`, which is the same in every calendar.

Trade-offs:

Users compare days at a glance, but cells get crowded at small sizes, and the extra content is not announced unless it is part of the cell's text.

```tsx
import { CalendarDay, useCalendarDayContext } from '@vega-ui/react';

const prices: Record<string, number> = { '2026-11-02': 89, '2026-11-03': 89, '2026-11-06': 129 };
const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const PricedDay = () => {
  const { date, label } = useCalendarDayContext();
  const amount = date ? prices[date] : undefined;

  return (
    <CalendarDay style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span>{label}</span>
      {amount !== undefined && <small>{price.format(amount)}</small>}
    </CalendarDay>
  );
};

<Calendar defaultMonth='2026-11-01' disabledDates={(date) => prices[date] === undefined}>
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
        <PricedDay />
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
```

## Non-Gregorian Calendar

When to use:

the product audience uses a Persian, Hebrew, Japanese, Buddhist, Islamic, or other calendar.

Composition notes:

Create the calendar once with `createCalendarSystem`, outside of render (see [Dates And Calendar Systems](../../i18n.md#calendar-system-adapter)), and pass it to `calendar` together with a matching `locale`. Month lengths, the number of months, eras, and labels follow the calendar; `value`, `min`, `max`, and `disabledDates` stay ISO `YYYY-MM-DD` days.

Trade-offs:

Native month lengths, leap months, and eras without changing the stored value or adding dependencies; the calendar data comes from the `Intl` of the runtime.

```tsx
const persianCalendar = createCalendarSystem('persian');

<Calendar locale='fa-IR' calendar={persianCalendar} defaultValue='2026-03-21'>
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
```

## One Date In Two Calendars

When to use:

users need to see a date in two calendar systems at once, for example a Gregorian and a Hijri calendar on a travel or government form.

Composition notes:

Share one ISO value between two controlled roots with different `calendar` and `locale`. Picking a day in either calendar selects the same day in the other. Each root keeps its own visible month. `CalendarParts` is the part markup from [Basic](./examples.md#basic-single-date-in-a-locale).

Trade-offs:

No conversion code in the app, but two calendars double the footprint; on narrow screens prefer one calendar and show the other date as text with `formatCalendarDate`.

```tsx
const islamicCalendar = createCalendarSystem('islamic-umalqura');

const DualCalendar = () => {
  const [date, setDate] = useState('2026-10-23');

  return (
    <>
      <Calendar compact locale='en-GB' value={date} onChangeValue={setDate}>
        <CalendarParts />
      </Calendar>
      <Calendar compact locale='ar-SA' calendar={islamicCalendar} value={date} onChangeValue={setDate}>
        <CalendarParts />
      </Calendar>
    </>
  );
};
```

## App-Wide Locale

When to use:

every calendar of the app shares one locale or calendar system.

Composition notes:

The library has no global providers. Wrap `Calendar` once with the app settings and use the wrapper everywhere; props given to the wrapper still win.

Trade-offs:

One place to change the settings, but an extra component for each date root the app uses.

```tsx
import { Calendar, type CalendarProps, type CalendarSelection } from '@vega-ui/react';

const AppCalendar = <S extends CalendarSelection = 'single'>(props: CalendarProps<S>) => (
  <Calendar locale='de-DE' {...props} />
);
```
