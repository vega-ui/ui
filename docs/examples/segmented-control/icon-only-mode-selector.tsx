import {
  Icon,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';
import { MonitorIcon, MoonIcon, SunIcon } from '@vega-ui/icons';

export default function IconOnlyModeSelector() {
  return (
    <SegmentedControl name='appearance' defaultValue='system' size='sm' role='radiogroup' aria-label='Appearance'>
      <SegmentedControlItem value='light' title='Light'>
        <SegmentedControlItemInput aria-label='Light' />
        <Icon size='sm'><SunIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlItem value='system' title='System'>
        <SegmentedControlItemInput aria-label='System' />
        <Icon size='sm'><MonitorIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlItem value='dark' title='Dark'>
        <SegmentedControlItemInput aria-label='Dark' />
        <Icon size='sm'><MoonIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
