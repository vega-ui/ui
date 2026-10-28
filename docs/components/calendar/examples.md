# Calendar Examples

## Basic

### Basic: single date in a locale

The full composition: header with navigation and view switches, then the day, month, and year views. `locale` sets the month and weekday names and the first day of the week; `defaultValue` is an ISO day and also opens its month.

```tsx
<Calendar locale='de-DE' defaultValue='2026-03-15'>
  <CalendarHeader>
    <CalendarPrevButton aria-label='Previous' />
    <CalendarViewButtonGroup>
      <CalendarViewButton view='month'>
        <CalendarMonthLabel />
      </CalendarViewButton>
      <CalendarViewButton view='year'>
        <CalendarYearLabel />
      </CalendarViewButton>
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

The parts read everything from the root, so they can live in one component. Examples below use this `CalendarParts` when they do not change the parts:

```tsx
const CalendarParts = () => (
  <>
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
  </>
);
```

## Controlled/Stateful

### Controlled/Stateful: value and visible month

`value` and `month` are both controlled, so a "Today" button can select today and scroll to it in one step. Navigating only calls `onChangeMonth`; the value changes when a day is picked.

```tsx
const today = '2026-10-23';

const DeliveryDate = () => {
  const [value, setValue] = useState(today);
  const [month, setMonth] = useState(today);

  const showToday = () => {
    setValue(today);
    setMonth(today);
  };

  return (
    <>
      <Calendar value={value} onChangeValue={setValue} month={month} onChangeMonth={setMonth}>
        <CalendarParts />
      </Calendar>
      <Text>Selected: {value || 'nothing'}</Text>
      <Button size='sm' onClick={showToday}>Today</Button>
      <Button size='sm' onClick={() => setValue('')}>Clear</Button>
    </>
  );
};
```

### Controlled/Stateful: range with a summary

In range mode the value is a `[start, end]` tuple; `''` marks a bound that is not picked yet. The bounds always come in order, `start` before `end`, whichever was picked first.

```tsx
const nightsBetween = (start: string, end: string) => (Date.parse(end) - Date.parse(start)) / 86_400_000;

const StayDates = () => {
  const [[start, end], setRange] = useState<[string, string]>(['', '']);

  return (
    <>
      <Calendar selection='range' value={[start, end]} onChangeValue={setRange}>
        <CalendarParts />
      </Calendar>
      <Text>
        {start && end ? `${nightsBetween(start, end)} nights` : 'Pick check-in and check-out'}
      </Text>
    </>
  );
};
```

## Form/Integration

### Form/Integration: submit the date with a form

`Calendar` has no form value of its own. Keep the ISO day in state and submit it with a hidden input; a `Fieldset` legend names the calendar, and the submit waits until a day is chosen.

```tsx
const AppointmentForm = () => {
  const [date, setDate] = useState('');

  return (
    <form action='/appointments' method='post'>
      <Fieldset>
        <FieldsetLegend>Appointment date</FieldsetLegend>
        <Calendar min='2026-10-23' value={date} onChangeValue={setDate}>
          <CalendarParts />
        </Calendar>
      </Fieldset>
      <input type='hidden' name='date' value={date} />
      <Button type='submit' disabled={!date}>Book</Button>
    </form>
  );
};
```

## Layout/Overlay

### Layout/Overlay: calendar in a popover

A date picker made of a trigger and a calendar in `Popover`. The popover is controlled, so it closes as soon as a day is picked.

```tsx
import { formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

const DatePicker = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');

  const pick = (next: string) => {
    setDate(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary'>
          {date ? formatCalendarDate(gregorianCalendar, date, 'en-US', { dateStyle: 'medium' }) : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar compact locale='en-US' value={date} onChangeValue={pick}>
          <CalendarParts />
        </Calendar>
      </PopoverContent>
    </Popover>
  );
};
```

## Error

### Error: booking window and blocked days

Days before `min` and after `max` are disabled, and the prev / next buttons hide at those months. The `disabledDates` predicate blocks weekends. Say why days are unavailable next to the calendar: the disabled state alone does not explain it.

```tsx
import { getISOWeekday } from '@vega-ui/i18n';

const isWeekend = (date: string) => {
  const weekday = getISOWeekday(date);
  return weekday === 0 || weekday === 6;
};

<>
  <Calendar min='2026-10-23' max='2026-12-31' disabledDates={isWeekend}>
    <CalendarParts />
  </Calendar>
  <HelperText>Pickup is available on weekdays until December 31.</HelperText>
</>
```

### Error: range across a blocked day

`disabledDates` stops a blocked day from being picked, but a range can still span it. Validate the range in the app and show the error only when the value is wrong.

```tsx
import { addISODays } from '@vega-ui/i18n';

const soldOut = ['2026-11-14', '2026-11-15'];

const spansSoldOut = (start: string, end: string) => {
  for (let day = start; day <= end; day = addISODays(day, 1)) {
    if (soldOut.includes(day)) return true;
  }

  return false;
};

const RoomDates = () => {
  const [[start, end], setRange] = useState<[string, string]>(['', '']);
  const invalid = start !== '' && end !== '' && spansSoldOut(start, end);

  return (
    <>
      <Calendar selection='range' disabledDates={soldOut} value={[start, end]} onChangeValue={setRange}>
        <CalendarParts />
      </Calendar>
      {invalid && <HelperText error>The room is sold out on November 14–15. Pick dates around them.</HelperText>}
    </>
  );
};
```

## Disabled

### Disabled: whole calendar while saving

`disabled` turns off selection and navigation for every view, for example while the chosen date is being saved.

```tsx
const RescheduleCalendar = ({ saving, onReschedule }: { saving: boolean; onReschedule(date: string): void }) => (
  <Calendar disabled={saving} defaultValue='2026-11-02' onChangeValue={onReschedule}>
    <CalendarParts />
  </Calendar>
);
```

### Disabled: specific dates

An array of ISO days disables exactly those days, here public holidays; the rest of the month stays selectable.

```tsx
const holidays = ['2026-12-24', '2026-12-25', '2026-12-26', '2026-12-31'];

<Calendar defaultMonth='2026-12-01' disabledDates={holidays}>
  <CalendarParts />
</Calendar>
```

## Edge

### Edge: overflow days

`includeOverflowDays` fills the empty cells with days of the previous and next months. They are shown but cannot be selected; the day template can style them through `inMonth`.

```tsx
import { CalendarDay, useCalendarDayContext } from '@vega-ui/react';

const Day = () => {
  const { inMonth } = useCalendarDayContext();

  return <CalendarDay style={{ opacity: inMonth ? 1 : 0.4 }} />;
};

<Calendar defaultMonth='2026-03-01'>
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
      <CalendarWeeks includeOverflowDays>
        <Day />
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

### Edge: min and max inside one month

When `min` and `max` fall in the same month, both prev and next buttons hide and only the days between them can be picked; keyboard focus starts on the first available day. The calendar does not move to `min` by itself: without `defaultMonth` it opens on the current month, even when that month is out of range.

```tsx
<Calendar min='2026-11-10' max='2026-11-20' defaultMonth='2026-11-10'>
  <CalendarParts />
</Calendar>
```

### Edge: 13-month year

With a calendar system from `createCalendarSystem` (see [Calendar System Adapter](../../i18n.md#calendar-system-adapter)), the month view follows that calendar. The Hebrew year 5784 is a leap year, so `CalendarMonths` shows 13 months, Adar I and Adar II included. The value is still an ISO day.

```tsx
const hebrewCalendar = createCalendarSystem('hebrew');

<Calendar calendar={hebrewCalendar} locale='en-US' defaultValue='2024-03-11' defaultView='month'>
  <CalendarParts />
</Calendar>
```
