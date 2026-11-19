import {
  Button,
  DayPicker,
  DayPickerCell,
  DayPickerScroller,
  DayPickerScrollerContent,
  DayPickerScrollerLayout,
  Icon,
  Text,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { addCalendarMonths, getSameDayInCalendarMonth, gregorianCalendar } from '@vega-ui/i18n';
import { useState } from 'react';

const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function VisibleMonthWithOwnNavigation() {
  const [focused, setFocused] = useState('2026-11-01');
  const [selected, setSelected] = useState<string | null>(null);

  const showMonth = (amount: number) => {
    const month = addCalendarMonths(gregorianCalendar, focused, amount);
    setFocused(getSameDayInCalendarMonth(gregorianCalendar, focused, month));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', inlineSize: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button square aria-label='Previous month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(-1)}>
          <Icon><ChevronLeftIcon /></Icon>
        </Button>
        <Text fontWeight={600} aria-live='polite'>{monthFormat.format(new Date(focused))}</Text>
        <Button square aria-label='Next month' size='sm' variant='secondary' appearance='ghost' onClick={() => showMonth(1)}>
          <Icon><ChevronRightIcon /></Icon>
        </Button>
      </div>
      <DayPicker
        aria-label='Pickup day'
        locale='en-US'
        focusedDate={focused}
        onChangeFocusedDate={setFocused}
        value={selected}
        onChangeValue={setSelected}
      >
        <DayPickerScroller>
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
