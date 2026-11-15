import {
  Button,
  Calendar,
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
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon } from '@vega-ui/icons';
import { useState } from 'react';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeZone: 'UTC' });

export default function CalendarInAPopover() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');

  const pick = (next: string) => {
    setDate(next);
    setOpen(false);
  };

  return (
    <Popover open={open} onChangeOpen={setOpen} placement='bottom-start' role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost' aria-label={date ? `Due date, ${dateFormat.format(new Date(date))}` : 'Due date'}>
          <Icon size='sm'><CalendarIcon /></Icon>
          {date ? dateFormat.format(new Date(date)) : 'Pick a due date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Choose a due date'>
        <Calendar compact locale='en-US' value={date} onChangeValue={pick}>
          <CalendarHeader>
            <CalendarPrevButton aria-label='Previous' />
            <CalendarHeading>
              <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
              <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
            </CalendarHeading>
            <CalendarNextButton aria-label='Next' />
          </CalendarHeader>
          <CalendarContent>
            <CalendarDays aria-label='Due date'>
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
        </Calendar>
      </PopoverContent>
    </Popover>
  );
}
