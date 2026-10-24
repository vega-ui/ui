# DayPicker Examples

## Basic

### Basic: one month of days

`DayPicker` is the low-level day grid without a header; `DayPickerLayout` renders the month given by `month`. Cells are keyed by ISO days, so `defaultSelected` is an ISO day too. `locale` sets the first day of the week.

```tsx
<DayPicker aria-label='March 2026' locale='en-GB' month='2026-03-01' defaultSelected='2026-03-15'>
  <DayPickerLayout>
    <DayPickerCell />
  </DayPickerLayout>
</DayPicker>
```

## Controlled/Stateful

### Controlled/Stateful: selected day

`selected` and `onSelectCell` make the selection controlled; the app decides what happens with the picked day.

```tsx
const DueDate = () => {
  const [due, setDue] = useState<string | null>(null);

  return (
    <>
      <DayPicker aria-label='Due date' month='2026-11-01' selected={due} onSelectCell={setDue}>
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <Text>Due: {due ?? 'not set'}</Text>
    </>
  );
};
```

### Controlled/Stateful: visible month with own navigation

With a scroller the month is swipeable. Keep `month` in state and update it from `onChangePeriod`, so a custom header stays in sync with swipes and its buttons can move the grid.

```tsx
import { addCalendarMonths, formatCalendarDate, gregorianCalendar } from '@vega-ui/i18n';

const MonthBrowser = () => {
  const [month, setMonth] = useState('2026-10-01');

  return (
    <>
      <Button size='sm' onClick={() => setMonth(addCalendarMonths(gregorianCalendar, month, -1))}>Previous</Button>
      <Text>{formatCalendarDate(gregorianCalendar, month, 'en-US', { month: 'long', year: 'numeric' })}</Text>
      <Button size='sm' onClick={() => setMonth(addCalendarMonths(gregorianCalendar, month, 1))}>Next</Button>
      <DayPicker aria-label='Days' locale='en-US' month={month}>
        <DayPickerScroller onChangePeriod={setMonth}>
          <DayPickerScrollerContent>
            <DayPickerScrollerLayout>
              <DayPickerCell />
            </DayPickerScrollerLayout>
          </DayPickerScrollerContent>
        </DayPickerScroller>
      </DayPicker>
    </>
  );
};
```

## Form/Integration

### Form/Integration: several days in a form

`selection='multiple'` picks independent days. The picker has no form value, so submit the days as hidden inputs with one name.

```tsx
const ShiftsForm = () => {
  const [days, setDays] = useState<string[]>([]);

  return (
    <form action='/shifts' method='post'>
      <DayPicker aria-label='Shift days' selection='multiple' month='2026-11-01' selected={days} onSelectCell={setDays}>
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      {days.map((day) => (
        <input key={day} type='hidden' name='days' value={day} />
      ))}
      <Button type='submit' disabled={days.length === 0}>Save {days.length} shifts</Button>
    </form>
  );
};
```

## Layout/Overlay

### Layout/Overlay: two months side by side

One `DayPicker` can hold several layouts, so a range can be picked across two months. Give each layout its `month` and a distinct `offset`, which keeps row indexes unique across the grid.

```tsx
<DayPicker
  aria-label='Travel dates'
  selection='range'
  style={{ gridAutoFlow: 'column', gap: 24 }}
>
  <DayPickerLayout month='2026-11-01'>
    <DayPickerCell />
  </DayPickerLayout>
  <DayPickerLayout month='2026-12-01' offset={1}>
    <DayPickerCell />
  </DayPickerLayout>
</DayPicker>
```

## Error

### Error: booking window and closed weekdays

`from` and `to` disable every day outside the window, and the `disabled` predicate closes Sundays. Explain the rule next to the grid: a disabled day does not say why it is unavailable.

```tsx
import { getISOWeekday } from '@vega-ui/i18n';

<>
  <DayPicker
    aria-label='Pickup day'
    month='2026-11-01'
    from='2026-11-03'
    to='2026-11-24'
    disabled={(day) => getISOWeekday(day) === 0}
  >
    <DayPickerLayout>
      <DayPickerCell />
    </DayPickerLayout>
  </DayPicker>
  <HelperText>Pickup is possible from November 3 to 24, Monday to Saturday.</HelperText>
</>
```

## Disabled

### Disabled: specific days

An array of ISO days disables exactly those days; they cannot be selected or focused.

```tsx
<DayPicker aria-label='Delivery day' month='2026-12-01' disabled={['2026-12-24', '2026-12-25', '2026-12-31']}>
  <DayPickerLayout>
    <DayPickerCell />
  </DayPickerLayout>
</DayPicker>
```

## Edge

### Edge: month of another calendar system

With a calendar system from `createCalendarSystem` (see [Calendar System Adapter](../../i18n.md#calendar-system-adapter)), the grid shows a month of that calendar: Farvardin 1405 has 31 days, starts on the ISO day `2026-03-21`, and the `fa-IR` week starts on Saturday. `month` is any ISO day inside the month.

```tsx
const persianCalendar = createCalendarSystem('persian');

<DayPicker aria-label='Farvardin 1405' calendar={persianCalendar} locale='fa-IR' month='2026-04-01'>
  <DayPickerLayout>
    <DayPickerCell />
  </DayPickerLayout>
</DayPicker>
```

### Edge: overflow days

`includeOverflowDays` fills empty cells with days of the neighbouring months. `DayPickerCell` renders them disabled and excluded from selection; a template can also style them through `inMonth`.

```tsx
import { DayPickerCell, useDayPickerCellContext } from '@vega-ui/react';

const Day = () => {
  const { inMonth } = useDayPickerCellContext();

  return <DayPickerCell style={{ opacity: inMonth ? 1 : 0.4 }} />;
};

<DayPicker aria-label='February 2026' month='2026-02-01'>
  <DayPickerLayout includeOverflowDays>
    <Day />
  </DayPickerLayout>
</DayPicker>
```
