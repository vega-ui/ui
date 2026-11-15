# Calendar Troubleshooting

## Selection Value Shape Feels Wrong

### Symptom

The component renders, but the integration state shape does not match expectations.

### Likely Cause

`selection` mode was changed without updating the parent value model.

### How To Verify

- inspect `selection`
- inspect the current `value` shape

### Fix

- treat `single`, `multiple`, and `range` as different value contracts

## Disabled Dates Still Feel Selectable

### Symptom

Users can still navigate to or interact with dates that should be unavailable.

### Likely Cause

A custom day template renders its own element instead of `CalendarDay`, so disabled and excluded behavior is lost.

### How To Verify

- compare the custom template with a plain `<CalendarDay />`
- test both pointer and keyboard interaction

### Fix

- render the custom content inside `CalendarDay`, which keeps disabled and excluded state handling

## Custom Calendar Content Breaks Navigation

### Symptom

Switching between day, month, and year views becomes inconsistent.

### Likely Cause

Views or header controls were rebuilt as if they were unrelated components.

### How To Verify

- test view switching in the real customized composition

### Fix

- return to the standard `CalendarHeader` plus `CalendarContent` structure first
- reintroduce custom parts incrementally

## Calendar Stays Active Inside A Disabled Fieldset

### Symptom

The calendar is inside `<fieldset disabled>`, but its days, the navigation and the view buttons still respond.

### Likely Cause

`Calendar` intentionally does not follow `<fieldset disabled>`. It is not a form control: it has no `name` and submits nothing, so the fieldset has no effect on it.

### How To Verify

- check whether the calendar receives `disabled`
- compare with a field inside the same fieldset

### Fix

- pass `disabled` to `Calendar`, for example from the same state that disables the fieldset
- in a field such as `DateField`, the input and the trigger button follow the fieldset, so the calendar popup cannot be opened

## Wrong Month Or Hydration Mismatch On The Server

### Symptom

A prerendered or server-rendered page shows a different month than expected, the month changes right after hydration, or there is no `aria-current="date"` day in the first HTML.

### Likely Cause

`Calendar` reads nothing from the environment during render. Without `today`, it learns today from the device only after hydration, so the server and the first client render match. Without `value`, `defaultValue`, `defaultFocusedDate` or `today`, the server has no day to show, and the month appears after hydration.

### How To Verify

- look at the server HTML of the page
- check which of `value`, `defaultValue`, `focusedDate`, `defaultFocusedDate` and `today` the calendar receives

### Fix

- pass `today` (for example from the request time in the user's time zone) when the server must render the current month and mark today
- pass `defaultFocusedDate` (or a value) when the page should open on a known month, such as a statically exported page
- pass `locale` explicitly; without it the calendar uses `"en-US"` on both sides

## Min Or Max Stays On Yesterday After Midnight

### Symptom

The page stays open past midnight or across time zones: today moves to the new day, but the days before it are still available, or the new day is still disabled.

### Likely Cause

Without `today`, the calendar follows the date of the device: it checks it every minute and when the page becomes visible again. `min` and `max` are your values: a `min` computed once from the date at render keeps that date.

### How To Verify

- check where `min` and `max` come from and when they are computed

### Fix

- compute `min` and `max` from the same today you show, and update them when it changes
- pass `today` yourself when the app decides what today is, for example in the time zone of a hotel, and update it together with `min` and `max`
