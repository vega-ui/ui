import { Text, YearPicker, YearPickerCell, YearPickerLayout } from '@vega-ui/react';
import { useState } from 'react';

export default function StaticYearGrid() {
  const [year, setYear] = useState<string | null>('2026-01-01');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <YearPicker
        aria-label='Budget year'
        locale='en-US'
        year='2025-01-01'
        from='2025-01-01'
        to='2030-01-01'
        selected={year}
        onSelectCell={setYear}
        style={{ width: '100%' }}
      >
        <YearPickerLayout rows={2} cols={3}>
          <YearPickerCell />
        </YearPickerLayout>
      </YearPicker>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Budget for {year ? `FY${year.slice(0, 4)}` : '—'}</Text>
    </div>
  );
}
