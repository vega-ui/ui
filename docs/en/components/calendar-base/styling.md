# CalendarBase Styling

## Overview

`CalendarBase` styling is mostly layout-driven. It sets the outer shell and lets shared controls inherit size and variant through context rather than exposing a large component-local CSS API.

## Public CSS Variables

There are no significant public `--calendar-base-*` variables in the current implementation.

The shared parts primarily consume existing system tokens:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--spacing-6` | root gap | vertical spacing between calendar sections |
| `--label-tertiary` | weekday label | muted weekday tone |
| `--spacing-18` | weekday label | minimum label height |

For the theme layer behind these values, see [Themes](../../styling/themes.md) and [Tokens](../../styling/tokens.md).

## Part-Level Variables

### Root

Uses grid layout and optional `compact` width behavior.

### Header

Uses flex row layout with small padding.

### Week Labels

Use a 7-column grid and centered muted text.

`CalendarBasePickerButton` and `CalendarBaseControlIconButton` mostly inherit their visual contract from shared button primitives.

## State And Variant Interaction

- Size and variant flow into the shared button and text primitives through context.
- `compact` constrains width to `min-content`.
- `CalendarBase` should stay visually aligned with the picker layer rendered inside it rather than introducing a separate visual theme.

## Examples

### Size and variant through context

`size` and `variant` are set once on `CalendarBase` and reach the header buttons and the weekday labels through context. The embedded picker does not read that context, so it gets the same `size` and `variant` itself.

<!-- example: calendar-base/size-and-variant.tsx -->
```tsx
import {
  CalendarBase,
  CalendarBaseControlIconButton,
  CalendarBaseHeader,
  CalendarBasePickerButton,
  CalendarBaseWeekLabel,
  CalendarBaseWeekLabels,
  DayPicker,
  DayPickerCell,
  DayPickerLayout,
  Icon,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { useState } from 'react';

const LOCALE = 'en-US';
const WEEK_START = 0;
const TODAY_MONTH = '2026-11-01';
const weekdayFormat = new Intl.DateTimeFormat(LOCALE, { weekday: 'short', timeZone: 'UTC' });
const monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric', timeZone: 'UTC' });
const weekdays = Array.from({ length: 7 }, (_, index) => weekdayFormat.format(Date.UTC(2026, 10, 1 + WEEK_START + index)));

function addMonths(month: string, amount: number) {
  const date = new Date(month);
  date.setUTCMonth(date.getUTCMonth() + amount);

  return date.toISOString().slice(0, 10);
}

export default function SizeAndVariant() {
  const [month, setMonth] = useState(TODAY_MONTH);
  const [active, setActive] = useState(TODAY_MONTH);

  const showMonth = (next: string) => {
    setMonth(next);
    setActive(next);
  };

  return (
    <CalendarBase compact size='md' variant='primary'>
      <CalendarBaseHeader>
        <CalendarBaseControlIconButton aria-label='Previous month' onClick={() => showMonth(addMonths(month, -1))}>
          <Icon><ChevronLeft /></Icon>
        </CalendarBaseControlIconButton>
        <CalendarBasePickerButton aria-label={`${monthFormat.format(new Date(month))}, back to ${monthFormat.format(new Date(TODAY_MONTH))}`} onClick={() => showMonth(TODAY_MONTH)}>
          {monthFormat.format(new Date(month))}
        </CalendarBasePickerButton>
        <CalendarBaseControlIconButton aria-label='Next month' onClick={() => showMonth(addMonths(month, 1))}>
          <Icon><ChevronRight /></Icon>
        </CalendarBaseControlIconButton>
      </CalendarBaseHeader>
      <DayPicker
        aria-label={monthFormat.format(new Date(month))}
        locale={LOCALE}
        month={month}
        size='md'
        variant='primary'
        active={active}
        onChangeActive={setActive}
        defaultSelected='2026-11-18'
      >
        <CalendarBaseWeekLabels>
          {weekdays.map((weekday) => (
            <CalendarBaseWeekLabel key={weekday}>{weekday}</CalendarBaseWeekLabel>
          ))}
        </CalendarBaseWeekLabels>
        <DayPickerLayout weekStartsOn={WEEK_START}>
          <DayPickerCell />
        </DayPickerLayout>
      </DayPicker>
    </CalendarBase>
  );
}
```
<!-- /example -->

## Do Not Override

- inventing a separate calendar-base token API when the implementation relies mostly on shared primitives
- styling base parts in ways that break consistency with the rest of the calendar family
