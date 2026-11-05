import {
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  useDayPickerCellContext,
} from '@vega-ui/react';

function OverflowDay() {
  const { inMonth } = useDayPickerCellContext();

  if (inMonth) return <DayPickerCell />;

  return <DayPickerCell style={{ color: 'var(--label-quaternary)' }} />;
}

export default function OverflowDays() {
  return (
    <DayPicker aria-label='February 2026' locale='en-US' month='2026-02-01'>
      <DayPickerLayout includeOverflowDays>
        <OverflowDay />
      </DayPickerLayout>
    </DayPicker>
  );
}
