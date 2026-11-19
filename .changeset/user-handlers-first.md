---
"@vega-ui/react": major
---

- **Breaking:** the parts below call your handler before their own, and `event.preventDefault()` in it skips their own, like on the other parts of the library: `onClick` of `NumberFieldIncrementButton`, `NumberFieldDecrementButton`, `PasswordFieldToggle`, `CalendarPrevButton`, `CalendarNextButton`, `CalendarViewButton`, `DateFieldTrigger`, `DateTimeFieldTrigger` and `DateRangeFieldTrigger`, `onPointerDown` of `PinFieldSlot` and `onFocus` of `SelectHiddenSelect`. Your handler used to run after the step, the toggle or the focus had already happened
