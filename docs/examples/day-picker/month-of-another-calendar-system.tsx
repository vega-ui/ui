import { createCalendarSystem } from '@vega-ui/i18n';
import { DayPicker, DayPickerCell, DayPickerLayout, Text } from '@vega-ui/react';
import { useState } from 'react';

const persianCalendar = createCalendarSystem('persian');
const persianMonth = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function MonthOfAnotherCalendarSystem() {
  const [day, setDay] = useState<string | null>('2026-03-21');

  return (
    <div dir='rtl' lang='fa-IR' style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <Text fontWeight={600}>{persianMonth.format(new Date('2026-04-01'))}</Text>
      <DayPicker
        aria-label={persianMonth.format(new Date('2026-04-01'))}
        calendar={persianCalendar}
        locale='fa-IR'
        month='2026-04-01'
        selected={day}
        onSelectCell={setDay}
      >
        <DayPickerLayout>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
      <Text dir='ltr' lang='en' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Stored value: {day ?? 'none'}</Text>
    </div>
  );
}
