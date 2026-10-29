---
"@vega-ui/react": patch
---

Table, Calendar, CalendarBase, DayPicker, YearPicker, AvatarStack and Switch use `--spacing-*` tokens instead of hardcoded pixel spacing, so they follow a customized `--spacing` scale. No visual change with the default tokens.
