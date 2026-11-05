import { DayPicker, DayPickerCell, DayPickerLayout, Text } from '@vega-ui/react';
import { useState } from 'react';

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' });

export default function StaticMonthGrid() {
  const [day, setDay] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <DayPicker
        aria-label='Payment day, November 2026'
        locale='en-US'
        month='2026-11-01'
        from='2026-11-10'
        to='2026-11-25'
        selected={day}
        onSelectCell={setDay}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {day ? `Payment on ${dateFormat.format(new Date(day))}` : 'Pick a day between November 10 and 25'}
      </Text>
    </div>
  );
}
