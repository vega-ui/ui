# DateField Examples

## Basic

### Basic: typed date with a calendar popover

A labelled field where users type a date or pick it in a popover calendar. `defaultValue` on the root is an ISO `YYYY-MM-DD` day; the input shows it in `format`, and the helper text tells users which format to type.

<!-- example: date-field/typed-date-with-a-calendar-popover.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function TypedDateWithACalendarPopover({ locale = 'en-US' }: { locale?: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='due-date'>Payment due</Label>
      <DateField locale={locale} format='dd.MM.yyyy' separator='.' defaultValue='2026-03-31'>
        <DateFieldInput id='due-date' placeholder='dd.mm.yyyy' aria-describedby='due-date-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateFieldTriggerIconButton aria-label='Choose due date' />
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Choose due date'>
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
      <HelperText id='due-date-hint'>Type the date as dd.mm.yyyy or pick it in the calendar.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: preset dates

`value` and `onChangeValue` on the root keep the ISO day in parent state. Buttons set it from outside and the input shows it in `format`; while the typed text is incomplete the value is `''`.

<!-- example: date-field/preset-dates.tsx -->
```tsx
import { useState } from 'react';
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
              <DateFieldCalendar aria-label='Choose publish date'>
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
```
<!-- /example -->

### Controlled/Stateful: check-out starts after check-in

The check-in day drives the `min` of the check-out field. When check-in moves to or past an already typed check-out, its `onChangeValue` moves the check-out to the next day, so the night count stays correct. A check-out typed before that day stays as typed and makes the input invalid, and `[data-user-edited]:invalid` marks it.

<!-- example: date-field/check-out-starts-after-check-in.tsx -->
```tsx
import { useState } from 'react';
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
  Text,
} from '@vega-ui/react';

const addDays = (iso: string, days: number) => {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
};

const countNights = (checkIn: string, checkOut: string) => {
  return (Date.parse(checkOut) - Date.parse(checkIn)) / 86_400_000;
};

const describeStay = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 'Choose both dates';

  const nights = countNights(checkIn, checkOut);
  if (nights < 1) return 'Check-out must be after check-in';

  return `${nights} ${nights === 1 ? 'night' : 'nights'}`;
};

export default function StayDates() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const checkOutMin = checkIn ? addDays(checkIn, 1) : undefined;

  const changeCheckIn = (nextCheckIn: string) => {
    setCheckIn(nextCheckIn);

    if (nextCheckIn !== '' && checkOut !== '' && checkOut <= nextCheckIn) {
      setCheckOut(addDays(nextCheckIn, 1));
    }
  };

  return (
    <Fieldset style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-6)' }}>Stay</FieldsetLegend>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='check-in'>Check-in</Label>
        <DateField format='dd.MM.yyyy' separator='.' value={checkIn} onChangeValue={changeCheckIn}>
          <DateFieldInput id='check-in' placeholder='dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose check-in date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose check-in date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='check-out'>Check-out</Label>
        <DateField
          format='dd.MM.yyyy'
          separator='.'
          min={checkOutMin}
          value={checkOut}
          onChangeValue={setCheckOut}
        >
          <DateFieldInput id='check-out' placeholder='dd.mm.yyyy' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose check-out date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose check-out date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
      </div>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        {describeStay(checkIn, checkOut)}
      </Text>
    </Fieldset>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: submitting an ISO date

`DateFieldInput` submits the typed `15.01.2026` like a native input, so the form keeps the ISO day from `onChangeValue` in state and submits it through a hidden input of its own: `FormData` gets `2026-01-15`. `required` blocks an empty date, the field itself makes an incomplete date invalid, and the reset handler restores the initial day.

<!-- example: date-field/submitting-an-iso-date.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const DEFAULT_INVOICE_DATE = '2026-01-15';

export default function InvoiceForm() {
  const [invoiceDate, setInvoiceDate] = useState(DEFAULT_INVOICE_DATE);
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(JSON.stringify(Object.fromEntries(data)));
  };

  const onReset = () => {
    setInvoiceDate(DEFAULT_INVOICE_DATE);
    setSubmitted('');
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='invoice-date'>Invoice date</Label>
        <DateField format='dd.MM.yyyy' separator='.' value={invoiceDate} onChangeValue={setInvoiceDate}>
          <DateFieldInput id='invoice-date' required aria-describedby='invoice-date-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose invoice date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose invoice date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <input type='hidden' name='invoiceDate' value={invoiceDate} />
        <HelperText id='invoice-date-hint'>Used as the accounting reference date.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        <Button type='submit'>Save</Button>
      </div>
      {submitted && <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>Sent: <code>{submitted}</code></Text>}
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: date field inside a dialog

The calendar popover opens above the dialog that contains the field. The form uses `method='dialog'`, so a valid submit closes the dialog.

<!-- example: date-field/date-field-inside-a-dialog.tsx -->
```tsx
import { CSSProperties } from 'react';
import { XIcon } from '@vega-ui/icons';
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
              <DateFieldInput name='reviewDate' id='review-date' required placeholder='dd.mm.yyyy' />
              <Popover placement='bottom-end'>
                <PopoverTrigger asChild>
                  <DateFieldTriggerIconButton aria-label='Choose review date' />
                </PopoverTrigger>
                <PopoverContent>
                  <DateFieldCalendar aria-label='Choose review date'>
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
```
<!-- /example -->

### Layout/Overlay: keep the calendar open after a pick

Picking a day closes the popover and returns the focus to the trigger. To keep it open, control `open` on the `Popover` and open it again from `onChangeValue` of `DateFieldCalendar`: it runs after the field closes the popover, in the same update, so the popover never hides. Navigating months does not call it.

<!-- example: date-field/keep-calendar-open-after-pick.tsx -->
```tsx
import { useState } from 'react';
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function KeepCalendarOpenAfterPick() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='delivery-date'>Delivery date</Label>
      <DateField format='dd.MM.yyyy' separator='.'>
        <DateFieldInput id='delivery-date' placeholder='dd.mm.yyyy' />
        <Popover placement='bottom-end' open={open} onChangeOpen={setOpen}>
          <PopoverTrigger asChild>
            <DateFieldTriggerIconButton aria-label='Choose delivery date' />
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Choose delivery date' onChangeValue={() => setOpen(true)}>
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
    </div>
  );
}
```
<!-- /example -->

## Error

### Error: required and incomplete dates

`required` is a native constraint of the input, and the field makes an incomplete date invalid through `setCustomValidity`: submit fires `invalid` while the field is empty or the date is incomplete. The handler picks the message from `validity` (`valueMissing` or `customError`), `aria-invalid` on the input marks the field, and typing clears the error. The mask clamps every complete date to a real day.

<!-- example: date-field/required-and-incomplete-dates.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const HINT = 'Enter the full date as dd.mm.yyyy.';

export default function RenewalForm() {
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valueMissing) {
      setError('Enter the renewal date.');
      return;
    }

    setError('The date is incomplete. Use dd.mm.yyyy.');
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='renewal-date'>Renewal date</Label>
        <DateField format='dd.MM.yyyy' separator='.'>
          <DateFieldInput
            name='renewalDate'
            id='renewal-date'
            required
            placeholder='dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='renewal-date-hint'
            onInvalid={onInvalid}
            onInput={() => setError('')}
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose renewal date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose renewal date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='renewal-date-hint' invalid={invalid}>{invalid ? error : HINT}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: locked contract date

`disabled` on the root disables the input and the calendar trigger. The helper text explains why the date cannot be changed.

<!-- example: date-field/locked-contract-date.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function LockedContractDate() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='signed-on'>Signed on</Label>
      <DateField format='dd.MM.yyyy' separator='.' disabled defaultValue='2026-01-15'>
        <DateFieldInput id='signed-on' aria-describedby='signed-on-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateFieldTriggerIconButton aria-label='Choose signing date' />
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Choose signing date'>
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
      <HelperText id='signed-on-hint'>The contract is signed. Create an amendment to change the date.</HelperText>
    </div>
  );
}
```
<!-- /example -->

### Disabled: disabled by a fieldset

A native `<fieldset disabled>` disables the input and the trigger button inside it, so the calendar cannot open either. The checkbox toggles the whole group without passing `disabled` to the field.

<!-- example: date-field/disabled-by-fieldset.tsx -->
```tsx
import { useState } from 'react';
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
            <DateFieldInput name='shipOn' id='ship-on' placeholder='dd.mm.yyyy' />
            <Popover placement='bottom-end'>
              <PopoverTrigger asChild>
                <DateFieldTriggerIconButton aria-label='Choose shipping date' />
              </PopoverTrigger>
              <PopoverContent>
                <DateFieldCalendar aria-label='Choose shipping date'>
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
                </DateFieldCalendar>
              </PopoverContent>
            </Popover>
          </DateField>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

### Disabled: read-only date

`readOnly` on `DateFieldInput` keeps the value focusable, selectable and submitted with the form. The field has no `readOnly` of its own and `DateFieldCalendar` writes into the input even when it is read-only, so leave the calendar trigger out.

<!-- example: date-field/read-only-date.tsx -->
```tsx
import { DateField, DateFieldInput, HelperText, Label } from '@vega-ui/react';

export default function ReadOnlyDate() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='account-created'>Account created</Label>
      <DateField format='dd.MM.yyyy' separator='.' readOnly defaultValue='2024-09-02'>
        <DateFieldInput name='accountCreated' id='account-created' aria-describedby='account-created-hint' />
      </DateField>
      <HelperText id='account-created-hint'>Set by the system. The value is still submitted with the form.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: overflowing and out-of-range dates

A typed day past the end of the month is clamped to the month length, so `31.02.2026` becomes `28.02.2026`. A complete date outside `min` and `max` stays as typed and makes the input invalid, like a native date input, so `05.01.2026` is kept and `aria-invalid` marks the field. The calendar disables the same days.

<!-- example: date-field/overflowing-and-out-of-range-dates.tsx -->
```tsx
import { useState } from 'react';
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const FIRST_DAY = '2026-01-10';
const LAST_DAY = '2026-12-31';

export default function OverflowingAndOutOfRangeDates() {
  const [startDate, setStartDate] = useState('');
  const outOfRange = startDate !== '' && (startDate < FIRST_DAY || startDate > LAST_DAY);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='campaign-start'>Campaign start</Label>
        <DateField
          format='dd.MM.yyyy'
          separator='.'
          min={FIRST_DAY}
          max={LAST_DAY}
         
          value={startDate}
          onChangeValue={setStartDate}
        >
          <DateFieldInput id='campaign-start' placeholder='dd.mm.yyyy' aria-invalid={outOfRange} aria-describedby='campaign-start-hint' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose campaign start' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose campaign start'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='campaign-start-hint' invalid={outOfRange}>
          {outOfRange ? 'The campaign starts between 10.01.2026 and 31.12.2026.' : 'Between 10.01.2026 and 31.12.2026. Try 31.02.2026 or 05.01.2026.'}
        </HelperText>
      </div>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Value: {startDate ? <code>{startDate}</code> : 'no complete date'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Edge: weekends unavailable

`disabledDates` takes ISO days or a function. The calendar blocks those days, and a typed weekend makes the input invalid with the message of the browser, so the form does not submit and `[data-user-edited]:invalid` marks the field.

<!-- example: date-field/weekends-unavailable.tsx -->
```tsx
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

const isWeekend = (iso: string) => {
  const weekday = new Date(`${iso}T00:00:00Z`).getUTCDay();

  return weekday === 0 || weekday === 6;
};

export default function WeekendsUnavailable() {
  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 300 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='delivery-date'>Delivery date</Label>
        <DateField
          format='dd.MM.yyyy'
          separator='.'
          disabledDates={isWeekend}
        >
          <DateFieldInput
            id='delivery-date'
            required
            placeholder='dd.mm.yyyy'
            aria-describedby='delivery-date-hint'
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='Choose delivery date' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar aria-label='Choose delivery date'>
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
              </DateFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateField>
        <HelperText id='delivery-date-hint'>Monday to Friday only.</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Book delivery</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

### Edge: calendar popup in another locale

`locale` sets month and weekday names and the first day of the week in the calendar. The typed format still comes from `format`, and the labels of the trigger and month buttons are yours to translate.

<!-- example: date-field/calendar-popup-in-another-locale.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  HelperText,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function CalendarPopupInAnotherLocale() {
  return (
    <div lang='de-DE' style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor='liefertermin'>Liefertermin</Label>
      <DateField format='dd.MM.yyyy' separator='.' locale='de-DE'>
        <DateFieldInput id='liefertermin' placeholder='TT.MM.JJJJ' aria-describedby='liefertermin-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateFieldTriggerIconButton aria-label='Datum auswählen' />
          </PopoverTrigger>
          <PopoverContent>
            <DateFieldCalendar aria-label='Datum auswählen'>
              <CalendarHeader>
                <CalendarPrevButton aria-label='Vorheriger Monat' />
                <CalendarHeading>
                  <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                  <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                </CalendarHeading>
                <CalendarNextButton aria-label='Nächster Monat' />
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
            </DateFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateField>
      <HelperText id='liefertermin-hint'>Die Woche beginnt im Kalender am Montag.</HelperText>
    </div>
  );
}
```
<!-- /example -->
