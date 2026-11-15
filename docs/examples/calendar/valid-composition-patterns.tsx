import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonthLabel,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYearLabel,
  Text,
} from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Calendar locale='en-US'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous month' />
        <CalendarHeading>
          <Text fontWeight={600}>
            <CalendarMonthLabel /> <CalendarYearLabel />
          </Text>
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
      </CalendarContent>
    </Calendar>
  );
}
