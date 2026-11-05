import { FormEvent, useState } from 'react';
import {
  Button,
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const DEFAULT_PERIOD: [string, string] = ['2026-01-01', '2026-03-31'];

export default function ReportFilter() {
  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const [query, setQuery] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams({ from: String(data.get('from')), to: String(data.get('to')) });
    setQuery(params.toString());
  };

  return (
    <form onSubmit={onSubmit} onReset={() => setQuery('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='period'>Reporting period</Label>
        <DateRangeField
          format='dd.MM.yyyy'
          separator='.'
          rangeSeparator=' - '
          defaultValue={DEFAULT_PERIOD}
          onChangeValue={setPeriod}
        >
          <DateRangeFieldInput
            id='period'
            required
            pattern='\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}'
            aria-describedby='period-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTriggerIconButton aria-label='Choose reporting period' />
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='Previous month' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='Next month' />
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
        <input type='hidden' name='from' value={period[0]} />
        <input type='hidden' name='to' value={period[1]} />
        <HelperText id='period-hint'>Both days are included in the export.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Apply</Button>
      </div>
      {query && <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Request: <code>/api/reports?{query}</code></Text>}
    </form>
  );
}
