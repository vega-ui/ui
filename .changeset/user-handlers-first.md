---
"@vega-ui/react": major
---

- **Breaking:** the parts below call your handler before their own, and `event.preventDefault()` in it skips their own, like on the other parts of the library: `onClick` of `NumberFieldIncrementButton`, `NumberFieldDecrementButton`, `PasswordFieldToggleIconButton`, `CalendarPrevButton`, `CalendarNextButton`, `CalendarViewButton`, `DateFieldTriggerIconButton`, `DateTimeFieldTriggerIconButton` and `DateRangeFieldTriggerIconButton`, `onPointerDown` of `PinFieldSlot` and `onFocus` of `SelectHiddenSelect`. Your handler used to run after the step, the toggle or the focus had already happened
