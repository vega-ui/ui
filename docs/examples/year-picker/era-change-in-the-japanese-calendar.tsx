import { createCalendarSystem } from '@vega-ui/i18n';
import { YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';

const japaneseCalendar = createCalendarSystem('japanese');

export default function EraChangeInTheJapaneseCalendar() {
  return (
    <YearPicker aria-label='Year' calendar={japaneseCalendar} locale='ja-JP' year='2018-01-01' style={{ width: '100%' }}>
      <YearPickerLayout>
        <YearPickerCell />
      </YearPickerLayout>
    </YearPicker>
  );
}
