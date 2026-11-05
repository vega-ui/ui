import {
  Button,
  Fieldset,
  FieldsetLegend,
  HelperText,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

function getYearEnd(yearStart: string) {
  return `${yearStart.slice(0, 4)}-12-31`;
}

export default function YearRangeFilter() {
  const [years, setYears] = useState<string[]>([]);
  const [missing, setMissing] = useState(false);
  const [query, setQuery] = useState('');
  const hintId = useId();

  const [from, to] = years;

  const change = (next: string[]) => {
    setYears(next);
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
    setYears([]);
    setMissing(false);
    setQuery('');
  };

  return (
    <form onSubmit={submit} onReset={reset} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend>Archive years</FieldsetLegend>
        <YearPicker
          aria-label='Archive years, 2015 to 2026'
          aria-describedby={hintId}
          locale='en-US'
          selection='range'
          year='2015-01-01'
          to='2026-01-01'
          selected={years}
          onSelectCell={change}
        >
          <YearPickerLayout>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
        <HelperText id={hintId} error={missing}>
          {missing ? 'Pick the first and the last year.' : 'Pick the first and the last year of the search.'}
        </HelperText>
      </Fieldset>
      <input type='hidden' name='from' value={from ?? ''} />
      <input type='hidden' name='to' value={to ? getYearEnd(to) : ''} />
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Search</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text aria-live='polite'>{query ? `GET /archive?${query}` : ''}</Text>
    </form>
  );
}
