import { DayPicker, DayPickerCell, DayPickerLayout } from '@vega-ui/react';

export default function OneMonthOfDays() {
  return (
    <DayPicker aria-label='March 2026' locale='en-GB' month='2026-03-01' defaultSelected='2026-03-15'>
      <DayPickerLayout>
        <DayPickerCell />
      </DayPickerLayout>
    </DayPicker>
  );
}
