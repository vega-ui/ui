# DateRangeField

## Doc Profile

`advanced interactive`

## Summary

`DateRangeField` is a [compound component](../../glossary.md#compound-component) for connected start and end date entry that combines typed range input, optional calendar selection, and shared range validation. It is the field-first range layer when one business concept owns both dates.

## Imports

```tsx
import {
  DateRangeField,
  DateRangeFieldInput,
  DateRangeFieldCalendar,
  DateRangeFieldTrigger,
  type DateRangeFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `DateRangeFieldProps`
- `DateRangeFieldInputProps`
- `DateRangeFieldCalendarProps`
- `DateRangeFieldTriggerProps`

## Minimal Composition

<!-- example: date-range-field/minimal-composition.tsx -->
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
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <DateRangeField format='dd.MM.yyyy' separator='.' style={{ width: '100%', maxWidth: 320 }}>
      <DateRangeFieldInput aria-label='Trip dates' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateRangeFieldTrigger square aria-label='Choose trip dates'><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar aria-label='Choose trip dates'>
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
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyDateRangeField` passes its props to `DateRangeField`, its `id` and `name` to the input, and takes the names of the calendar button and the month buttons as props. See [Component recipes](../../recipes.md).

<!-- example: date-range-field/recipe.tsx -->
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
  Icon,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type DateRangeFieldProps,
} from '@vega-ui/react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyDateRangeFieldProps extends DateRangeFieldProps {
  name?: string
  calendarLabel: string
  previousLabel: string
  nextLabel: string
}

export function MyDateRangeField({ id, name, calendarLabel, previousLabel, nextLabel, ...props }: MyDateRangeFieldProps) {
  return (
    <DateRangeField {...props}>
      <DateRangeFieldInput id={id} name={name} />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateRangeFieldTrigger square aria-label={calendarLabel}><Icon><CalendarIcon /></Icon></DateRangeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar aria-label={calendarLabel}>
            <CalendarHeader>
              <CalendarPrevButton square aria-label={previousLabel}><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarHeading>
              <CalendarNextButton square aria-label={nextLabel}><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
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
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Stay</Label>
      <MyDateRangeField
        id={id}
        name='stay'
        format='dd.MM.yyyy'
        separator='.'
        defaultValue={['2026-07-10', '2026-07-14']}
        calendarLabel='Choose stay dates'
        previousLabel='Previous month'
        nextLabel='Next month'
      />
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `DateRangeField`: root state and range-format owner
- `DateRangeFieldInput`: typed range entry surface

## Optional Parts

- `DateRangeFieldTrigger`: calendar trigger affordance
- `DateRangeFieldCalendar`: visual range picker content, usually mounted in `Popover`

## Composition Order

1. `DateRangeField`
2. `DateRangeFieldInput`
3. `Popover`
4. `DateRangeFieldTrigger`
5. `DateRangeFieldCalendar`

## Variants

- Input-only versus input-plus-calendar composition
- Compact filter range versus fuller booking range flows
- Constraint-driven range state through `min`, `max`, and `disabledDates`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)
- Locale and calendar system: `locale` and `calendar` root props, defaulting to `"en-US"` and the Gregorian calendar; see [Dates And Calendar Systems](../../i18n.md#locale-and-calendar-props)

## Edge Cases

- Partial ranges are expected during editing and need explicit handling.
- Range semantics such as inclusive booking days or reporting cutoffs belong to the consumer.
- Overlay behavior should be tested inside filters, drawers, and other stacked layouts.
- Typed range parsing, visual blocked days, and final business validation should stay aligned instead of becoming separate rule systems.

## Common Mistakes

- Passing `Date` objects or display-format strings to `min` / `max` instead of ISO `YYYY-MM-DD` strings.
- Treating the start and end date as unrelated values.
- Leaving the meaning of the range ambiguous in labels or helper text.
- Relying on visual calendar blocking without matching validation rules.
