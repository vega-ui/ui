import { TimeField, TimeFieldInput } from '@vega-ui/react';

export default function FieldSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 200 }}>
      <TimeField size='sm' defaultValue='09:30'>
        <TimeFieldInput aria-label='Small time field' />
      </TimeField>
      <TimeField size='md' defaultValue='09:30'>
        <TimeFieldInput aria-label='Medium time field' />
      </TimeField>
      <TimeField size='lg' defaultValue='09:30'>
        <TimeFieldInput aria-label='Large time field' />
      </TimeField>
    </div>
  );
}
