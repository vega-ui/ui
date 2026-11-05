# DateField Styling

## Overview

`DateField` styling is split across the inherited `TextField` surface, the optional popover-mounted calendar, and a small local contract on `DateFieldTriggerIconButton`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-button-size` | `DateFieldTriggerIconButton` | Keeps the trigger aligned with input height. |
| `--button-color` | `DateFieldTriggerIconButton` | Trigger icon color. |
| `--button-background-color-hover` | `DateFieldTriggerIconButton` | Hover background for the trigger. |
| `--button-color-hover` | `DateFieldTriggerIconButton` | Trigger icon color on hover. |
| `--button-color-active` | `DateFieldTriggerIconButton` | Trigger icon color while pressed. |
| `--button-background-color-active` | `DateFieldTriggerIconButton` | Trigger background while pressed. |

## Part-Level Variables

- `DateField`: inherits most field visuals from `TextField`.
- `DateFieldInput`: uses the same field surface and text treatment as other text-entry controls.
- `DateFieldTriggerIconButton`: defines local button variables that reference theme tokens such as `--text-color` and `--fills-quaternary-hover`.
- `DateFieldCalendar`: mostly follows `Calendar` and `Popover` styling contracts instead of a separate field-local variable set.

## State And Variant Interaction

- `disabled` should dim both typed input and trigger affordance consistently.
- Error styling should come from the surrounding field state instead of ad-hoc trigger overrides.
- Theme-level tokens should drive the look before any component-local overrides.

## Examples

<!-- example: date-field/examples.css -->
```css
.billingDateFieldTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```
<!-- /example -->

<!-- example: date-field/styling-examples.css -->
```css
.compactDateFieldTrigger {
  --icon-button-size: 32px;
}
```
<!-- /example -->

Children of `DateFieldTriggerIconButton` replace its default calendar icon; the button keeps its size, states and accessible name.

<!-- example: date-field/custom-trigger-icon.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTriggerIconButton,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function CustomTriggerIcon() {
  return (
    <DateField format='dd.MM.yyyy' separator='.'>
      <DateFieldInput aria-label='Invoice date' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTriggerIconButton aria-label='Choose date'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateFieldTriggerIconButton>
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
  );
}
```
<!-- /example -->

## Do Not Override

- Do not force trigger colors that hide focus or invalid states.
- Do not restyle the calendar here; use `Calendar` or `Popover` contracts for that layer.
- Do not replace semantic theme tokens with raw palette values inside field-level overrides.
