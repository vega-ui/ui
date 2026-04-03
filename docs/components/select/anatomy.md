# Select Anatomy

## Overview

`Select` is a compound component. The root owns open state, selection state, option registration, keyboard navigation, and typeahead behavior. The exported child parts consume that shared context.

## Required Parts

### `Select`

Root provider for the whole composition.

- Required: yes
- Owns: selected value, open state, active option, keyboard interactions
- Must wrap every other `Select*` part

### `SelectCombobox`

Visible trigger surface that opens and closes the listbox.

- Required: yes
- Typical children: `SelectValue`, `SelectIcon`
- Should remain inside `Select`

### `SelectValue`

Current value renderer or placeholder renderer.

- Required: effectively yes in most UI
- Accepts custom children when the selected value needs richer rendering
- Should stay inside `SelectCombobox`

### `SelectIcon`

Optional visual indicator for the trigger.

- Required: no
- Usually placed after `SelectValue`

### `SelectPortal`

Optional portal wrapper for overlay rendering.

- Required: no
- Recommended: yes when listbox should escape clipping or stacking contexts

### `SelectListbox`

Container for selectable options.

- Required: yes
- Should contain one or more `SelectOption` children
- Usually rendered inside `SelectPortal`

### `SelectOption`

Selectable item registered into the root option model.

- Required: yes
- Must be rendered inside `SelectListbox`
- Value type must match `string | number`

## Optional Parts

### `SelectHiddenSelect`

Hidden native select for form submission and browser form semantics.

- Required: no
- Recommended: yes for native forms
- Omit only when the component is used outside normal form submission

### `SelectIcon`

Optional visual indicator for the trigger.

- Required: no
- Usually placed after `SelectValue`

### `SelectPortal`

Optional portal wrapper for overlay rendering.

- Required: no
- Recommended: yes when listbox should escape clipping or stacking contexts

## Composition Order

Typical composition:

1. `Select`
2. `SelectHiddenSelect`
3. `SelectCombobox`
4. `SelectPortal`
5. `SelectListbox`
6. `SelectOption`

## Valid Composition Patterns

```tsx
<Select>
  <SelectHiddenSelect />
  <SelectCombobox>
    <SelectValue />
    <SelectIcon />
  </SelectCombobox>
  <SelectPortal>
    <SelectListbox>
      <SelectOption value='react'>React</SelectOption>
    </SelectListbox>
  </SelectPortal>
</Select>
```

This is the default production-safe composition for forms and overlay-heavy layouts.

## Invalid Composition Patterns

### `SelectOption` outside `SelectListbox`

This breaks option registration and keyboard navigation.

### `SelectValue` outside `SelectCombobox`

This breaks the trigger composition contract and makes the selected value placement ambiguous.

### Child parts outside `Select`

The public parts rely on root context. Rendering them outside `Select` breaks behavior.

### Search input without disabling typeahead

If a text input is rendered inside `SelectListbox`, built-in typeahead should usually be disabled with `typeMatchEnabled={false}`.
