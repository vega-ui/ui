import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  HelperText,
} from '@vega-ui/react';
import { useId, useState } from 'react';

const DAY = 86_400_000;
const MAX_NIGHTS = 14;

function countNights(start?: string, end?: string) {
  if (!start || !end) return 0;

  return (Date.parse(end) - Date.parse(start)) / DAY;
}

export default function RangeTooLong() {
  const [range, setRange] = useState<string[]>(['2026-11-03', '2026-11-24']);
  const messageId = useId();

  const [start, end] = range;
  const nights = countNights(start, end);
  const invalid = nights > MAX_NIGHTS;

  let message = `Up to ${MAX_NIGHTS} nights.`;
  if (nights > 0) message = `${nights} nights selected. Up to ${MAX_NIGHTS} nights.`;
  if (invalid) message = `${nights} nights is too long. Shorten the rental to ${MAX_NIGHTS} nights or less.`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Rental period, November 2026'
        aria-describedby={messageId}
        locale='en-US'
        selection='range'
        month='2026-11-01'
        selected={range}
        onSelectCell={setRange}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <HelperText id={messageId} error={invalid} aria-live='polite'>{message}</HelperText>
    </div>
  );
}
