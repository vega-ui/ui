# TimeField Accessibility

## Labeling

- Pair `TimeFieldInput` with a visible `Label`.
- The label should make the time format expectation clear when needed.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>↑</kbd> / <kbd>↓</kbd> | With the caret in the hours: steps them by one. In the minutes or seconds: steps them by `step` (1 by default). A segment wraps around its range without changing the others. `step={0}` turns stepping off. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- Keyboard entry remains native text input behavior shaped by the mask.
- The time columns turn with the keys of [WheelPicker](../wheel-picker/accessibility.md): ↑ and ↓ step an option and skip the disabled ones, Page Up and Page Down move a page, Home and End go to the first and the last option, and typed digits select the option that starts with them.

## Focus Behavior

- Focus lands on the input and uses inherited `TextField` focus styling.
- With `autoFocus` on the first time column the focus moves into the popover when it opens, Tab moves between the columns, and Escape closes the popover and returns the focus to the trigger.

## Screen Reader Semantics

- The control is still a native input.
- Each time column is a `spinbutton` named by its `aria-label` that announces the selected part, like "Hours, 09"; a template in the cells changes only what is shown, the column still announces the two-digit value; name the popover with `role="dialog"` and `aria-label` to match `aria-haspopup` of the trigger.
- Users may need explicit helper copy for the expected time format.

## Form Semantics

- Put `name` and `required` on `TimeFieldInput`, and `value` or `defaultValue` on `TimeField`.
- The input reports native validity through `setCustomValidity` with the message of the browser: an incomplete time and a time before `min` or after `max` are invalid, so `:invalid`, `reportValidity()`, and the browser's submit check work.
- Keep bounds and format aligned with the submitted value format.

## Accessibility Risks

- unclear 24-hour vs seconds expectations
- invalid range communicated only by visuals
- missing visible label
