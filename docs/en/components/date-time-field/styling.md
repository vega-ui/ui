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
- The error look follows `aria-invalid='true'`, `:user-invalid` or `[data-user-edited]:invalid` on `DateTimeFieldInput`.

`DateTimeField` writes the text of `DateTimeFieldInput` itself, and Chromium and WebKit do not count that text as an edit of the user, so the input does not match `:user-invalid` after it. In your own CSS, pair `:user-invalid` with `[data-user-edited]:invalid`:

```css
.meeting-start:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

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
          <DateTimeFieldCalendar aria-label='Choose date'>
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
