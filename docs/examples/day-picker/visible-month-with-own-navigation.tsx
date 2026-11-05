import {
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function VisibleMonthWithOwnNavigation() {
  const [month, setMonth] = useState('2026-11-01');
  const [active, setActive] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (next: string) => {
    setMonth(next);
    setActive((current) => {
      if (current.slice(0, 7) === next.slice(0, 7)) return current;

      return next;
    });
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton aria-label='Previous month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(addMonths(month, -1))}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <Text fontWeight={600} aria-live='polite'>{monthFormat.format(new Date(month))}</Text>
        <IconButton aria-label='Next month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(addMonths(month, 1))}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
      <DayPicker
        aria-label='Pickup day'
        locale='en-US'
        month={month}
        active={active}
        onChangeActive={setActive}
        selected={selected}
        onSelectCell={setSelected}
      >
        <DayPickerScroller onChangePeriod={showMonth}>
          <DayPickerScrollerContent>
            <DayPickerScrollerLayout>
              <DayPickerCell />
            </DayPickerScrollerLayout>
          </DayPickerScrollerContent>
        </DayPickerScroller>
      </DayPicker>
    </div>
  );
}
