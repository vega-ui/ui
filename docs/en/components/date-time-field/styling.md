# DateTimeField Styling

## Overview

`DateTimeField` styling is split across the inherited `TextField` surface, the popover-mounted calendar, and a small local contract on `DateTimeFieldTriggerIconButton`.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--icon-button-size` | `DateTimeFieldTriggerIconButton` | Keeps the trigger aligned with input height. |
| `--button-color` | `DateTimeFieldTriggerIconButton` | Trigger icon color. |
| `--button-background-color-hover` | `DateTimeFieldTriggerIconButton` | Hover background for the trigger. |
| `--button-color-hover` | `DateTimeFieldTriggerIconButton` | Trigger icon color on hover. |
| `--button-color-active` | `DateTimeFieldTriggerIconButton` | Trigger icon color while pressed. |
| `--button-background-color-active` | `DateTimeFieldTriggerIconButton` | Trigger background while pressed. |

## Part-Level Variables

- `DateTimeField`: inherits most visuals from `TextField`.
- `DateTimeFieldInput`: follows the same field surface model as other text-entry controls.
- `DateTimeFieldTriggerIconButton`: uses local button variables backed by theme tokens.
- `DateTimeFieldCalendar`: follows `Calendar` and `Popover` styling contracts.

## State And Variant Interaction

- Disabled state should dim the input and trigger together.
- Error styling should come from the surrounding field state.
- Time-specific semantics should remain readable even when the control is compressed into dense forms.

## Examples

<!-- example: date-time-field/examples.css -->
```css
.scheduleTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```
<!-- /example -->

<!-- example: date-time-field/styling-examples.css -->
```css
.compactScheduleTrigger {
  --icon-button-size: 32px;
}
```
<!-- /example -->

Children of `DateTimeFieldTriggerIconButton` replace its default calendar icon; the button keeps its size, states and accessible name.

<!-- example: date-time-field/custom-trigger-icon.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function CustomTriggerIcon() {
  return (
    <DateTimeField dateFormat='dd.MM.yyyy' dateSeparator='.' style={{ width: '100%', maxWidth: 320 }}>
      <DateTimeFieldInput aria-label='Pickup' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTriggerIconButton aria-label='Choose date'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateTimeFieldTriggerIconButton>
        </PopoverTrigger>
        <PopoverContent>
          <DateTimeFieldCalendar>
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
          </DateTimeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}
```
<!-- /example -->

## Do Not Override

- Do not hide focus or invalid states with custom trigger colors.
- Do not use this file to restyle the calendar layer; use `Calendar` and `Popover` contracts instead.
- Do not replace semantic theme tokens with raw palette values in field-level overrides.
