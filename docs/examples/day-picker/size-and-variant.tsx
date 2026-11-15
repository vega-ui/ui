import { DayPicker, DayPickerCell, DayPickerLayout } from '@vega-ui/react';

export default function SizeAndVariant() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start' }}>
      <DayPicker aria-label='Secondary, extra small' locale='en-US' defaultValue='2026-11-18'>
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <DayPicker aria-label='Primary, medium' locale='en-US' size='md' variant='primary' defaultValue='2026-11-18'>
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </div>
  );
}
