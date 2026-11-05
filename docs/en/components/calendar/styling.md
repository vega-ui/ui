# Calendar Styling

## Overview

`Calendar` styling is distributed across header controls, content sizing, and the day, month, and year views. Most customization should start at the theme level.

## Public CSS Variables

The current implementation exposes more sizing and layout behavior than stable `--calendar-*` hooks. Treat theme tokens and documented size props as the primary styling surface.

| Variable | Used By | Purpose |
| --- | --- | --- |
| spacing tokens | `CalendarContent` | size-dependent layout width |
| transition tokens | views and nav buttons | animated view changes |
| button tokens | view buttons | inherited button-like sizing |

## Part-Level Variables

### Content

`CalendarContent` derives min-width from spacing tokens per size.

### Navigation Buttons

Navigation buttons rely on transition tokens and shared button styling patterns.

### Views

`CalendarDays`, `CalendarMonths`, and `CalendarYears` animate view changes through shared transition tokens.

## State And Variant Interaction

- `compact` changes density expectations
- size changes the content width and view spacing
- custom day templates affect perceived density more than root styling does

## Examples

### Theme-first calendar tuning

<!-- example: calendar/theme-first-calendar-tuning.css -->
```css
.brand-theme {
  --surface-primary: var(--color-orange-0);
  --focus-color: var(--color-orange-accent-400);
}
```
<!-- /example -->

### Dense embedded calendar

`compact` shrinks the root to its content, and `size` and `variant` on the root reach every part through context. Shorter formats (`format='short'` on the month label and months, `format='narrow'` on the weekdays) keep the header and the month view inside the narrow width.

<!-- example: calendar/dense-embedded-calendar.tsx -->
```tsx
import {
  Calendar,
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
} from '@vega-ui/react';

export default function DenseEmbeddedCalendar() {
  return (
    <Calendar compact size='xs' variant='primary' locale='en-US' defaultValue='2026-11-18'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel format='short' /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Days'>
          <CalendarWeekdays format='narrow'>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarMonths cols={4} format='short'>
          <CalendarMonth />
        </CalendarMonths>
        <CalendarYears>
          <CalendarYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Do Not Override

- do not invent undocumented `--calendar-*` variables as if they were public API
- do not restyle custom date cells in a way that hides focus or disabled state
