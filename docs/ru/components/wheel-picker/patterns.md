# WheelPicker: паттерны

## Длительность с единицами

Когда использовать:

- Таймер или напоминание спрашивает часы, минуты и секунды или количество и единицу.

Заметки о композиции:

- Поставьте единицы между колонками простым текстом с `align-self: center` и `aria-hidden`, а каждую колонку назовите единицей.
- Зациклите минуты и секунды; часы оставьте ограниченными, когда диапазон начинается с 0.
- Сложите значения рядом с пикером в строке статуса, чтобы пользователь видел всю длительность словами.

Компромиссы:

- Постоянные единицы хорошо читаются и экономят место, но не меняются вместе с числом; для «1 день» и «2 дня» пусть единицу показывает колонка.

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

## Значение в поповере

Когда использовать:

- Форма или панель инструментов показывает день и время кнопкой, а колёса открываются только для изменения.

Заметки о композиции:

- Положите пикер в [Popover](../popover/) с `role='dialog'`, который открывает кнопка с текстом значения.
- Применяйте значение, пока колёса крутятся, чтобы поповер закрывался по Escape или клику снаружи без кнопки «Готово».
- Назовите поповер и пикер; кнопка описывает себя подписью рядом.

Компромиссы:

- Значение видно, но занимает мало места; на телефоне шит снизу подходит лучше поповера, когда пикер — главная задача экрана.

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

## Дата на сенсорном экране

Когда использовать:

- Онбординг спрашивает дату рождения на телефоне, где календарю понадобилось бы много нажатий назад по годам.

Заметки о композиции:

- Используйте три колонки в порядке локали, здесь месяц, день и год; зациклите месяц и день, а год оставьте ограниченным.
- Отключите дни, которых нет в месяце, и ограничьте день в родителе, когда меняются месяц или год.
- Покажите дату словами под пикером.

Компромиссы:

- Колесо быстро доходит до далёкой даты, но медленнее ввода с клавиатуры; на десктопе предложите [DateField](../date-field/).

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
