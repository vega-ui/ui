import { FormEvent, useState } from 'react';
import {
  Button,
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  HelperText,
  Text,
} from '@vega-ui/react';

const quarters = ['2026-Q1', '2026-Q2', '2026-Q3', '2026-Q4'];
const initialQuarter = '2026-Q2';

export default function QuarterSelectorInABillingFlow() {
  const [quarter, setQuarter] = useState(initialQuarter);
  const [result, setResult] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const period = new FormData(event.currentTarget).get('period');
    setResult(`Exporting invoices for ${period}`);
  };

  const onReset = () => {
    setQuarter(initialQuarter);
    setResult('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='invoice-period-label' fontWeight={500}>Invoice period</Text>
        <DataGridPicker
          aria-labelledby='invoice-period-label'
          aria-describedby='invoice-period-hint'
          selected={quarter}
          onSelectCell={setQuarter}
          disabled='2026-Q4'
          defaultActive={initialQuarter}
          style={{ width: '100%' }}
        >
          <DataGridPickerRowGroup>
            <DataGridPickerRow row={0}>
              {quarters.map((value, col) => (
                <DataGridPickerItem key={value} col={col} value={value}>{value.slice(5)}</DataGridPickerItem>
              ))}
            </DataGridPickerRow>
          </DataGridPickerRowGroup>
        </DataGridPicker>
        <input type='hidden' name='period' value={quarter} />
        <HelperText id='invoice-period-hint'>Q4 is still open and cannot be invoiced yet.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Export invoices</Button>
      </div>
      {result && <Text size={2} style={{ color: 'var(--label-secondary)' }}>{result}</Text>}
    </form>
  );
}
