import { useState } from 'react';
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
} from '@vega-ui/react';

const dailyVisitors = [
  1180, 1240, 990, 1430, 1510, 870, 760, 1320, 1290, 1405, 1388, 1460, 910, 820, 1500,
  1530, 1475, 1610, 1580, 960, 880, 1620, 1700, 1655, 1590, 1720, 1010, 940, 1750, 1810,
];
const ranges = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
];

export default function ParentOwnedSelectedSegment() {
  const [range, setRange] = useState('7');

  const days = dailyVisitors.slice(-Number(range));
  const total = days.reduce((sum, visitors) => sum + visitors, 0);
  const average = Math.round(total / days.length);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'start', width: '100%' }}>
      <SegmentedControl
        name='traffic-range'
        role='radiogroup'
        aria-label='Date range'
        value={range}
        onChange={(event) => setRange(event.currentTarget.value)}
      >
        {ranges.map((item) => (
          <SegmentedControlItem key={item.value} value={item.value}>
            <SegmentedControlItemInput />
            {item.label}
          </SegmentedControlItem>
        ))}
        <SegmentedControlIndicator />
      </SegmentedControl>
      <Text size={3} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {total.toLocaleString('en-US')} visitors in the last {range} days · {average.toLocaleString('en-US')} per day
      </Text>
    </div>
  );
}
