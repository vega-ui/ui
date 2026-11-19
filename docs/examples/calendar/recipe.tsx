import { useState } from 'react';
import {
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
  type CalendarProps,
  type CalendarSelection,
  type CalendarView,
} from '@vega-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

interface MyCalendarProps<SelectionMode extends CalendarSelection = 'single'> extends CalendarProps<SelectionMode> {
  previousLabel: string
  nextLabel: string
  previousYearsLabel: string
  nextYearsLabel: string
}

export function MyCalendar<SelectionMode extends CalendarSelection = 'single'>({
  previousLabel,
  nextLabel,
  previousYearsLabel,
  nextYearsLabel,
  onChangeView,
  ...props
}: MyCalendarProps<SelectionMode>) {
  const [shownView, setShownView] = useState<CalendarView>(props.defaultView ?? 'day');
  const years = (props.view ?? shownView) === 'year';

  const changeView = (view: CalendarView) => {
    onChangeView?.(view);
    setShownView(view);
  };

  return (
    <Calendar {...props} onChangeView={changeView}>
      <CalendarHeader>
        <CalendarPrevButton square aria-label={years ? previousYearsLabel : previousLabel}><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton square aria-label={years ? nextYearsLabel : nextLabel}><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
    </Calendar>
  );
}

export default function Recipe() {
  return (
    <MyCalendar
      compact
      locale='en-US'
      defaultValue='2026-11-24'
      previousLabel='Previous month'
      nextLabel='Next month'
      previousYearsLabel='Previous years'
      nextYearsLabel='Next years'
    />
  );
}
