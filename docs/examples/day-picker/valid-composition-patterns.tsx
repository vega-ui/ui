import {
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
} from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <DayPicker aria-label='Days' locale='en-US' defaultFocusedDate='2026-11-01'>
      <DayPickerScroller>
        <DayPickerScrollerContent>
          <DayPickerScrollerLayout includeOverflowDays>
            <DayPickerCell />
          </DayPickerScrollerLayout>
        </DayPickerScrollerContent>
      </DayPickerScroller>
    </DayPicker>
  );
}
