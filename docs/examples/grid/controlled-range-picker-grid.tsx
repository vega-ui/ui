import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridItem,
  GridRow,
  GridRowGroup,
  Text,
} from '@vega-ui/react';

const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const rows = [0, 1, 2];
const cols = [0, 1, 2, 3];

const toValue = (month: number) => `2026-${String(month + 1).padStart(2, '0')}`;
const toName = (value: string) => names[Number(value.slice(5)) - 1];

const describeRange = (range: string[]) => {
  if (range.length === 0) return 'Pick the first month of the campaign.';
  if (range.length === 1) return `Starts in ${toName(range[0])}. Now pick the last month.`;

  const [start, end] = [...range].sort();
  const months = Number(end.slice(5)) - Number(start.slice(5)) + 1;

  return `${toName(start)} – ${toName(end)} 2026, ${months} months`;
};

export default function ControlledRangePickerGrid() {
  const [range, setRange] = useState<string[]>(['2026-03', '2026-07']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <Grid
        aria-label='Campaign months, 2026'
        selection='range'
        wrap='horizontal'
        value={range}
        onChangeValue={setRange}
        defaultActive='2026-03'
        style={{ width: '100%' }}
      >
        <GridRowGroup>
          {rows.map((row) => (
            <GridRow key={row} row={row}>
              {cols.map((col) => {
                const value = toValue(row * cols.length + col);

                return (
                  <GridCell key={value} col={col} value={value} asChild>
                    <GridItem size='sm'>{toName(value)}</GridItem>
                  </GridCell>
                );
              })}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{describeRange(range)}</Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRange([])}>Clear</Button>
      </div>
    </div>
  );
}
