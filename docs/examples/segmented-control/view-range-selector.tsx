import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

export default function ViewRangeSelector() {
  return (
    <SegmentedControl name='calendar-view' defaultValue='week' role='radiogroup' aria-label='Calendar view'>
      <SegmentedControlItem value='day'>
        <SegmentedControlItemInput />
        Day
      </SegmentedControlItem>
      <SegmentedControlItem value='week'>
        <SegmentedControlItemInput />
        Week
      </SegmentedControlItem>
      <SegmentedControlItem value='month'>
        <SegmentedControlItemInput />
        Month
      </SegmentedControlItem>
      <SegmentedControlItem value='year'>
        <SegmentedControlItemInput />
        Year
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
