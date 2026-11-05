# TimeField Patterns

## Reminder Time

When to use:

- users schedule a reminder or notification time

Composition notes:

- keep the label explicit about what the time controls
- use helper text if the timezone context matters

Trade-offs:

- compact and clear
- requires explicit format expectations

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

## Seconds-Precision Rule

When to use:

- scheduling logic or automation requires seconds

Composition notes:

- switch `format` to `HH:mm:ss`
- keep bounds in the same shape

Trade-offs:

- precise
- more cognitively demanding than minute-level entry

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

## Bound Time Window

When to use:

- only a subset of the day is valid

Composition notes:

- set `min` and `max`
- explain the allowed window in nearby copy if it is not obvious

Trade-offs:

- prevents invalid entry early
- users need clear feedback when bounds reject values

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
