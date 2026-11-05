import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export default function SizeAndVariant() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%' }}>
      <MonthPicker aria-label='Secondary, extra small' locale='en-US' year='2026-01-01' defaultSelected='2026-05-01' style={{ width: '100%' }}>
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <MonthPicker aria-label='Primary, medium' locale='en-US' year='2026-01-01' size='md' variant='primary' defaultSelected='2026-05-01' style={{ width: '100%' }}>
        <MonthPickerLayout cols={3}>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
    </div>
  );
}
