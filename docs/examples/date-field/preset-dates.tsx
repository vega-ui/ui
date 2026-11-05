import { useState } from 'react';
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

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
              <DateFieldTriggerIconButton aria-label='Choose publish date' />
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
