---
"@vega-ui/react": major
---

State callbacks follow one `onChangeX` scheme, like `onChangeValue` and `Drawer`'s `onChangeOpen`.

Breaking:

- `Dialog`, `Popover`, `Select`, `Sheet`, `Tooltip`: `onOpenChange` is renamed to `onChangeOpen`
- `Select`, `PhoneFieldSelect`: `onSelectValue` is renamed to `onChangeValue`
