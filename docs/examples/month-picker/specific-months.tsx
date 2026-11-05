import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId } from 'react';

const closedMonths = ['2026-01-01', '2026-02-01', '2026-12-01'];

export default function SpecificMonths() {
  const hintId = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Event month, 2026'
        aria-describedby={hintId}
        locale='en-US'
        year='2026-01-01'
        disabled={closedMonths}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={hintId}>The terrace is closed in December, January and February.</HelperText>
    </div>
  );
}
