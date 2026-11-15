import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

export default function SizeAndVariant() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%' }}>
      <YearPicker aria-label='Secondary, extra small' locale='en-US' defaultValue='2026-01-01' style={{ width: '100%' }}>
        <YearPickerLayout rows={3} cols={4} start='2020-01-01'>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <YearPicker aria-label='Primary, medium' locale='en-US' size='md' variant='primary' defaultValue='2026-01-01' style={{ width: '100%' }}>
        <YearPickerLayout rows={4} cols={3} start='2020-01-01'>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
    </div>
  );
}
