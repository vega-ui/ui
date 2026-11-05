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
