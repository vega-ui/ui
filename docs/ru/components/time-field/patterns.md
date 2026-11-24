# TimeField: паттерны

## Время напоминания

Когда использовать:

- пользователи планируют время напоминания или уведомления

Заметки по композиции:

- в метке явно указывайте, чем управляет это время
- используйте поясняющий текст, если важен часовой пояс

Компромиссы:

- компактно и понятно
- требует явно обозначить ожидаемый формат

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

## Правило с точностью до секунд

Когда использовать:

- логике расписания или автоматизации нужны секунды

Заметки по композиции:

- переключите `format` на `HH:mm:ss`
- задавайте границы в том же виде

Компромиссы:

- точно
- когнитивно сложнее, чем ввод с точностью до минут

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

## Ограниченное окно времени

Когда использовать:

- допустима только часть суток

Заметки по композиции:

- задайте `min` и `max`
- объясните допустимое окно в тексте рядом, если оно неочевидно

Компромиссы:

- помечает время вне окна невалидным, как только оно введено полностью
- пользователям нужна понятная обратная связь, когда границы отклоняют значение

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
