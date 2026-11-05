import { CSSProperties } from 'react';
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function DateFieldInsideADialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Schedule review</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='schedule-review-title' style={{ minWidth: 320 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='schedule-review-title' as='h2' size={4} fontWeight={600}>Schedule review</Heading>
          <DialogClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DialogClose>
        </div>
        <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor='review-date'>Review date</Label>
            <DateField format='dd.MM.yyyy' separator='.' min='2026-01-01'>
              <DateFieldInput id='review-date' name='reviewDate' required placeholder='dd.mm.yyyy' />
              <Popover placement='bottom-end'>
                <PopoverTrigger asChild>
                  <DateFieldTriggerIconButton aria-label='Choose review date' />
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
            <Button type='submit'>Schedule</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
