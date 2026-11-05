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
