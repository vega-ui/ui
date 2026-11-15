---
"@vega-ui/react": major
---

`TimeField`, `DateField`, `DateTimeField`, `DateRangeField`, `PinField`, `NumberField` and `PhoneField` run on `@vega-ui/core` widgets, with the same markup, look and typing: the widget masks every edit before the browser applies it, and `@maskito/core`, `@maskito/kit`, `@maskito/phone` and `@maskito/react` are no longer dependencies.

- the input parts still fire their own `onChange` and `onInput` on every edit of the text, also on one the mask corrected or ArrowUp / ArrowDown made
- a text the browser enters without an edit, like autofill, is calibrated by the same mask
- picking a day in the calendar writes the text like typing does and dispatches `input` and `change`, like a native date picker; a read-only input keeps its text
- a controlled field shows an edit that changes its value once the parent accepts the value, so a character the parent rejects never reaches the input
- `PinField` moves the caret between slots by the logical direction, so in a right-to-left field ArrowLeft selects the next slot
- `NumberField` groups, clamps and pads the number as before, steps it with the arrows, the wheel and the buttons with `input` and `change` like a native number input, and keeps the page from scrolling while the wheel steps a focused field
- `PhoneField` formats the number by the template of its country as before, keeps a collapsed caret after the calling code of a strict mask, and writes the calling code of a selected country with `input` and `change`
- **Breaking:** `TimeField`, `DateField`, `DateTimeField` and `DateRangeField` keep a typed value outside `min` and `max` and make the input invalid through `setCustomValidity`, like a native date or time input, instead of replacing it with the nearest bound; a change of `min` or `max` changes only the validity, without `input` or `onChangeValue`, and a controlled value outside them is shown as it is. `TimeFieldInput` is invalid for an incomplete time or one outside `min` and `max`, like the date inputs. A parent that wants a dependent field to follow another, like a check-out after a check-in, sets its value in `onChangeValue` of the first
- ArrowUp / ArrowDown in `TimeField` and `DateTimeField` stop at `min` and `max` instead of stepping past them
- a change of `format`, `separator`, `calendar` or another option of a masked field shows the value by the new options without changing it or calling `onChangeValue`, like a native input whose attribute changes
- **Breaking:** the `precision` prop of `NumberField` is removed, it never had an effect; `maximumFractionDigits` limits the digits after the decimal point
- **Breaking for custom parts:** `useNumberFieldContext()` returns `handle` instead of `text`, `changeText` and `inputRef`
- **Breaking for custom parts:** `usePinFieldContext()` returns `handle`, `size`, `placeholder`, `disabled`, `error` and `maxLength`; the code, the active slot and the select-all state are read from `handle` with `useSnapshot` instead of `value`, `active`, `selectedAll`, `setValue`, `setActive`, `setSelectedAll`, `syncActive`, `inputRef` and `innerInputRef`
- **Breaking for custom parts:** `usePhoneFieldContext()` returns `handle` instead of `inputRef`, `phone`, `changePhone`, `code` and `onSelectValue`; the country is read from `handle` with `useSnapshot`
