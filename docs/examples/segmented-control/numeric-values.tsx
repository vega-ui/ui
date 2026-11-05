import { useState } from 'react';
import {
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

const columnOptions = [1, 2, 3, 4];
const photos = ['Harbor', 'Dunes', 'Glacier', 'Canyon', 'Forest', 'Delta', 'Reef', 'Ridge'];

export default function NumericValues() {
  const [columns, setColumns] = useState(3);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Label id='columns-label'>Columns</Label>
        <SegmentedControl
          name='columns'
          size='sm'
          role='radiogroup'
          aria-labelledby='columns-label'
          value={columns}
          onChange={(event) => setColumns(Number(event.currentTarget.value))}
        >
          {columnOptions.map((option) => (
            <SegmentedControlItem key={option} value={option}>
              <SegmentedControlItemInput />
              {option}
            </SegmentedControlItem>
          ))}
          <SegmentedControlIndicator />
        </SegmentedControl>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 'var(--spacing-4)' }}>
        {photos.map((photo) => (
          <div
            key={photo}
            style={{
              display: 'grid',
              placeItems: 'center',
              height: 64,
              borderRadius: 'var(--radius-2)',
              background: 'var(--fills-tertiary)',
              color: 'var(--label-secondary)',
            }}
          >
            {photo}
          </div>
        ))}
      </div>
    </div>
  );
}
