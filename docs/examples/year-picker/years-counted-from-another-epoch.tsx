import { createCalendarSystem } from '@vega-ui/i18n';
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

const buddhistCalendar = createCalendarSystem('buddhist');

export default function YearsCountedFromAnotherEpoch() {
  return (
    <YearPicker aria-label='Year' calendar={buddhistCalendar} locale='th-TH' year='2026-01-01' to='2026-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
