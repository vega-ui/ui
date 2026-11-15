import {
  HelperText,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

const closedYears = ['2022-01-01', '2023-01-01'];

export default function SpecificYears() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Fiscal year to adjust'
        aria-describedby={hintId}
        locale='en-US'
        defaultFocusedDate='2018-01-01'
        max='2026-01-01'
        disabledDates={closedYears}
        style={{ width: '100%' }}
      >
        <YearPickerLayout rows={3} cols={3}>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <HelperText id={hintId}>Fiscal years 2022 and 2023 are closed after the audit.</HelperText>
    </div>
  );
}
