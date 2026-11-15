---
"@vega-ui/react": major
---

The remaining component logic runs on `@vega-ui/core` widgets, with the same markup and look:

- `Select` restores its default value through the form reset of the widget
- `PasswordField` keeps `shown` in a widget
- `CheckboxInput` writes `indeterminate` to the input through a widget
- `Collapsible` calls `onChangeHidden` from its widget, also when a controlled parent opens or closes it
- `AvatarImage` keeps showing `fallbackSrc` once it loads instead of switching back to the failed `src` and around again, tries a new `src` from the start, and calls your own `onLoad` and `onError` too
- **Breaking for custom parts:** `usePasswordFieldContext()` no longer returns `inputRef`, which nothing read
