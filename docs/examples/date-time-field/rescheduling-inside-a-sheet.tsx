import { CSSProperties, useState } from 'react';
import { XIcon } from '@vega-ui/icons';
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  Heading,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

export default function ReschedulingInsideASheet() {
  const [draft, setDraft] = useState('2026-07-15T14:00');
  const [appointment, setAppointment] = useState('2026-07-15T14:00');

  const onChangeOpen = (open: boolean) => {
    if (open) setDraft(appointment);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>Appointment: <code>{appointment}</code></Text>
      <Sheet onChangeOpen={onChangeOpen}>
        <SheetTrigger asChild>
          <Button>Reschedule</Button>
        </SheetTrigger>
        <SheetContent aria-labelledby='reschedule-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='reschedule-title' as='h2' size={4} fontWeight={600}>Reschedule appointment</Heading>
            <SheetClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </SheetClose>
          </div>
          <form
            method='dialog'
            onSubmit={() => setAppointment(draft)}
            style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}
          >
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='new-time'>New time</Label>
              <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} value={draft} onChangeValue={setDraft}>
                <DateTimeFieldInput id='new-time' required pattern='\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2}' />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateTimeFieldTriggerIconButton aria-label='Choose new date' />
                  </PopoverTrigger>
                  <PopoverContent>
                    <DateTimeFieldCalendar>
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
                    </DateTimeFieldCalendar>
                  </PopoverContent>
                </Popover>
              </DateTimeField>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
