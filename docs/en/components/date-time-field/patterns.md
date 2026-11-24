# DateTimeField Patterns

## Timestamp Field With Popover Calendar

When to use:

- Users need one field that captures both date and time.
- The calendar should open on demand instead of staying visible.

Composition notes:

- Keep `DateTimeFieldInput` as the primary surface and label it.
- Mount `DateTimeFieldCalendar` inside `PopoverContent`; picking a day keeps the typed time.

Trade-offs:

- Keeps the form compact.
- Requires clear formatting and timezone guidance.

<!-- example: date-time-field/date-and-time-with-a-calendar-popover.tsx -->
```tsx
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
  DateTimeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function DateAndTimeWithACalendarPopover({ locale = 'en-US' }: { locale?: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='starts-at'>Webinar starts at</Label>
      <DateTimeField
        locale={locale}
        dateFormat='dd.MM.yyyy'
        dateSeparator='.'
        separator=', '
        timeFormat='HH:mm'
        defaultValue='2026-07-15T18:30'
      >
        <DateTimeFieldInput id='starts-at' placeholder='dd.mm.yyyy, hh:mm' aria-describedby='starts-at-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateTimeFieldTrigger square aria-label='Choose webinar date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent role='dialog' aria-label='Choose webinar date'>
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
      <HelperText id='starts-at-hint'>24-hour time. Picking a day keeps the typed time.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Timestamp Field In Scheduling Forms

When to use:

- Publishing, reminders, or execution schedules depend on one timestamp.
- Validation and serialization happen close to submit.

Composition notes:

- Keep helper text explicit about timezone and expected format.
- Align `min`, `max`, and `timeStep` with scheduling business rules; `min` and `max` make a typed value outside them invalid, `timeStep` only drives arrow-key stepping.
- The input submits the shown text; submit the `YYYY-MM-DDTHH:mm` value through a hidden input of your own, as in [Form/Integration](./examples.md#formintegration).

Trade-offs:

- Strong timestamp control in one field row.
- More validation and copy complexity than a plain date field.

<!-- example: date-time-field/submitting-a-local-date-time.tsx -->
```tsx
import { FormEvent, useState } from 'react';
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
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function SchedulePostForm() {
  const [publishAt, setPublishAt] = useState('');
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set('timeZone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  };

  const onReset = () => {
    setPublishAt('');
    setSubmitted('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='publish-at'>Publish at</Label>
        <DateTimeField dateFormat='dd.MM.yyyy' timeStep={15} min='2026-07-01T00:00' value={publishAt} onChangeValue={setPublishAt}>
          <DateTimeFieldInput
            id='publish-at'
            required
            placeholder='dd.mm.yyyy, hh:mm'
            aria-describedby='publish-at-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateTimeFieldTrigger square aria-label='Choose publish date'><Icon><CalendarIcon /></Icon></DateTimeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent role='dialog' aria-label='Choose publish date'>
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
        <input type='hidden' name='publishAt' value={publishAt} />
        <HelperText id='publish-at-hint'>Your local time. The time zone is sent with the post.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Schedule</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Sent: <code>{submitted}</code></Text>}
    </form>
  );
}
```
<!-- /example -->

## Timestamp Field Inside Mobile-First Sheets

When to use:

- Scheduling happens inside `Sheet` or another constrained overlay.
- The user still needs a calendar affordance.

Composition notes:

- Test popover placement and scrolling inside the parent overlay.
- Keep the field concise enough for narrow layouts.

Trade-offs:

- Preserves modal context.
- Increases overlay and focus coordination complexity.

<!-- example: date-time-field/rescheduling-inside-a-sheet.tsx -->
```tsx
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
```
<!-- /example -->
