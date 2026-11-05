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
import { Label, Text, TimeField, TimeFieldInput } from '@vega-ui/react';

export default function SecondsPrecisionRule() {
  const [runAt, setRunAt] = useState('00:00:30');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='cron-time'>Run the export at</Label>
        <TimeField format='HH:mm:ss' min='00:00:30' max='23:59:30' value={runAt} onChangeValue={setRunAt}>
          <TimeFieldInput id='cron-time' placeholder='hh:mm:ss' />
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

- рано предотвращает невалидный ввод
- пользователям нужна понятная обратная связь, когда границы отклоняют значение

<!-- example: time-field/bound-time-window.tsx -->
```tsx
import { useState } from 'react';
import { HelperText, Label, Text, TimeField, TimeFieldInput } from '@vega-ui/react';

export default function BoundTimeWindow() {
  const [callback, setCallback] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='callback-time'>Call me back at</Label>
        <TimeField min='09:00' max='18:00' value={callback} onChangeValue={setCallback}>
          <TimeFieldInput id='callback-time' placeholder='hh:mm' aria-describedby='callback-time-hint' />
        </TimeField>
        <HelperText id='callback-time-hint'>Support works 09:00–18:00. Try 07:15 or 19:40.</HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {callback ? <code>{callback}</code> : 'no complete time'}
      </Text>
    </div>
  );
}
```
<!-- /example -->
