# WheelPicker Examples

## Basic

### Basic: a focus timer with units between the wheels

Three columns for hours, minutes and seconds, the last two looped. The units stand between the columns and are hidden from assistive technology, since the column names say them. The parent keeps the three values to sum them up and to enable "Start".

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

## Controlled/Stateful

### Controlled/Stateful: a sentence with a unit that follows the amount

"Every 2 weeks": the amount column is bounded from 1 to 30, and the unit column shows "day" or "days" by the amount while its `value` stays `'day'`. Typeahead and `aria-valuetext` read the text the option shows.

<!-- example: wheel-picker/repeat-reminder.tsx -->
```tsx
import { useState } from 'react';
import { Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

type Unit = 'day' | 'week' | 'month';

const amounts = Array.from({ length: 30 }, (_, index) => index + 1);
const units: Unit[] = ['day', 'week', 'month'];

export default function RepeatReminder() {
  const [amount, setAmount] = useState(2);
  const [unit, setUnit] = useState<Unit>('week');
  const plural = amount === 1 ? '' : 's';

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text id='repeat-label' size={3} fontWeight={600}>Water the plants</Text>
      <WheelPicker aria-labelledby='repeat-label'>
        <span style={{ alignSelf: 'center', paddingInlineEnd: 'var(--spacing-4)' }}>Every</span>
        <WheelPickerColumn aria-label='Amount' value={amount} onChangeValue={setAmount}>
          {amounts.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Unit' value={unit} onChangeValue={setUnit} style={{ minInlineSize: '6em' }}>
          {units.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value + plural}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
      </WheelPicker>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {amount === 1 ? `Reminds you every ${unit}` : `Reminds you every ${amount} ${unit}s`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: submit the wheels as hidden inputs

The columns render no inputs, so the form gets the values from two `<input type="hidden">` that mirror the state. The minutes column offers steps of five minutes and loops.

<!-- example: wheel-picker/alarm-form.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import { Button, Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const hours = Array.from({ length: 24 }, (_, hour) => hour);
const minutes = Array.from({ length: 12 }, (_, index) => index * 5);
const pad = (value: number) => String(value).padStart(2, '0');

export default function AlarmForm() {
  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(45);
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaved(`Alarm saved for ${pad(Number(data.get('hour')))}:${pad(Number(data.get('minute')))}`);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <WheelPicker aria-label='Wake up at'>
        <WheelPickerColumn aria-label='Hours' loop value={hour} onChangeValue={setHour}>
          {hours.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Minutes' loop value={minute} onChangeValue={setMinute}>
          {minutes.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{pad(value)}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
      </WheelPicker>
      <input type='hidden' name='hour' value={hour} />
      <input type='hidden' name='minute' value={minute} />
      <Button type='submit' size='xs'>Save alarm</Button>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', minHeight: '1lh' }}>{saved}</Text>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: a delivery slot in a popover

The button shows the chosen day and time and opens a popover with three wheels. The day column lists "Today", "Tomorrow" and the next dates and is bounded, the hours run from 9 to 21, and the quarters of an hour loop. The value applies while the wheels turn, so the popover needs no "Done" button.

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

## Disabled

### Disabled: booked appointment times

A single bounded column of half-hour slots. Booked slots are `disabled`: they stay visible and dimmed, the keys step over them, and a swipe that stops on one moves on to the nearest free slot.

<!-- example: wheel-picker/appointment-time.tsx -->
```tsx
import { useState } from 'react';
import { Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const slots = Array.from({ length: 17 }, (_, index) => {
  const minutes = 9 * 60 + index * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
});
const booked = new Set(['10:00', '10:30', '11:00', '14:00', '15:30']);

export default function AppointmentTime() {
  const [slot, setSlot] = useState('11:30');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text id='appointment-label' size={3} fontWeight={600}>Dr. Ortiz · Thursday</Text>
      <WheelPicker aria-labelledby='appointment-label'>
        <WheelPickerColumn aria-label='Time' value={slot} onChangeValue={setSlot} style={{ minInlineSize: '7em' }}>
          {slots.map((value) => (
            <WheelPickerOption key={value} value={value} disabled={booked.has(value)}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>
          ))}
        </WheelPickerColumn>
      </WheelPicker>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {`Booked times are skipped · ${slot} is free`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: a date of birth where the month decides the days

The day column disables the days the month does not have, like the 30th and 31st of February. When the month or the year changes, the parent clamps the day, since a column keeps a disabled value the parent selected.

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
