import { useState } from 'react';
import {
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const FIRST_DAY = '2026-01-10';
const LAST_DAY = '2026-12-31';

export default function OverflowingAndOutOfRangeDates() {
  const [startDate, setStartDate] = useState('');
  const outOfRange = startDate !== '' && (startDate < FIRST_DAY || startDate > LAST_DAY);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='campaign-start'>Campaign start</Label>
        <DateField
          format='dd.MM.yyyy'
          separator='.'
          min={FIRST_DAY}
          max={LAST_DAY}
         
          value={startDate}
          onChangeValue={setStartDate}
        >
          <DateFieldInput id='campaign-start' placeholder='dd.mm.yyyy' aria-invalid={outOfRange} aria-describedby='campaign-start-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose campaign start' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose campaign start'>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarHeading>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarHeading>
                  <CalendarNextButton aria-label='Next month' />
                </CalendarHeader>
                <CalendarContent>
                  <CalendarDays>
                    <CalendarWeekdays>
                      <CalendarWeekday />
                    </CalendarWeekdays>
                    <CalendarDaysScroller>
                      <CalendarDaysScrollerContent>
                        <CalendarWeeks>
                          <CalendarDay />
                        </CalendarWeeks>
                      </CalendarDaysScrollerContent>
                    </CalendarDaysScroller>
                  </CalendarDays>
                  <CalendarMonths>
                    <CalendarMonthsGrid>
                      <CalendarMonth />
                    </CalendarMonthsGrid>
                  </CalendarMonths>
                  <CalendarYears>
                    <CalendarYearsScroller>
                      <CalendarYearsScrollerContent>
                        <CalendarYearsGrid>
                          <CalendarYear />
                        </CalendarYearsGrid>
                      </CalendarYearsScrollerContent>
                    </CalendarYearsScroller>
                  </CalendarYears>
                </CalendarContent>
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='campaign-start-hint' invalid={outOfRange}>
          {outOfRange ? 'The campaign starts between 10.01.2026 and 31.12.2026.' : 'Between 10.01.2026 and 31.12.2026. Try 31.02.2026 or 05.01.2026.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {startDate ? <code>{startDate}</code> : 'no complete date'}
      </Text>
    </div>
  );
}
