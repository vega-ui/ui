import {
  Icon,
  IconButton,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function BillingMonthWithYearNavigation() {
  const [year, setYear] = useState(2026);
  const [active, setActive] = useState('2026-10-01');
  const [month, setMonth] = useState<string | null>('2026-10-01');

  const showYear = (next: number) => {
    setYear(next);
    setActive(`${next}-01-01`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous year' size='sm' variant='secondary' appearance='ghost' onClick={() => showYear(year - 1)}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{year}</Text>
        <IconButton aria-label='Next year' size='sm' variant='secondary' appearance='ghost' onClick={() => showYear(year + 1)}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <MonthPicker
        aria-label={`Billing month, ${year}`}
        locale='en-US'
        year={`${year}-01-01`}
        active={active}
        onChangeActive={setActive}
        selected={month}
        onSelectCell={setMonth}
        style={{ width: '100%' }}
      >
        <MonthPickerLayout cols={4} format='short'>
          <MonthPickerCell />
        </MonthPickerLayout>
      </MonthPicker>
      <Text>Invoice for {month ? monthFormat.format(new Date(month)) : '—'}</Text>
    </div>
  );
}
