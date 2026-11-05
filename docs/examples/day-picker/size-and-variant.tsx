import { DayPicker, DayPickerCell, DayPickerLayout } from '@vega-ui/react';

export default function SizeAndVariant() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start' }}>
      <DayPicker aria-label='Secondary, extra small' locale='en-US' month='2026-11-01' defaultSelected='2026-11-18'>
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <DayPicker aria-label='Primary, medium' locale='en-US' month='2026-11-01' size='md' variant='primary' defaultSelected='2026-11-18'>
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </div>
  );
}
