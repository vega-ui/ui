import { CSSProperties, useState } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from '@vega-ui/icons';
import {
  Button,
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
  DateTimeFieldTrigger,
  Heading,
  Icon,
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
              <Button
                square
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
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
                <DateTimeFieldInput id='new-time' required />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateTimeFieldTrigger square aria-label='Choose new date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
                  </PopoverTrigger>
                  <PopoverContent role='dialog' aria-label='Choose new date'>
                    <DateTimeFieldCalendar>
                      <CalendarHeader>
                        <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
                        <CalendarHeading>
                          <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                        </CalendarHeading>
                        <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
