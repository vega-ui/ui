import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const months = ['2026-11-01', '2026-12-01'];
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const rangeFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export default function TwoMonthsSideBySide() {
  const [range, setRange] = useState<string[]>([]);
  const [start, end] = range;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Travel dates'
        locale='en-US'
        selection='range'
        month={months[0]}
        selected={range}
        onSelectCell={setRange}
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-16)', width: '100%' }}
      >
        {months.map((month, index) => (
          <div key={month} role='presentation' style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
            <Text aria-hidden fontWeight={600} style={{ textAlign: 'center' }}>{monthFormat.format(new Date(month))}</Text>
            <DayPickerLayout aria-label={monthFormat.format(new Date(month))} month={month} offset={index}>
              <DayPickerCell />
            </DayPickerLayout>
          </div>
        ))}
      </DayPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {start && end ? rangeFormat.formatRange(new Date(start), new Date(end)) : 'Pick departure and return'}
      </Text>
    </div>
  );
}
