import { useState } from 'react';
import { createCalendarSystem } from '@vega-ui/i18n';
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
  DateFieldTrigger,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const persianCalendar = createCalendarSystem('persian');

export default function DateFieldInANonGregorianCalendar() {
  const [date, setDate] = useState('2026-03-21');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='persian-date'>تاریخ تحویل</Label>
        <DateField
          format='yyyy/MM/dd'
          separator='/'
          calendar={persianCalendar}
          locale='fa-IR'
          min='2026-03-21'
          value={date}
          onChangeValue={setDate}
        >
          <DateFieldInput id='persian-date' placeholder='yyyy/mm/dd' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='انتخاب تاریخ'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='انتخاب تاریخ'>
                <CalendarHeader>
                  <CalendarPrevButton square aria-label='ماه قبل'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
                  <CalendarHeading>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarHeading>
                  <CalendarNextButton square aria-label='ماه بعد'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Stored value: {date ? <code>{date}</code> : 'no complete date'}
      </Text>
    </div>
  );
}
