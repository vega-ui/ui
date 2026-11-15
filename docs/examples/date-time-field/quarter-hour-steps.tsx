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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function QuarterHourSteps() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='pickup-time'>Pickup</Label>
      <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} defaultValue='2026-07-15T12:45'>
        <DateTimeFieldInput id='pickup-time' aria-describedby='pickup-time-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateTimeFieldTriggerIconButton aria-label='Choose pickup date' />
          </PopoverTrigger>
          <PopoverContent>
            <DateTimeFieldCalendar aria-label='Choose pickup date'>
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
            </DateTimeFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateTimeField>
      <HelperText id='pickup-time-hint'>Put the caret in the minutes and press ↑ or ↓ to move by 15 minutes.</HelperText>
    </div>
  );
}
