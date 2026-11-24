# WheelPicker Anatomy

## Overview

`WheelPicker` is a row of columns with one selection band behind them. Each `WheelPickerColumn` owns its value and reads its options from its `WheelPickerOption` children; the picker itself holds no value. A column is a vertical scroller of its options, which are hidden from assistive technology, and tells its value through `aria-valuetext`.

## Required Parts

### `WheelPicker`

Renders `<div role="group">` with the selection band as `::before`. `rows` sets how many rows each column shows, the selected one in the middle. Name it with `aria-label` or `aria-labelledby`.

### `WheelPickerColumn`

Renders `<div role="spinbutton" tabindex="0">` with `aria-valuetext`, `aria-valuenow`, `aria-valuemin` and `aria-valuemax`, and `data-disabled` and `data-readonly` for its states. It is a vertical [SnapScroller](../snap-scroller/) itself, so its `className`, `style` and `ref` reach the element that scrolls. With `loop` it repeats the options for 15 rows past each end and, once the wheel stops, moves the scroll to the same option nearest the middle, which looks the same. Name it with `aria-label` or `aria-labelledby`.

### `WheelPickerOption`

Renders one row, `<div aria-hidden="true">` with `data-disabled`. The row stays in place as a stop of the scroll and shows nothing itself: put a `WheelPickerFace` in it. Its `value` is what the column reports, and the text of its face, or `label`, is what typeahead matches and the column announces; an option with neither uses its `value`.

### `WheelPickerFace`

Renders `<span>` with what the option shows, the face that bends along the drum. Without children it shows the text of its option, its `label` or `value`. Its `className`, `style` and `ref` reach the visible text. It is a separate part because browsers stop a scroll by where an element is drawn: the row keeps the stops in place while the face turns.

## Optional Parts

### Text between columns

Any element inside `WheelPicker` stands between the columns, centered on the band with `align-self: center`: a unit like "min", or a word like "Every". Hide it with `aria-hidden` when the column names already say it.

### Overlay

A [Popover](../popover/) or a [Sheet](../sheet/) around the picker, opened by a button that shows the value.

## Composition Order

1. `WheelPicker`
2. `WheelPickerColumn`
3. `WheelPickerOption`
4. `WheelPickerFace`

## Valid Composition Patterns

A duration with fixed units between the columns: the units are hidden from assistive technology, and the column names say "Hours", "Minutes" and "Seconds".

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

A sentence with a column in the middle: "Every" stays visible, and the unit column changes its text with the amount but keeps its `value`.

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

## Invalid Composition Patterns

### Options outside a column

`WheelPickerOption` reads the column around it. Outside a `WheelPickerColumn` it has no wheel to join.

### A column that wraps other components around its options

A column reads its children as options, also the ones inside a fragment. A `<div>` or a component of your own around them makes one option with no `value`.

### Several values in one column

One column is one part of the value. A list of "07:00", "07:30" and so on is a valid column of times, but a column of hours and minutes together cannot be turned part by part.
