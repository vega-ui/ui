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
