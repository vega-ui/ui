import { useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Text,
} from '@vega-ui/react';
import './examples.css';

const initialBudget = [
  { category: 'Rent', planned: '1800', spent: '1800' },
  { category: 'Groceries', planned: '600', spent: '412' },
  { category: 'Transport', planned: '150', spent: '96' },
  { category: 'Utilities', planned: '220', spent: '238' },
];

const headers = ['Category', 'Planned', 'Spent', 'Left'];

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const toNumber = (value: string) => Number(value) || 0;

export const layout = 'wide';

export default function InlineEditing() {
  const [budget, setBudget] = useState(initialBudget);

  const change = (row: number, field: 'planned' | 'spent', value: string) => {
    setBudget(budget.map((item, index) => index === row ? { ...item, [field]: value } : item));
  };

  const left = budget.reduce((sum, item) => sum + toNumber(item.planned) - toNumber(item.spent), 0);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', inlineSize: 'min(100%, 480px)' }}>
      <Grid aria-label='November budget' defaultActive='0:1' className='gridSheet gridSheetWideFirst gridEditable'>
        <GridRowGroup>
          <GridRow row={-1}>
            {headers.map((header, col) => (
              <GridColumnHeader key={header} col={col} excluded>{header}</GridColumnHeader>
            ))}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {budget.map((item, row) => (
            <GridRow key={item.category} row={row}>
              <GridRowHeader col={0}>{item.category}</GridRowHeader>
              <GridCell col={1}>
                <input
                  className='gridCellInput'
                  tabIndex={-1}
                  aria-label={`${item.category} planned`}
                  inputMode='decimal'
                  value={item.planned}
                  onChange={(event) => change(row, 'planned', event.target.value)}
                />
              </GridCell>
              <GridCell col={2}>
                <input
                  className='gridCellInput'
                  tabIndex={-1}
                  aria-label={`${item.category} spent`}
                  inputMode='decimal'
                  value={item.spent}
                  onChange={(event) => change(row, 'spent', event.target.value)}
                />
              </GridCell>
              <GridCell col={3} className='gridNumeric'>
                {money.format(toNumber(item.planned) - toNumber(item.spent))}
              </GridCell>
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{`Left this month: ${money.format(left)}`}</Text>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setBudget(initialBudget)}>Reset</Button>
      </div>
    </div>
  );
}
