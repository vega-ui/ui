import {
  HelperText,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

export default function SelectedDisabledControl() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='billing-label'>Billing</Label>
        <SegmentedControl
          name='billing'
          defaultValue='yearly'
          disabled
          role='radiogroup'
          aria-labelledby='billing-label'
          aria-describedby='billing-note'
        >
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
        <HelperText id='billing-note'>Locked until your contract renews on March 1.</HelperText>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='quality-label'>Video quality</Label>
        <SegmentedControl name='quality' defaultValue='1080p' role='radiogroup' aria-labelledby='quality-label'>
          <SegmentedControlItem value='720p'>
            <SegmentedControlItemInput />
            720p
          </SegmentedControlItem>
          <SegmentedControlItem value='1080p'>
            <SegmentedControlItemInput />
            1080p
          </SegmentedControlItem>
          <SegmentedControlItem value='4k' disabled>
            <SegmentedControlItemInput disabled aria-describedby='quality-note' />
            4K
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>
        <HelperText id='quality-note'>4K is available on the Premium plan.</HelperText>
      </div>
    </div>
  );
}
