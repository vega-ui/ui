import {
  Calendar,
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
  type CalendarProps,
  type CalendarSelection,
} from '@vega-ui/react';

const appSettings = { locale: 'en-GB', min: '1900-01-01', max: '2099-12-31' };

function AppCalendar<S extends CalendarSelection = 'single'>(props: Omit<CalendarProps<S>, 'children'>) {
  return (
    <Calendar<S> locale={appSettings.locale} min={appSettings.min} max={appSettings.max} {...props}>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
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
