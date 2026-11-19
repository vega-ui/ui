# DateRangeField Patterns

## Range Field With Popover Calendar

When to use:

- Users need one connected range field in a form or filter bar.
- The range picker should open on demand.

Composition notes:

- Keep `DateRangeFieldInput` as the primary entry surface and label it.
- Mount `DateRangeFieldCalendar` inside `PopoverContent`; the first picked day writes the start, the second the end.

Trade-offs:

- Saves layout space.
- Requires explicit incomplete-range handling: a single date is a valid entry.

<!-- example: date-range-field/booking-range-with-a-calendar-popover.tsx -->
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function BookingRangeWithACalendarPopover({ locale = 'en-US' }: { locale?: string }) {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor='stay'>Stay</Label>
      <DateRangeField locale={locale} format='dd.MM.yyyy' separator='.' defaultValue={['2026-07-10', '2026-07-14']}>
        <DateRangeFieldInput id='stay' placeholder='dd.mm.yyyy – dd.mm.yyyy' aria-describedby='stay-hint' />
        <Popover placement='bottom-end'>
          <PopoverTrigger asChild>
            <DateRangeFieldTrigger square aria-label='Choose stay dates'><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
          </PopoverTrigger>
          <PopoverContent>
            <DateRangeFieldCalendar aria-label='Choose stay dates'>
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
            </DateRangeFieldCalendar>
          </PopoverContent>
        </Popover>
      </DateRangeField>
      <HelperText id='stay-hint'>Pick the check-in day first, then the check-out day.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Range Field In Filter Drawers

When to use:

- Reporting or analytics filters live inside `Drawer` or `Sheet`.
- The range is one of several stacked filters.

Composition notes:

- Keep the field compact and explicit about range semantics.
- Test popover placement inside the parent overlay.

Trade-offs:

- Works well in dense filter UIs.
- Adds overlay coordination complexity.

<!-- example: date-range-field/range-in-a-filter-drawer.tsx -->
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

const describeFilter = ([from, to]: [string, string]) => {
  if (!from) return 'No date filter';
  if (!to) return `Created on ${from}`;

  return `Created from ${from} to ${to}`;
};

export default function RangeInAFilterDrawer() {
  const [created, setCreated] = useState<[string, string]>(['', '']);
  const [applied, setApplied] = useState<[string, string]>(['', '']);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Filters</Button>
        </DrawerTrigger>
        <DrawerContent aria-labelledby='order-filters-title' style={{ width: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='order-filters-title' as='h2' size={4} fontWeight={600}>Order filters</Heading>
            <DrawerClose asChild>
              <Button
                square
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </DrawerClose>
          </div>
          <form
            method='dialog'
            onSubmit={() => setApplied(created)}
            style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}
          >
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor='created'>Created</Label>
              <DateRangeField format='dd.MM.yyyy' separator='.' value={created} onChangeValue={setCreated}>
                <DateRangeFieldInput id='created' placeholder='dd.mm.yyyy – dd.mm.yyyy' />
                <Popover placement='bottom-end'>
                  <PopoverTrigger asChild>
                    <DateRangeFieldTrigger square aria-label='Choose creation dates'><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
                  </PopoverTrigger>
                  <PopoverContent>
                    <DateRangeFieldCalendar aria-label='Choose creation dates'>
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
                    </DateRangeFieldCalendar>
                  </PopoverContent>
                </Popover>
              </DateRangeField>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
              <Button type='submit'>Show orders</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
      <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>
        {describeFilter(applied)}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Range Field For Validation-Heavy Reporting Forms

When to use:

- The range is required before export or report generation.
- The product needs explicit error copy for incomplete or blocked ranges.

Composition notes:

- Use native `required` for presence; the field makes a one-sided, out-of-range, or unavailable range invalid itself, and a reversed range is swapped.
- `disabledDates` applies only to the calendar, so align it with backend reporting rules and repeat it on submit.

Trade-offs:

- Stronger validation clarity.
- The input submits the shown text; submit the ISO start and end through hidden inputs of your own, as in [Form/Integration](./examples.md#formintegration).

<!-- example: date-range-field/both-dates-required.tsx -->
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTrigger,
  HelperText,
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

const HINT = 'Choose the first and the last day of coverage.';

export default function CoverageForm() {
  const [error, setError] = useState('');
  const invalid = error !== '';

  const onInvalid = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valueMissing) {
      setError('Choose the coverage period.');
      return;
    }

    setError('Add the end date of the coverage period.');
  };

  return (
    <form onSubmit={(event) => event.preventDefault()} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='coverage'>Coverage period</Label>
        <DateRangeField format='dd.MM.yyyy' separator='.' rangeSeparator=' - '>
          <DateRangeFieldInput
            name='coverage'
            id='coverage'
            required
            placeholder='dd.mm.yyyy - dd.mm.yyyy'
            aria-invalid={invalid}
            aria-describedby='coverage-hint'
            onInvalid={onInvalid}
            onInput={() => setError('')}
          />
          <Popover placement='bottom-end'>
            <PopoverTrigger asChild>
              <DateRangeFieldTrigger square aria-label='Choose coverage period'><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
            </PopoverTrigger>
            <PopoverContent>
              <DateRangeFieldCalendar aria-label='Choose coverage period'>
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
              </DateRangeFieldCalendar>
            </PopoverContent>
          </Popover>
        </DateRangeField>
        <HelperText id='coverage-hint' invalid={invalid}>{invalid ? error : HINT}</HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->
