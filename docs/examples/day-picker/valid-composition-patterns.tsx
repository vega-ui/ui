import {
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValidCompositionPatterns() {
  const [month, setMonth] = useState('2026-11-01');

  return (
    <DayPicker aria-label='Days' locale='en-US' month={month}>
      <DayPickerScroller onChangePeriod={setMonth}>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout includeOverflowDays>
            <DayPickerCell />
          </DayPickerScrollerLayout>
        </DayPickerScrollerContent>
      </DayPickerScroller>
    </DayPicker>
  );
}
