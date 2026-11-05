import {
  YearPicker,
  YearPickerCell,
  YearPickerScroller,
  YearPickerScrollerContent,
  YearPickerScrollerLayout,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValidCompositionPatterns() {
  const [year, setYear] = useState('2026-01-01');

  return (
    <YearPicker aria-label='Year' locale='en-US' year={year}>
      <YearPickerScroller onChangePeriod={setYear}>
        <YearPickerScrollerContent>
          <YearPickerScrollerLayout>
            <YearPickerCell />
          </YearPickerScrollerLayout>
        </YearPickerScrollerContent>
      </YearPickerScroller>
    </YearPicker>
  );
}
