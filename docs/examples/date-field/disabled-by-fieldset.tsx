import { useState } from 'react';
import {
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
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Fieldset,
  FieldsetLegend,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function DisabledByFieldset() {
  const [asap, setAsap] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 300 }}>
      <Checkbox style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <CheckboxInput checked={asap} onChange={(event) => setAsap(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
        Ship as soon as possible
      </Checkbox>
      <Fieldset disabled={asap} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-6)' }}>Scheduled shipping</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='ship-on'>Ship on</Label>
          <DateField format='dd.MM.yyyy' separator='.'>
            <DateFieldInput id='ship-on' name='shipOn' placeholder='dd.mm.yyyy' />
            <Popover placement='bottom-end'>
              <PopoverTrigger asChild>
                <DateFieldTriggerIconButton aria-label='Choose shipping date' />
              </PopoverTrigger>
              <PopoverContent>
                <DateFieldCalendar>
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
                </DateFieldCalendar>
              </PopoverContent>
            </Popover>
          </DateField>
        </div>
      </Fieldset>
    </div>
  );
}
