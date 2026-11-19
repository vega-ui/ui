# DateRangeField Styling

## Overview

`DateRangeField` styling is split across the inherited `TextField` surface, the popover-mounted calendar, and a small local contract on `DateRangeFieldTrigger`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--button-height` | `DateRangeFieldTrigger` | Keeps the trigger aligned with input height. |
| `--button-color` | `DateRangeFieldTrigger` | Trigger icon color. |
| `--button-background-color-hover` | `DateRangeFieldTrigger` | Hover background for the trigger. |
| `--button-color-hover` | `DateRangeFieldTrigger` | Trigger icon color on hover. |
| `--button-color-active` | `DateRangeFieldTrigger` | Trigger icon color while pressed. |
| `--button-background-color-active` | `DateRangeFieldTrigger` | Trigger background while pressed. |

## Part-Level Variables

- `DateRangeField`: inherits most visuals from `TextField`.
- `DateRangeFieldInput`: follows the same field surface model as other text-entry controls.
- `DateRangeFieldTrigger`: uses local button variables backed by theme tokens.
- `DateRangeFieldCalendar`: follows `Calendar` and `Popover` styling contracts.

## State And Variant Interaction

- Disabled state should dim the input and trigger together.
- Error styling should come from the surrounding field state instead of one-off trigger overrides.
- Range-specific styling should remain legible when both start and end values are partially filled.
- The error look follows `aria-invalid='true'`, `:user-invalid` or `[data-user-edited]:invalid` on `DateRangeFieldInput`.

`DateRangeField` writes the text of `DateRangeFieldInput` itself, and Chromium and WebKit do not count that text as an edit of the user, so the input does not match `:user-invalid` after it. In your own CSS, pair `:user-invalid` with `[data-user-edited]:invalid`:

```css
.stay-dates:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

## Examples

<!-- example: date-range-field/examples.css -->
```css
.analyticsRangeTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```
<!-- /example -->

<!-- example: date-range-field/styling-examples.css -->
```css
.compactRangeTrigger {
  --button-height: 32px;
}
```
<!-- /example -->

The icon of `DateRangeFieldTrigger` is its children, so any icon fits; with `square` the button keeps its size and states, and the `aria-label` keeps its name.

<!-- example: date-range-field/custom-trigger-icon.tsx -->
```tsx
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
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

export default function CustomTriggerIcon() {
  return (
    <DateRangeField format='dd.MM.yyyy' separator='.' style={{ width: '100%', maxWidth: 320 }}>
      <DateRangeFieldInput aria-label='Trip dates' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateRangeFieldTrigger square aria-label='Choose dates'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateRangeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar aria-label='Choose dates'>
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

## Do Not Override

- Do not hide focus or invalid states with custom trigger colors.
- Do not restyle the calendar in this layer; that belongs to `Calendar` and `Popover`.
- Do not replace semantic theme tokens with raw palette values in field-level overrides.
