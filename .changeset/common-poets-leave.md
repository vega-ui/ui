---
"@vega-ui/hooks": minor
"@vega-ui/utils": minor
"@vega-ui/react": minor
---

Refactor form controls architecture and remove deprecated components.

### Removed (breaking)
- Remove `FlagIcon` package exports and implementation.
- Remove `PhoneSelectField` and related subcomponents/contexts/styles.
- Remove legacy `SelectArrow` and `SelectPlaceholder` components.
- Remove legacy `NumberFieldIncrement`/`NumberFieldDecrement` components.
- Remove legacy `PinFieldInput` component.

### Added
- Add new `NumberField` building blocks:
    - `NumberFieldInput`
    - `NumberFieldIncrementButton`
    - `NumberFieldDecrementButton`
    - `NumberFieldContext` (new contexts structure)
    - `NumberField` types module
- Add new `PasswordField` building blocks:
    - `PasswordFieldInput`, `PasswordFieldToggleButton`
    - `PasswordFieldShownIcon`, `PasswordFieldHiddenIcon`
    - `PasswordFieldContext` and component index exports
- Add new `PhoneField` composition:
    - `PhoneFieldInput`
    - `PhoneFieldSelect` + subcomponents (`Combobox`, `HiddenSelect`, `Icon`, `Listbox`, `Option`, `Portal`, `Value`)
    - `PhoneFieldContext` and component index exports
- Add `PinFieldHiddenInput` component (single visually hidden input backing the slots).
- Add new `Select` building blocks:
    - `SelectHiddenSelect`, `SelectIcon`, `SelectPortal`, `SelectValue` helpers
    - `SelectOptionsContext`
- Add new `TextFieldInput` component and `TextFieldContext`.

### Changed
- Update `PinField` internals, contexts, slots, separator, styles and tests.
- Update `Select`, `NumberField`, `PasswordField`, `PhoneField`, `TextField` internals, styles, stories and tests.
- Update `Option` component and related types/styles.
- Update `Drawer` internals and context, plus stories.
- Update library root exports (`packages/ui/src/index.ts`).

### Tests
- Update existing tests for refactored components.
- Add/adjust stories for new subcomponents.
