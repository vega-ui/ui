import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Separator,
} from '@vega-ui/react';

export default function WithSeparators() {
  return (
    <SegmentedControl
      name='sort-order'
      defaultValue='newest'
      role='radiogroup'
      aria-label='Sort by'
      style={{ display: 'flex', width: 'min-content' }}
    >
      <SegmentedControlItem value='newest'>
        <SegmentedControlItemInput />
        Newest
      </SegmentedControlItem>
      <Separator orientation='vertical' style={{ height: '80%' }} />
      <SegmentedControlItem value='popular'>
        <SegmentedControlItemInput />
        Most popular
      </SegmentedControlItem>
      <Separator orientation='vertical' style={{ height: '80%' }} />
      <SegmentedControlItem value='price'>
        <SegmentedControlItemInput />
        Price
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
