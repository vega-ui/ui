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
    <DayPicker aria-label='Days' locale='en-US' defaultFocusedDate='2026-02-01'>
      <DayPickerLayout includeOverflowDays>
        <OverflowDay />
      </DayPickerLayout>
    </DayPicker>
  );
}
