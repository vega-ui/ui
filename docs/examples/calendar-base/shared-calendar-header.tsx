import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  Icon,
  Text,
  YearPicker,
  YearPickerCell,
  YearPickerLayout,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const PAGE_SIZE = 12;

function toYearKey(year: number) {
  return `${year}-01-01`;
}

export default function SharedCalendarHeader() {
  const [firstYear, setFirstYear] = useState(2016);
  const [active, setActive] = useState(toYearKey(2016));
  const [selected, setSelected] = useState<string | null>(null);

  const lastYear = firstYear + PAGE_SIZE - 1;

  const showPage = (amount: number) => {
    const next = firstYear + amount * PAGE_SIZE;
    setFirstYear(next);
    setActive(toYearKey(next));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start', width: '100%' }}>
      <CalendarBase style={{ width: '100%' }}>
        <CalendarBaseHeader>
          <CalendarBaseControlIconButton aria-label='Previous 12 years' onClick={() => showPage(-1)}>
            <Icon><ChevronLeft /></Icon>
          </CalendarBaseControlIconButton>
          <Text fontWeight={600} style={{ alignSelf: 'center' }}>{firstYear}–{lastYear}</Text>
          <CalendarBaseControlIconButton aria-label='Next 12 years' onClick={() => showPage(1)}>
            <Icon><ChevronRight /></Icon>
          </CalendarBaseControlIconButton>
        </CalendarBaseHeader>
        <YearPicker
          aria-label={`Graduation year, ${firstYear} to ${lastYear}`}
          locale='en-US'
          year={toYearKey(firstYear)}
          active={active}
          onChangeActive={setActive}
          selected={selected}
          onSelectCell={setSelected}
        >
          <YearPickerLayout start={toYearKey(firstYear)} offset={0}>
            <YearPickerCell />
          </YearPickerLayout>
        </YearPicker>
      </CalendarBase>
      <Text aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>Graduation year: {selected ? selected.slice(0, 4) : 'not set'}</Text>
    </div>
  );
}
