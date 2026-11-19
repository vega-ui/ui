---
"@vega-ui/react": major
---

State callbacks follow one `onChangeX` scheme, like `onChangeValue` and `Drawer`'s `onChangeOpen`.

Breaking:

- `Dialog`, `Popover`, `Select`, `Sheet`, `Tooltip`: `onOpenChange` is renamed to `onChangeOpen`
- `Select`, `PhoneFieldSelect`: `onSelectValue` is renamed to `onChangeValue`
- `SegmentedControl`: `onChange` with the radio's `change` event is replaced by `onChangeValue`, called with the value of the selected item, a number item value as a number. `SegmentedControl` is generic over that value, so `value={period}` types `onChangeValue` as the type of `period`; `SegmentedControlValue` is exported. The root's `onChange` is now the native `change` event that bubbles from the radio: `event.currentTarget` is the root, so take the value from `onChangeValue`. Migrate `onChange={(event) => setPeriod(event.currentTarget.value)}` to `onChangeValue={setPeriod}`.
