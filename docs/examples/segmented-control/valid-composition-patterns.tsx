import {
  Icon,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';
import { LayoutGridIcon, ListIcon } from '@vega-ui/icons';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='orders-filter-label'>Orders</Label>
        <SegmentedControl name='orders-filter' defaultValue='open' role='radiogroup' aria-labelledby='orders-filter-label'>
          <SegmentedControlItem value='open'>
            <SegmentedControlItemInput />
            Open
          </SegmentedControlItem>
          <SegmentedControlItem value='shipped'>
            <SegmentedControlItemInput />
            Shipped
          </SegmentedControlItem>
          <SegmentedControlItem value='returned'>
            <SegmentedControlItemInput />
            Returned
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
      </div>
      <SegmentedControl name='orders-layout' defaultValue='list' size='sm' role='radiogroup' aria-label='Layout'>
        <SegmentedControlItem value='list'>
          <SegmentedControlItemInput aria-label='List' />
          <Icon size='sm'><ListIcon /></Icon>
        </SegmentedControlItem>
        <SegmentedControlItem value='grid'>
          <SegmentedControlItemInput aria-label='Grid' />
          <Icon size='sm'><LayoutGridIcon /></Icon>
        </SegmentedControlItem>
        <SegmentedControlIndicator />
      </SegmentedControl>
    </div>
  );
}
