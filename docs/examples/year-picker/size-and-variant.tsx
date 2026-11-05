import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

export default function SizeAndVariant() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%' }}>
      <YearPicker aria-label='Secondary, extra small' locale='en-US' year='2020-01-01' defaultSelected='2026-01-01' style={{ width: '100%' }}>
        <YearPickerLayout rows={3} cols={4}>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <YearPicker aria-label='Primary, medium' locale='en-US' year='2020-01-01' size='md' variant='primary' defaultSelected='2026-01-01' style={{ width: '100%' }}>
        <YearPickerLayout rows={4} cols={3}>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
    </div>
  );
}
