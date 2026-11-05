# DateField Patterns

## Date Field With Popover Calendar

When to use:

- A standard form field should allow both typing and picking.
- The calendar should appear on demand instead of staying visible.

Composition notes:

- Keep `DateFieldInput` as the primary surface and label it.
- Mount `DateFieldCalendar` inside `PopoverContent` and use `DateFieldTriggerIconButton` with an `aria-label` as the trigger.

Trade-offs:

- Saves layout space.
- Requires overlay testing inside dialogs, drawers, and scroll containers.

<!-- example: date-field/typed-date-with-a-calendar-popover.tsx -->
```tsx
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
      <HelperText id='due-date-hint'>Type the date as dd.mm.yyyy or pick it in the calendar.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Date Field In Validation-Heavy Forms

When to use:

- The date must participate in submit validation.
- Error copy and helper text matter more than visual calendar exploration.

Composition notes:

- Use native `required` and `pattern` on `DateFieldInput` for presence and completeness; `min` and `max` are already enforced while typing.
- `disabledDates` is enforced only in the calendar, so repeat that rule in submit validation.
- Show the error with `error` on the root and `HelperText error`, linked through `aria-describedby`.

Trade-offs:

- Native constraint validation with no extra library.
- `name` on the input submits the typed text; to submit the ISO day, mirror `onChangeValue` into a hidden input as in [Form/Integration](./examples.md#formintegration).

<!-- example: date-field/required-and-incomplete-dates.tsx -->
```tsx
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
        <DateField format='dd.MM.yyyy' separator='.' error={invalid}>
          <DateFieldInput
            id='renewal-date'
            name='renewalDate'
            required
            pattern='\d{2}\.\d{2}\.\d{4}'
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
        <HelperText id='renewal-date-hint' error={invalid}>{invalid ? error : HINT}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Date Field Inside Modal Workflows

When to use:

- Scheduling or review flows live inside `Dialog`, `Drawer`, or `Sheet`.
- The calendar still needs on-demand access.

Composition notes:

- Test focus, dismissal, and stacking with the parent overlay.
- Keep the calendar compact enough for the parent container.

Trade-offs:

- Preserves the existing modal flow.
- Increases overlay coordination complexity.

<!-- example: date-field/date-field-inside-a-dialog.tsx -->
```tsx
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
```
<!-- /example -->

## Date Field In A Non-Gregorian Calendar

When to use:

- Users type and read dates in a Persian, Hebrew, Japanese, Buddhist, Islamic, or other calendar.

Composition notes:

- Create the calendar once with `createCalendarSystem`, outside the component (see [Dates And Calendar Systems](../../i18n.md#calendar-system-adapter)), and pass it to the `calendar` prop of the root, together with `locale`.
- Typing is validated in that calendar, for example day 31 of Persian month 6 or Hebrew month 13; `min` and `max` stay ISO `YYYY-MM-DD` strings.

Trade-offs:

- Native month lengths and leap months without changing the stored value.
- Month lengths and eras come from the `Intl` data of the runtime.

<!-- example: date-field/date-field-in-a-non-gregorian-calendar.tsx -->
```tsx
import { useState } from 'react';
import { createCalendarSystem } from '@vega-ui/i18n';
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

const persianCalendar = createCalendarSystem('persian');

export default function DateFieldInANonGregorianCalendar() {
  const [date, setDate] = useState('2026-03-21');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='persian-date'>تاریخ تحویل</Label>
        <DateField
          format='yyyy/MM/dd'
          separator='/'
          calendar={persianCalendar}
          locale='fa-IR'
          min='2026-03-21'
          value={date}
          onChangeValue={setDate}
        >
          <DateFieldInput id='persian-date' placeholder='yyyy/mm/dd' />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateFieldTriggerIconButton aria-label='انتخاب تاریخ' />
            </PopoverTrigger>
            <PopoverContent>
              <DateFieldCalendar>
                <CalendarHeader>
                  <CalendarPrevButton aria-label='ماه قبل' />
                  <CalendarViewButtonGroup>
                    <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                    <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
                  </CalendarViewButtonGroup>
                  <CalendarNextButton aria-label='ماه بعد' />
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
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>
        Stored value: {date ? <code>{date}</code> : 'no complete date'}
      </Text>
    </div>
  );
}
```
<!-- /example -->
