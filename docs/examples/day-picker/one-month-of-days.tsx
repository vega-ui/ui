import { DayPicker, DayPickerCell, DayPickerLayout } from '@vega-ui/react';

export default function OneMonthOfDays() {
  return (
    <DayPicker aria-label='Days' locale='en-GB' defaultValue='2026-03-15'>
      <DayPickerLayout>
        <DayPickerCell />
      </DayPickerLayout>
    </DayPicker>
  );
}
