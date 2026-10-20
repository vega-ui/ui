---
"@vega-ui/hooks": minor
"@vega-ui/utils": minor
"@vega-ui/react": minor
---

ISO string dates in `Calendar` and date fields, like native date inputs; `Calendar` follows the WAI-ARIA date picker pattern

`Calendar`:
- `value` / `defaultValue` are ISO strings: `'YYYY-MM-DD'` (single, `''` is empty), `[start, end]` (range, `''` is an unset bound), `string[]` (multiple)
- `onChange` → `onChangeValue`
- `from` / `to` → `min` / `max` (`'YYYY-MM-DD'`)
- `disabled` is now a boolean that disables the whole calendar; disabled dates moved to `disabledDates` (`string | string[] | (date: string) => boolean`)
- `date` / `defaultDate` / `onChangeDate` → `month` / `defaultMonth` / `onChangeMonth`: the visible month is given as a `'YYYY-MM-DD'` string of any day in it; `onChangeMonth` reports its first day and fires only when the month actually changes
- the visible month defaults to the month of the selected date
- `activeDay` / `defaultActiveDay` / `onChangeActiveDay` removed: keyboard focus starts on the selected day in the visible month, otherwise today, otherwise the first available day
- navigating to another month or year moves focus to the same day there, clamped to the month length and skipping unavailable days
- `referenceDate` removed from the public API
- an empty controlled value (`''`) now clears the selection
- new type export: `CalendarValue`

`DateField`, `DateTimeField`, `DateRangeField`:
- `min` / `max` are ISO strings instead of `Date` (`'YYYY-MM-DD'`; `'YYYY-MM-DDTHH:mm[:ss]'` for `DateTimeField`)
- `disabledDates` takes ISO strings
- like the WAI-ARIA date picker pattern, navigating the calendar only moves focus — the field value changes only when a day is picked, and Escape closes the calendar without changing it

Fixes:
- `Calendar`: after picking a month in the month picker, WebKit no longer jumps back to the previous month
- `Calendar`: fast scrolling no longer skips months in `onChangeMonth`, the header and keyboard focus
- `IndexedSnapScroller`: with fractional item widths, scrolling no longer gets stuck on the last item of the window
- `DateRangeFieldCalendar`: removed a leftover `console.log`

- `@vega-ui/hooks`: `useSelection` accepts `null` as an empty single selection; `useScrollSnap` updates the pending snap on instant programmatic scrolls and no longer swallows snap changes when re-measuring or committing on `scrollend`
- `@vega-ui/utils`: new `formatISODate`, `parseISODate`, `formatISODateTime`, `parseISODateTime`, `parseISODateTimestamps`, `getMonthStart`, `isSameMonth`

Breaking: the `Calendar` props above and the `min` / `max` / `disabledDates` types of the date fields change.
