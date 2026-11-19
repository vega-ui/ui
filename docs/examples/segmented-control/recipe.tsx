import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  type SegmentedControlItemProps,
  type SegmentedControlProps,
  type SegmentedControlValue,
} from '@vega-ui/react';

export function MySegmentedControl<Value extends SegmentedControlValue>({ children, ...props }: SegmentedControlProps<Value>) {
  return (
    <SegmentedControl {...props}>
      {children}
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}

export function MySegmentedControlItem({ children, ...props }: SegmentedControlItemProps) {
  return (
    <SegmentedControlItem {...props}>
      <SegmentedControlItemInput />
      {children}
    </SegmentedControlItem>
  );
}

export default function Recipe() {
  return (
    <MySegmentedControl name='report-range' defaultValue='month' aria-label='Report range'>
      <MySegmentedControlItem value='week'>Week</MySegmentedControlItem>
      <MySegmentedControlItem value='month'>Month</MySegmentedControlItem>
      <MySegmentedControlItem value='quarter'>Quarter</MySegmentedControlItem>
    </MySegmentedControl>
  );
}
