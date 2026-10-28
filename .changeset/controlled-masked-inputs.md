---
"@vega-ui/react": major
"@vega-ui/utils": minor
---

The value of the masked fields moves to the root, like `Slider`: the input part only shows it, so a controlled field keeps every keystroke and follows a value changed outside.

- **Breaking:** `NumberField` takes `value`, `defaultValue` and `onChangeValue` as a number, `NaN` for an empty field; `NumberFieldInput` no longer takes `value` and `defaultValue`
- **Breaking:** `PhoneField` takes `value`, `defaultValue` and `onChangeValue` as the text of the number; `PhoneFieldInput` no longer takes `value` and `defaultValue`. The country of `defaultValue` is selected unless `code` is set
- **Breaking:** `DateField` takes `value`, `defaultValue` and `onChangeValue` as a `YYYY-MM-DD` day, `DateTimeField` as a `YYYY-MM-DDTHH:mm[:ss]` timestamp, `DateRangeField` as a `[start, end]` tuple of days; `''` while the text is empty or incomplete. Their input parts no longer take `value` and `defaultValue`
- the input parts still fire their own `onChange` and `onInput` on every edit of the text, and `name` still submits the text
- a form reset restores `defaultValue` unless the field is controlled
- the increment and decrement buttons of `NumberField` follow changes of `min` and `max`
- **Breaking for custom parts:** the contexts of these fields expose the shown `text` and `changeText` instead of `setText`, `detectCode` and `changeDate` / `changeTime`

`@vega-ui/utils`: new `formatTemplateRange(calendar, [start, end], template, separator)`, the counterpart of `parseTemplateRange`.
