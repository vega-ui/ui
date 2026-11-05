import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <SegmentedControl name='billing-period' defaultValue='monthly' role='radiogroup' aria-label='Billing period'>
      <SegmentedControlItem value='monthly'>
        <SegmentedControlItemInput />
        Monthly
      </SegmentedControlItem>
      <SegmentedControlItem value='yearly'>
        <SegmentedControlItemInput />
        Yearly
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
