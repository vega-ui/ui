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
