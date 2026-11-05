import {
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const MAX_MONTHS = 6;

function countMonths(from?: string, to?: string) {
  if (!from || !to) return 0;

  const years = Number(to.slice(0, 4)) - Number(from.slice(0, 4));
  const months = Number(to.slice(5, 7)) - Number(from.slice(5, 7));

  return years * 12 + months + 1;
}

export default function PeriodTooLong() {
  const [period, setPeriod] = useState<string[]>(['2026-02-01', '2026-10-01']);
  const messageId = useId();

  const [from, to] = period;
  const months = countMonths(from, to);
  const invalid = months > MAX_MONTHS;

  let message = `Compare up to ${MAX_MONTHS} months.`;
  if (months > 0) message = `${months} months selected. Compare up to ${MAX_MONTHS} months.`;
  if (invalid) message = `${months} months is too long. Pick ${MAX_MONTHS} months or fewer.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Comparison period, 2026'
        aria-describedby={messageId}
        locale='en-US'
        selection='range'
        year='2026-01-01'
        selected={period}
        onSelectCell={setPeriod}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
