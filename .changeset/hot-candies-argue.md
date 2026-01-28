---
"@vega-ui/hooks": minor
"@vega-ui/utils": minor
"@vega-ui/react": minor
---

# Adding New Components

## DateField
- A date input field with masking and format validation.
- Uses `useControlledState` for controlled/uncontrolled values.
- Composed of the following components:
    - `DateFieldInput`
    - `DateFieldCalendar`
- Supports date formats (e.g., "dd.MM.yyyy", "MM/dd/yyyy").
- Supports minimum and maximum date restrictions (`minDate`, `maxDate`).

## DateTimeField
- A date and time input field.
- Combines the logic of `DateField` and `TimeField`.
- Composed of the following components:
    - `DateTimeFieldInput`
    - `DateTimeFieldCalendar`
    - `TimeSelector` (for selecting time)
- Uses `useControlledState`.

## DateRangeField
- A field for selecting a date range.
- Composed of the following components:
    - Two `DateField`s (start and end dates)
    - `DateRangeCalendar` (calendar for selecting the range)
- Handles range validation (start date ≤ end date).
- Uses `useControlledState`.

## TimeField
- A time input field.
- Supports masking and time format (e.g., "HH:mm").
- Uses `useControlledState`.
- Composed of the following components:
    - `TimeFieldInput`
    - Additional controls (arrows, time selector)
