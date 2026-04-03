# PhoneField Accessibility

## Labeling

`PhoneField` should have one clear field label for the whole control family.

## Keyboard Behavior

- the input should remain the main text-entry target
- the nested country select should keep normal listbox keyboard behavior
- mask behavior should not block normal editing unexpectedly

## Focus Behavior

- focus should move predictably between the country trigger and the input
- the nested country [portal](../../glossary.md#portal) should not break focus flow

## Screen Reader Semantics

- the field should read as one phone input flow, not as unrelated controls
- custom country-value rendering should still expose clear meaning

## Form Semantics

Use `PhoneFieldSelectHiddenSelect` when the country selector should participate in native [form participation](../../glossary.md#form-participation).

## Accessibility Risks

- unlabeled country selector inside an otherwise labeled field
- strict mask behavior that becomes hard to edit from the keyboard
- custom country options that fragment one selectable row into multiple interactive targets
