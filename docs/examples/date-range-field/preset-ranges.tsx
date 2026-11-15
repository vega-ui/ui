import { useState } from 'react';
import {
  Button,
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const toISODate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
};

const lastDays = (count: number): [string, string] => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - count + 1);

  return [toISODate(start), toISODate(end)];
};

const thisMonth = (): [string, string] => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return [toISODate(start), toISODate(end)];
};

export default function PresetRanges() {
  const [period, setPeriod] = useState<[string, string]>(['', '']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='report-period'>Report period</Label>
        <DateRangeField format='dd.MM.yyyy' separator='.' value={period} onChangeValue={setPeriod}>
          <DateRangeFieldInput id='report-period' placeholder='dd.mm.yyyy – dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose report period' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar aria-label='Choose report period'>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
      </div>
      <div role='group' aria-label='Quick periods' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPeriod(lastDays(7))}>7 days</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPeriod(lastDays(30))}>30 days</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPeriod(thisMonth())}>This month</Button>
        <Button size='xs' variant='secondary' appearance='transparent' onClick={() => setPeriod(['', ''])}>Clear</Button>
      </div>
    </div>
  );
}
