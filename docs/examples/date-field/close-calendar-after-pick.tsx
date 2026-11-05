import { useState } from 'react';
import {
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function CloseCalendarAfterPick() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='delivery-date'>Delivery date</Label>
      <DateField format='dd.MM.yyyy' separator='.'>
        <DateFieldInput id='delivery-date' placeholder='dd.mm.yyyy' />
        <Popover placement='bottom-end' open={open} onChangeOpen={setOpen}>
          <PopoverTrigger asChild>
            <DateFieldTriggerIconButton aria-label='Choose delivery date' />
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar onChangeValue={() => setOpen(false)}>
              <CalendarHeader>
                <CalendarPrevButton aria-label='Previous month' />
                <CalendarViewButtonGroup>
                  <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                  <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                </CalendarViewButtonGroup>
                <CalendarNextButton aria-label='Next month' />
              </CalendarHeader>
              <CalendarContent>
                <CalendarDays>
                  <CalendarWeekdays>
                    <CalendarWeekday />
                  </CalendarWeekdays>
                  <CalendarWeeks>
                    <CalendarDay />
                  </CalendarWeeks>
                </CalendarDays>
                <CalendarMonths>
                  <CalendarMonth />
                </CalendarMonths>
                <CalendarYears>
                  <CalendarYear />
                </CalendarYears>
              </CalendarContent>
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
    </div>
  );
}
