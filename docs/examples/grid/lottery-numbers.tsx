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

const limit = 6;
const rows = Array.from({ length: 7 }, (_, row) => row);
const cols = Array.from({ length: 7 }, (_, col) => col);

const describePicked = (picked: number[]) => {
  if (picked.length === 0) return `Pick ${limit} numbers.`;

  const sorted = [...picked].sort((a, b) => a - b);

  return `${picked.length} of ${limit} picked: ${sorted.join(', ')}`;
};

export default function LotteryNumbers() {
  const [picked, setPicked] = useState<number[]>([]);

  const isLocked = (value: number) => picked.length >= limit && !picked.includes(value);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 252 }}>
      <Grid
        aria-label={`Lottery numbers, pick ${limit}`}
        selection='multiple'
        wrap='horizontal'
        value={picked}
        onChangeValue={setPicked}
        disabled={isLocked}
        defaultActive={1}
        style={{ width: '100%' }}
      >
        <GridRowGroup>
          {rows.map((row) => (
            <GridRow key={row} row={row}>
              {cols.map((col) => {
                const value = row * cols.length + col + 1;

                return (
                  <GridCell key={value} col={col} value={value} asChild>
                    <GridItem size='xs'>{value}</GridItem>
                  </GridCell>
                );
              })}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{describePicked(picked)}</Text>
        <Button size='sm' variant='secondary' appearance='ghost' disabled={picked.length === 0} onClick={() => setPicked([])}>Clear</Button>
      </div>
    </div>
  );
}
