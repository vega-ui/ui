import {
  Calendar,
  CalendarContent,
  CalendarDay,
  CalendarDays,
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
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  CalendarYearsGrid,
  type CalendarProps,
  type CalendarSelection,
} from '@vega-ui/react';

const appSettings = { locale: 'en-GB', min: '1900-01-01', max: '2099-12-31' };

function AppCalendar<S extends CalendarSelection = 'single'>(props: Omit<CalendarProps<S>, 'children'>) {
  return (
    <Calendar<S> locale={appSettings.locale} min={appSettings.min} max={appSettings.max} {...props}>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarHeading>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarHeading>
        <CalendarNextButton aria-label='Next' />
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

export default function AppWideLocale() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-16)', alignItems: 'start', justifyContent: 'center', width: '100%' }}>
      <AppCalendar compact defaultValue='2026-11-03' />
      <AppCalendar compact selection='range' locale='fr-FR' defaultValue={['2026-11-09', '2026-11-13']} />
    </div>
  );
}
