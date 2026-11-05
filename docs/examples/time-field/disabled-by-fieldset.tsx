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
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-6)' }}>Time</FieldsetLegend>
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
