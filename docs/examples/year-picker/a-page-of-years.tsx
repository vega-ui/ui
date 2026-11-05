import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

export default function APageOfYears() {
  return (
    <YearPicker aria-label='Model year' locale='en-US' year='2026-01-01' defaultSelected='2026-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
