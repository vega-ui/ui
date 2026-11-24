# WheelPicker Patterns

## A Duration With Units

When to use:

- A timer or a reminder asks for hours, minutes and seconds, or for an amount and a unit.

Composition notes:

- Put the units between the columns as plain text with `align-self: center` and `aria-hidden`, and name each column with the unit.
- Loop the minutes and the seconds; keep the hours bounded when the range starts at 0.
- Sum the values up next to the picker, in a status line, so the user sees the whole duration in words.

Trade-offs:

- Fixed units read well and save space, but they do not change with the number; for "1 day" and "2 days" let a column show the unit instead.

<!-- example: wheel-picker/timer.tsx -->
```tsx
import { useState } from 'react';
import { Button, Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const hours = Array.from({ length: 24 }, (_, hour) => hour);
const sixty = Array.from({ length: 60 }, (_, value) => value);
const unit = { alignSelf: 'center', color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)' } as const;

const summaryOf = (hour: number, minute: number, second: number) => {
  const parts = [hour && `${hour} h`, minute && `${minute} min`, second && `${second} s`].filter(Boolean);
  if (parts.length === 0) return 'Pick a duration';

  return `Rings in ${parts.join(' ')}`;
};

export default function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const empty = hour === 0 && minute === 0 && second === 0;

  return (
    <section
      aria-labelledby='timer-title'
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 360,
        padding: 'var(--spacing-8)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      <Text id='timer-title' size={3} fontWeight={600} style={{ justifySelf: 'start' }}>Focus timer</Text>
      <WheelPicker aria-labelledby='timer-title'>
        <WheelPickerColumn aria-label='Hours' value={hour} onChangeValue={setHour}>
          {hours.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <span aria-hidden='true' style={unit}>h</span>
        <WheelPickerColumn aria-label='Minutes' loop value={minute} onChangeValue={setMinute}>
          {sixty.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <span aria-hidden='true' style={unit}>min</span>
        <WheelPickerColumn aria-label='Seconds' loop value={second} onChangeValue={setSecond}>
          {sixty.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <span aria-hidden='true' style={unit}>s</span>
      </WheelPicker>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{summaryOf(hour, minute, second)}</Text>
        <Button size='xs' disabled={empty}>Start</Button>
      </div>
    </section>
  );
}
```
<!-- /example -->

## A Value In A Popover

When to use:

- A form or a toolbar shows a day and a time as a button, and the wheels open only to change it.

Composition notes:

- Put the picker in a [Popover](../popover/) with `role='dialog'`, opened by a button whose text is the value.
- Apply the value while the wheels turn, so the popover closes with Escape or a click outside and needs no "Done" button.
- Name the popover and the picker; the button describes itself with the label next to it.

Trade-offs:

- The value is visible but compact; a sheet from the bottom suits a phone better than a popover when the picker is the main task of the screen.

<!-- example: wheel-picker/delivery-slot.tsx -->
```tsx
import { useState } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
const dayName = (offset: number) => {
  if (offset === 0) return 'Today';
  if (offset === 1) return 'Tomorrow';

  return dayFormat.format(new Date(Date.now() + offset * 86_400_000));
};

const days = Array.from({ length: 7 }, (_, offset) => offset);
const hours = Array.from({ length: 13 }, (_, index) => index + 9);
const minutes = [0, 15, 30, 45];
const pad = (value: number) => String(value).padStart(2, '0');

export default function DeliverySlot() {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(14);
  const [minute, setMinute] = useState(30);

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-3)', width: '100%' }}>
      <Text id='delivery-label' size={2} style={{ color: 'var(--label-secondary)' }}>Delivery</Text>
      <Popover role='dialog' placement='bottom'>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='ghost' aria-describedby='delivery-label'>
            {`${dayName(day)}, ${pad(hour)}:${pad(minute)}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent aria-label='Delivery time' style={{ padding: 'var(--spacing-6)' }}>
          <WheelPicker aria-label='Delivery time'>
            <WheelPickerColumn aria-label='Day' value={day} onChangeValue={setDay} style={{ minInlineSize: '8em' }}>
              {days.map((offset) => <WheelPickerOption key={offset} value={offset}><WheelPickerFace>{dayName(offset)}</WheelPickerFace></WheelPickerOption>)}
            </WheelPickerColumn>
            <WheelPickerColumn aria-label='Hours' value={hour} onChangeValue={setHour}>
              {hours.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
            </WheelPickerColumn>
            <WheelPickerColumn aria-label='Minutes' loop value={minute} onChangeValue={setMinute}>
              {minutes.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
            </WheelPickerColumn>
          </WheelPicker>
        </PopoverContent>
      </Popover>
    </div>
  );
}
```
<!-- /example -->

## A Date On A Touch Screen

When to use:

- An onboarding asks for a date of birth on a phone, where a calendar would need many taps back through the years.

Composition notes:

- Use three columns in the order of the locale, here month, day and year; loop the month and the day, and keep the year bounded.
- Disable the days the month does not have, and clamp the day in the parent when the month or the year changes.
- Show the date in words under the picker.

Trade-offs:

- A wheel is quick for a far date but slow for a date typed from the keyboard; offer a [DateField](../date-field/) on desktop.

<!-- example: wheel-picker/birth-date.tsx -->
```tsx
import { useState } from 'react';
import { Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const monthNames = Array.from({ length: 12 }, (_, month) => new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' }).format(Date.UTC(2000, month, 1)));
const days = Array.from({ length: 31 }, (_, index) => index + 1);
const years = Array.from({ length: 97 }, (_, index) => 1930 + index);

const daysIn = (month: number, year: number) => new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

export default function BirthDate() {
  const [month, setMonth] = useState(2);
  const [day, setDay] = useState(14);
  const [year, setYear] = useState(1995);

  const changeMonth = (next: number) => {
    setMonth(next);
    setDay((current) => Math.min(current, daysIn(next, year)));
  };

  const changeYear = (next: number) => {
    setYear(next);
    setDay((current) => Math.min(current, daysIn(month, next)));
  };

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text id='birth-date-label' size={3} fontWeight={600}>Date of birth</Text>
      <WheelPicker aria-labelledby='birth-date-label'>
        <WheelPickerColumn aria-label='Month' loop value={month} onChangeValue={changeMonth} style={{ minInlineSize: '7.5em' }}>
          {monthNames.map((name, index) => <WheelPickerOption key={name} value={index}><WheelPickerFace>{name}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Day' loop value={day} onChangeValue={setDay}>
          {days.map((value) => <WheelPickerOption key={value} value={value} disabled={value > daysIn(month, year)}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Year' value={year} onChangeValue={changeYear}>
          {years.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
      </WheelPicker>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {`${monthNames[month]} ${day}, ${year}`}
      </Text>
    </div>
  );
}
```
<!-- /example -->
