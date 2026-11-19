import {
  Button,
  Icon,
  MonthPicker,
  MonthPickerCell,
  MonthPickerLayout,
  Text,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function BillingMonthWithYearNavigation() {
  const [focused, setFocused] = useState('2026-10-01');
  const [month, setMonth] = useState<string | null>('2026-10-01');

  const year = Number(focused.slice(0, 4));

  const showYear = (next: number) => {
    setFocused(`${next}${focused.slice(4)}`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button square aria-label='Previous year' size='sm' variant='secondary' appearance='ghost' onClick={() => showYear(year - 1)}>
          <Icon><ChevronLeftIcon /></Icon>
        </Button>
        <Text fontWeight={600} aria-live='polite'>{year}</Text>
        <Button square aria-label='Next year' size='sm' variant='secondary' appearance='ghost' onClick={() => showYear(year + 1)}>
          <Icon><ChevronRightIcon /></Icon>
        </Button>
      </div>
      <MonthPicker
        aria-label={`Billing month, ${year}`}
        locale='en-US'
        focusedDate={focused}
        onChangeFocusedDate={setFocused}
        value={month}
        onChangeValue={setMonth}
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
