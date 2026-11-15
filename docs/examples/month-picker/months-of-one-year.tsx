import { MonthPicker, MonthPickerCell, MonthPickerLayout } from '@vega-ui/react';

export default function MonthsOfOneYear() {
  return (
    <MonthPicker aria-label='Start month, 2026' locale='en-US' defaultValue='2026-03-01' style={{ width: '100%' }}>
      <MonthPickerLayout>
        <MonthPickerCell />
      </MonthPickerLayout>
    </MonthPicker>
  );
}
