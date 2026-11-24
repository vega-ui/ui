# TimeField: примеры

## Базовый

### Базовый: время на колёсах

Кнопка с часами открывает часы и минуты в виде колёс. Минуты идут по четверти часа из `step`, время вне 09:00–21:00 отключено, а каждый поворот сразу записывает время в поле ввода, поэтому поповер остаётся открытым до Escape или клика снаружи.

<!-- example: time-field/wheels-in-a-popover.tsx -->
```tsx
import {
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';

export default function WheelsInAPopover() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='pickup-time'>Pickup time</Label>
      <TimeField defaultValue='12:30' min='09:00' max='21:00' step={15}>
        <TimeFieldInput id='pickup-time' name='pickupTime' placeholder='hh:mm' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <TimeFieldTrigger square aria-label='Choose pickup time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose pickup time' style={{ padding: 'var(--spacing-6)' }}>
            <WheelPicker aria-label='Pickup time'>
              <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
              <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
              <TimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
            </WheelPicker>
          </PopoverContent>
        </Popover>
      </TimeField>
    </div>
  );
}
```
<!-- /example -->

### Базовый: время ежедневного напоминания

Поле с подписью для времени в 24-часовом формате. `defaultValue` на корне — строка `HH:mm`, а вспомогательный текст подсказывает, по каким часам и в каком часовом поясе указано время.

<!-- example: time-field/reminder-time.tsx -->
```tsx
import { HelperText, Label, TimeField, TimeFieldInput } from '@vega-ui/react';

export default function ReminderTime() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='daily-reminder'>Daily reminder</Label>
      <TimeField defaultValue='08:30'>
        <TimeFieldInput id='daily-reminder' placeholder='hh:mm' aria-describedby='daily-reminder-hint' />
      </TimeField>
      <HelperText id='daily-reminder-hint'>24-hour time in your local time zone.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: начало и конец смены

`value` и `onChangeValue` на корне держат оба времени в состоянии родителя. Начало — это `min` поля окончания, поэтому окончание раньше начала делает input окончания невалидным, а `aria-invalid` помечает поле; длительность смены считается по двум значениям. Пока время неполное, его значение равно `''`.

<!-- example: time-field/controlled-time-value.tsx -->
```tsx
import { useState } from 'react';
import { Fieldset, FieldsetLegend, Label, Text, TimeField, TimeFieldInput } from '@vega-ui/react';

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);

  return hours * 60 + minutes;
};

const describeShift = (start: string, end: string) => {
  if (!start || !end) return 'Enter both times';

  const length = toMinutes(end) - toMinutes(start);
  if (length < 0) return 'Ends before it starts';

  return `${Math.floor(length / 60)} h ${length % 60} min`;
};

export default function ShiftHours() {
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('17:30');
  const endsBeforeStart = start !== '' && end !== '' && end < start;

  return (
    <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <FieldsetLegend>Shift</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='shift-start'>Starts</Label>
        <TimeField value={start} onChangeValue={setStart}>
          <TimeFieldInput id='shift-start' placeholder='hh:mm' />
        </TimeField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='shift-end'>Ends</Label>
        <TimeField min={start} value={end} onChangeValue={setEnd}>
          <TimeFieldInput id='shift-end' placeholder='hh:mm' aria-invalid={endsBeforeStart} />
        </TimeField>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        Length: {describeShift(start, end)}
      </Text>
    </Fieldset>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: отправка времени

Для `HH:mm` и `HH:mm:ss` введённый текст уже и есть значение, поэтому `name` на `TimeFieldInput` отправляет его как есть. `required` не пропускает пустое время, а неполное время поле само делает невалидным; кнопка сброса возвращает `defaultValue` корня.

<!-- example: time-field/submitting-a-time.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import { Button, HelperText, Label, Text, TimeField, TimeFieldInput } from '@vega-ui/react';

export default function QuietHoursForm() {
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  };

  return (
    <form onSubmit={onSubmit} onReset={() => setSubmitted('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='quiet-from'>Mute notifications from</Label>
        <TimeField defaultValue='22:00'>
          <TimeFieldInput
            id='quiet-from'
            name='quietFrom'
            required
            placeholder='hh:mm'
            aria-describedby='quiet-from-hint'
          />
        </TimeField>
        <HelperText id='quiet-from-hint'>24-hour time, for example 22:00.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Save</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Sent: <code>{submitted}</code></Text>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: единицы в ячейках колёс

Дети колонки времени — шаблон её опций, каждая — `TimeFieldOption`. Одна ячейка служит обеим колонкам и читает `unit` своей опции: часы показаны без ведущего нуля, а минуты идут по пять, у каждой ячейки маленькая единица, при этом поле ввода хранит `HH:mm`, а колонки по-прежнему объявляют двузначное значение.

<!-- example: time-field/wheel-cells-with-units.tsx -->
```tsx
import {
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  useTimeFieldOptionContext,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';

const unitStyle = { marginInlineStart: 'var(--spacing-2)', color: 'var(--label-secondary)', fontSize: 'var(--font-size-1)' } as const;

function UnitCell() {
  const { unit, value } = useTimeFieldOptionContext();

  if (unit === 'hour') return <TimeFieldOption><WheelPickerFace>{Number(value)}<span style={unitStyle}>h</span></WheelPickerFace></TimeFieldOption>;

  return <TimeFieldOption><WheelPickerFace>{value}<span style={unitStyle}>min</span></WheelPickerFace></TimeFieldOption>;
}

export default function WheelCellsWithUnits() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='quiet-hours'>Quiet hours start</Label>
      <TimeField defaultValue='22:30' step={5}>
        <TimeFieldInput id='quiet-hours' name='quietHours' placeholder='hh:mm' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <TimeFieldTrigger square aria-label='Choose start time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose start time' style={{ padding: 'var(--spacing-6)' }}>
            <WheelPicker aria-label='Quiet hours start'>
              <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus style={{ minInlineSize: '4.5em' }}>
                <UnitCell />
              </TimeFieldColumn>
              <TimeFieldColumn unit='minute' aria-label='Minutes' style={{ minInlineSize: '5.5em' }}>
                <UnitCell />
              </TimeFieldColumn>
            </WheelPicker>
          </PopoverContent>
        </Popover>
      </TimeField>
    </div>
  );
}
```
<!-- /example -->

### Раскладка/оверлей: таблица часов работы

Небольшие поля в ячейках таблицы, по строке на каждый день недели. У input нет своей видимой подписи, поэтому каждый получает `aria-label` с днём и столбцом.

<!-- example: time-field/opening-hours-table.tsx -->
```tsx
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  TimeField,
  TimeFieldInput,
} from '@vega-ui/react';

const DAYS = [
  { day: 'Monday', opens: '09:00', closes: '18:00' },
  { day: 'Tuesday', opens: '09:00', closes: '18:00' },
  { day: 'Wednesday', opens: '09:00', closes: '20:00' },
  { day: 'Thursday', opens: '09:00', closes: '18:00' },
  { day: 'Friday', opens: '10:00', closes: '16:00' },
];

export default function OpeningHoursTable() {
  return (
    <Table aria-label='Opening hours'>
      <TableHead>
        <TableRow>
          <TableHeading>Day</TableHeading>
          <TableHeading>Opens</TableHeading>
          <TableHeading>Closes</TableHeading>
        </TableRow>
      </TableHead>
      <TableBody>
        {DAYS.map(({ day, opens, closes }) => (
          <TableRow key={day}>
            <TableData>{day}</TableData>
            <TableData>
              <TimeField size='sm' defaultValue={opens} style={{ width: 96 }}>
                <TimeFieldInput name={`${day.toLowerCase()}Opens`} aria-label={`${day} opens`} />
              </TimeField>
            </TableData>
            <TableData>
              <TimeField size='sm' defaultValue={closes} style={{ width: 96 }}>
                <TimeFieldInput name={`${day.toLowerCase()}Closes`} aria-label={`${day} closes`} />
              </TimeField>
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: время вне ночного окна

`min` и `max` не описывают окно, которое переходит через полночь, поэтому у поля нет границ, а обработчик отправки сам проверяет правило 22:00–06:00. `aria-invalid` помечает поле, а следующее изменение значения сбрасывает ошибку.

<!-- example: time-field/time-outside-allowed-range.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import { Button, HelperText, Label, TimeField, TimeFieldInput } from '@vega-ui/react';

const isOvernight = (time: string) => time >= '22:00' || time <= '06:00';

export default function NightDeliveryForm() {
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onChangeValue = (value: string) => {
    setTime(value);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (time && !isOvernight(time)) {
      setError('Night deliveries arrive between 22:00 and 06:00.');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='night-delivery'>Night delivery at</Label>
        <TimeField value={time} onChangeValue={onChangeValue}>
          <TimeFieldInput
            id='night-delivery'
            required
            placeholder='hh:mm'
            aria-invalid={invalid}
            aria-describedby='night-delivery-hint'
          />
        </TimeField>
        <HelperText id='night-delivery-hint' invalid={invalid}>{invalid ? error : 'Between 22:00 and 06:00.'}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: слот расписания только для чтения

`readOnly` на `TimeFieldInput` оставляет время фокусируемым и отправляемым с формой, но не даёт его редактировать.

<!-- example: time-field/read-only-schedule-slot.tsx -->
```tsx
import { HelperText, Label, TimeField, TimeFieldInput } from '@vega-ui/react';

export default function ReadOnlyScheduleSlot() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='backup-slot'>Nightly backup</Label>
      <TimeField defaultValue='03:00'>
        <TimeFieldInput id='backup-slot' name='backupSlot' readOnly aria-describedby='backup-slot-hint' />
      </TimeField>
      <HelperText id='backup-slot-hint'>Set by your administrator.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Отключённый: отключение через fieldset

У `TimeField` нет своего пропа `disabled`: отключайте input или окружающий `<fieldset disabled>`, как здесь, где переключатель отключает оба времени для события на весь день.

<!-- example: time-field/disabled-by-fieldset.tsx -->
```tsx
import { useState } from 'react';
import {
  Fieldset,
  FieldsetLegend,
  Label,
  Switch,
  SwitchIndicator,
  SwitchInput,
  TimeField,
  TimeFieldInput,
} from '@vega-ui/react';

export default function DisabledByFieldset() {
  const [allDay, setAllDay] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Switch>
          <SwitchInput id='all-day' checked={allDay} onChange={(event) => setAllDay(event.currentTarget.checked)} />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor='all-day'>All-day event</Label>
      </div>
      <Fieldset disabled={allDay} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend>Time</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='event-start'>Starts</Label>
          <TimeField defaultValue='10:00'>
            <TimeFieldInput id='event-start' name='eventStart' />
          </TimeField>
        </div>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='event-end'>Ends</Label>
          <TimeField defaultValue='11:00'>
            <TimeFieldInput id='event-end' name='eventEnd' />
          </TimeField>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: ограниченное окно времени

Как и в нативном `<input type="time">`, полное время вне `min` и `max` остаётся как введено и делает input невалидным, поэтому `07:15` не меняется. Пример сравнивает значение с окном, чтобы поставить `aria-invalid` и показать сообщение; под полем видно введённое значение.

<!-- example: time-field/bound-time-window.tsx -->
```tsx
import { useState } from 'react';
import { HelperText, Label, Text, TimeField, TimeFieldInput } from '@vega-ui/react';

const OPENS_AT = '09:00';
const CLOSES_AT = '18:00';

export default function BoundTimeWindow() {
  const [callback, setCallback] = useState('');
  const outsideHours = callback !== '' && (callback < OPENS_AT || callback > CLOSES_AT);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='callback-time'>Call me back at</Label>
        <TimeField min={OPENS_AT} max={CLOSES_AT} value={callback} onChangeValue={setCallback}>
          <TimeFieldInput id='callback-time' placeholder='hh:mm' aria-invalid={outsideHours} aria-describedby='callback-time-hint' />
        </TimeField>
        <HelperText id='callback-time-hint' invalid={outsideHours}>
          {outsideHours ? 'Outside support hours, 09:00–18:00.' : 'Support works 09:00–18:00. Try 07:15 or 19:40.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {callback ? <code>{callback}</code> : 'no complete time'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: шаг в четверть часа

`step` задаёт, на сколько `ArrowUp` и `ArrowDown` сдвигают минуты под кареткой, переходя от `45` к `00` без смены часа. Часы всегда двигаются на единицу, а введённые минуты остаются как есть.

<!-- example: time-field/quarter-hour-step.tsx -->
```tsx
import { HelperText, Label, TimeField, TimeFieldInput } from '@vega-ui/react';

export default function QuarterHourStep() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor='class-start'>Class starts</Label>
      <TimeField step={15} defaultValue='18:45'>
        <TimeFieldInput id='class-start' aria-describedby='class-start-hint' />
      </TimeField>
      <HelperText id='class-start-hint'>Put the caret in the minutes and press ↑ or ↓.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: точность до секунд

`format='HH:mm:ss'` добавляет сегмент секунд; значение тогда содержит секунды, и `min` и `max` тоже записываются с секундами. У колёс появляется третья колонка, `TimeFieldColumn` с `unit='second'`, а секунды до 00:00:30 отключены через `min`.

<!-- example: time-field/seconds-precision-rule.tsx -->
```tsx
import { useState } from 'react';
import {
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TimeField,
  TimeFieldColumn,
  TimeFieldInput,
  TimeFieldOption,
  TimeFieldTrigger,
  WheelPicker,
  WheelPickerFace,
} from '@vega-ui/react';
import { ClockIcon } from '@vega-ui/icons';

export default function SecondsPrecisionRule() {
  const [runAt, setRunAt] = useState('00:00:30');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='cron-time'>Run the export at</Label>
        <TimeField format='HH:mm:ss' min='00:00:30' max='23:59:30' value={runAt} onChangeValue={setRunAt}>
          <TimeFieldInput id='cron-time' placeholder='hh:mm:ss' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <TimeFieldTrigger square aria-label='Choose export time'><Icon><ClockIcon /></Icon></TimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose export time' style={{ padding: 'var(--spacing-6)' }}>
              <WheelPicker aria-label='Export time'>
                <TimeFieldColumn unit='hour' aria-label='Hours' autoFocus><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
                <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                <TimeFieldColumn unit='minute' aria-label='Minutes'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
                <span aria-hidden='true' style={{ alignSelf: 'center' }}>:</span>
                <TimeFieldColumn unit='second' aria-label='Seconds'><TimeFieldOption><WheelPickerFace /></TimeFieldOption></TimeFieldColumn>
              </WheelPicker>
            </PopoverContent>
          </Popover>
        </TimeField>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {runAt ? <code>{runAt}</code> : 'no complete time'}
      </Text>
    </div>
  );
}
```
<!-- /example -->
