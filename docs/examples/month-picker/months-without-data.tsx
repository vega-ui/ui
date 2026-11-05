import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

export default function MonthsWithoutData() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Statement month, 2026'
        aria-describedby={hintId}
        locale='en-US'
        year='2026-01-01'
        from='2025-06-01'
        to='2026-10-01'
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={hintId}>Statements are available from June 2025 to October 2026.</HelperText>
    </div>
  );
}
