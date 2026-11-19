---
'@vega-ui/react': major
---

`IconButton` is removed: a button for one icon is now `<Button square>`.

- `square` makes the button as wide as it is high, with no padding and the icon a third of its height, in every `size` of Button. Replace `<IconButton …>` with `<Button square …>`, `IconButtonProps` with `ButtonProps` and `IconButtonSize` with `ButtonSize`; the default look stays `primary` `fill`.
- `fullWidth` is removed from `Button` and `CalendarViewButton`, like a native `<button>` has no width attribute: set `style={{ width: '100%' }}` or a class instead.
- The CSS variables are renamed: `--icon-button-size` is `--button-height` and `--icon-button-br-ratio` is `--button-br-ratio`.
- A square button has no text, so its types require `aria-label` or `aria-labelledby`, or `asChild` with the name on the child element.
- The parts that rendered an icon button are behavior only now: they render a `Button` with no built-in icon and no forced `square`, so pass the icon as children with `square` and a name, write a text label, or render your own element with `asChild`.
  - `PasswordFieldToggleIconButton` is renamed to `PasswordFieldToggle`; `DateFieldTriggerIconButton`, `DateRangeFieldTriggerIconButton` and `DateTimeFieldTriggerIconButton` to `DateFieldTrigger`, `DateRangeFieldTrigger` and `DateTimeFieldTrigger`, with their `…Props` types.
  - `CalendarPrevButton` and `CalendarNextButton` no longer show a chevron, and an icon inside them is mirrored in a right-to-left layout; `NumberFieldIncrementButton` and `NumberFieldDecrementButton` no longer show a plus and a minus; the date triggers no longer show a calendar icon; `ComboboxTrigger` is no longer square by itself.
  - Migrate with `<CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>`, and the same with `ChevronRightIcon`, `PlusIcon`, `MinusIcon`, `CalendarIcon`, or `square` alone on `PasswordFieldToggle` and `ComboboxTrigger`.
- The icon parts no longer draw a default icon, and `@vega-ui/react` no longer depends on `@vega-ui/icons` or `lucide-react`, so any icon set works. Pass the icon as children: `AccordionIcon`, `ComboboxIcon` and `SelectIcon` (a chevron), `CheckboxCheckedIcon` (a check mark), `CheckboxIndeterminateIcon` (a minus), `PasswordFieldShownIcon` and `PasswordFieldHiddenIcon` (an eye and a crossed out eye), and `AlertIcon`, which no longer picks the icon by `variant`. Migrate with `<SelectIcon><ChevronDownIcon /></SelectIcon>` and `<CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>`. `Icon` and every icon part require their children in the types, since an icon part with no children fails to render.
- `CheckboxCardControlCheckedIcon` and `CheckboxCardControlIndeterminateIcon` are removed, with their `…Props` types: without an icon of their own they were the same as `CheckboxCheckedIcon` and `CheckboxIndeterminateIcon`, which take their place inside the indicator.
