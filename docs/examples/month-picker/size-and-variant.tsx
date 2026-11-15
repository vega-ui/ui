import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export default function SizeAndVariant() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%' }}>
      <MonthPicker aria-label='Secondary, extra small' locale='en-US' defaultValue='2026-05-01' style={{ width: '100%' }}>
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <MonthPicker aria-label='Primary, medium' locale='en-US' size='md' variant='primary' defaultValue='2026-05-01' style={{ width: '100%' }}>
        <MonthPickerLayout cols={3}>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
    </div>
  );
}
