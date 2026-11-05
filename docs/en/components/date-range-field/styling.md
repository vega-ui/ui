# DateRangeField Styling

## Overview

`DateRangeField` styling is split across the inherited `TextField` surface, the popover-mounted calendar, and a small local contract on `DateRangeFieldTriggerIconButton`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-button-size` | `DateRangeFieldTriggerIconButton` | Keeps the trigger aligned with input height. |
| `--button-color` | `DateRangeFieldTriggerIconButton` | Trigger icon color. |
| `--button-background-color-hover` | `DateRangeFieldTriggerIconButton` | Hover background for the trigger. |
| `--button-color-hover` | `DateRangeFieldTriggerIconButton` | Trigger icon color on hover. |
| `--button-color-active` | `DateRangeFieldTriggerIconButton` | Trigger icon color while pressed. |
| `--button-background-color-active` | `DateRangeFieldTriggerIconButton` | Trigger background while pressed. |

## Part-Level Variables

- `DateRangeField`: inherits most visuals from `TextField`.
- `DateRangeFieldInput`: follows the same field surface model as other text-entry controls.
- `DateRangeFieldTriggerIconButton`: uses local button variables backed by theme tokens.
- `DateRangeFieldCalendar`: follows `Calendar` and `Popover` styling contracts.

## State And Variant Interaction

- Disabled state should dim the input and trigger together.
- Error styling should come from the surrounding field state instead of one-off trigger overrides.
- Range-specific styling should remain legible when both start and end values are partially filled.

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
  --icon-button-size: 32px;
}
```
<!-- /example -->

Children of `DateRangeFieldTriggerIconButton` replace its default calendar icon; the button keeps its size, states and accessible name.

<!-- example: date-range-field/custom-trigger-icon.tsx -->
```tsx
import { CalendarDaysIcon } from '@vega-ui/icons';
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
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
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
          <DateRangeFieldTriggerIconButton aria-label='Choose dates'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateRangeFieldTriggerIconButton>
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar>
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
