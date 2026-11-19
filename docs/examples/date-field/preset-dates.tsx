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

const toISODate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
};

const daysFromToday = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return toISODate(date);
};

export default function PresetDates() {
  const [publishOn, setPublishOn] = useState('');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='publish-on'>Publish on</Label>
        <DateField format='dd.MM.yyyy' separator='.' value={publishOn} onChangeValue={setPublishOn}>
          <DateFieldInput id='publish-on' placeholder='dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTrigger square aria-label='Choose publish date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose publish date'>
                <CalendarHeader>
                  <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
                  <CalendarHeading>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarHeading>
                  <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
      <div role='group' aria-label='Quick dates' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPublishOn(daysFromToday(0))}>Today</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPublishOn(daysFromToday(1))}>Tomorrow</Button>
        <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setPublishOn(daysFromToday(7))}>In a week</Button>
        <Button size='xs' variant='secondary' appearance='transparent' onClick={() => setPublishOn('')}>Clear</Button>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {publishOn ? <code>{publishOn}</code> : 'no complete date'}
      </Text>
    </div>
  );
}
