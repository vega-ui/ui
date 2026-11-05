# PhoneField Accessibility

## Labeling

`PhoneField` should have one clear field label for the whole control family.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>↓</kbd> / <kbd>↑</kbd> | On the country trigger, opens the country list. Inside the open list, moves the active option. The rest of the list keys work as in [Select](../select/accessibility.md). |
| <kbd>Enter</kbd> | Selects the active country, writes its calling code into the input and moves the focus to the input. |
| <kbd>Tab</kbd> | From the closed country trigger, moves the focus to the phone input. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

- the input should remain the main text-entry target
- mask behavior should not block normal editing unexpectedly

## Focus Behavior

- focus should move predictably between the country trigger and the input
- the country listbox renders in the top layer but should not break focus flow

## Screen Reader Semantics

- the field should read as one phone input flow, not as unrelated controls
- custom country-value rendering should still expose clear meaning

## Form Semantics

Use `PhoneFieldSelectHiddenSelect` when the country selector should participate in native [form participation](../../glossary.md#form-participation).

## Accessibility Risks

- unlabeled country selector inside an otherwise labeled field
- strict mask behavior that becomes hard to edit from the keyboard
- custom country options that fragment one selectable row into multiple interactive targets
