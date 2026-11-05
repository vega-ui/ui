import {
  Button,
  Fieldset,
  FieldsetLegend,
  HelperText,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

function getMonthEnd(monthStart: string) {
  const date = new Date(monthStart);
  date.setUTCMonth(date.getUTCMonth() + 1, 0);

  return date.toISOString().slice(0, 10);
}

export default function ReportPeriod() {
  const [period, setPeriod] = useState<string[]>([]);
  const [missing, setMissing] = useState(false);
  const [query, setQuery] = useState('');
  const hintId = useId();

  const [from, to] = period;

  const change = (next: string[]) => {
    setPeriod(next);
    setMissing(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.get('from') || !data.get('to')) {
      setMissing(true);
      return;
    }

    setQuery(new URLSearchParams({ from: String(data.get('from')), to: String(data.get('to')) }).toString());
  };

  const reset = () => {
    setPeriod([]);
    setMissing(false);
    setQuery('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Report period</FieldsetLegend>
        <MonthPicker
          aria-label='Report period, 2026'
          aria-describedby={hintId}
          locale='en-US'
          selection='range'
          year='2026-01-01'
          selected={period}
          onSelectCell={change}
        >
          <MonthPickerLayout cols={4} format='short'>
            <MonthPickerCell />
          </MonthPickerLayout>
        </MonthPicker>
        <HelperText id={hintId} error={missing}>
          {missing ? 'Pick the first and the last month of the period.' : 'Pick the first and the last month.'}
        </HelperText>
      </Fieldset>
      <input type='hidden' name='from' value={from ?? ''} />
      <input type='hidden' name='to' value={to ? getMonthEnd(to) : ''} />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Build report</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{query ? `GET /reports?${query}` : ''}</Text>
    </form>
  );
}
