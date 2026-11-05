import { createCalendarSystem } from '@vega-ui/i18n';
import { MonthPicker, MonthPickerCell, MonthPickerLayout, Text } from '@vega-ui/react';
import { useState } from 'react';

const hebrewCalendar = createCalendarSystem('hebrew');

export default function ThirteenMonthYear() {
  const [month, setMonth] = useState<string | null>('2024-02-10');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <MonthPicker
        aria-label='Month of 5784'
        calendar={hebrewCalendar}
        locale='en-US'
        year='2024-03-15'
        selected={month}
        onSelectCell={setMonth}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4}>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Cell key: {month ?? 'none'}</Text>
    </div>
  );
}
