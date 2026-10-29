---
"@vega-ui/react": major
"@vega-ui/utils": minor
---

`TimeField` keeps its value on the root like the other masked fields:

- **Breaking:** `TimeField` takes `value`, `defaultValue` and `onChangeValue` as a `HH:mm` time (`HH:mm:ss` when the format has seconds), `''` while the text is empty or incomplete; `TimeFieldInput` no longer takes `value` and `defaultValue`. A form reset restores `defaultValue` unless the field is controlled
- **Breaking:** `format` uses the notation of `DateTimeField.timeFormat`: `'HH:mm' | 'HH:mm:ss'` instead of `'HH:MM' | 'HH:MM:SS'`
- **Breaking:** `min` and `max` bound the whole time like a native `<input type="time">`: a complete time outside them is replaced by the nearest bound, instead of bounding each segment separately; invalid bounds are ignored
- ArrowUp / ArrowDown step the hours by one and the minutes or seconds under the caret by `step`, like `DateTimeField`; digits of other numbering systems are accepted

`@vega-ui/utils`: new `parseTemplateTime`, `formatTemplateTime` and `normalizeTemplateTime` for times typed by a `HH:MM[:SS]` template, and `isISOTime`, a check for `HH:mm[:ss]` strings
