# CheckboxCard Anatomy

## Overview

`CheckboxCard` is a compound selection card. The root renders a labeled card surface, while exported child parts split content, title, description, and control UI.

## Required Parts

- `CheckboxCard`: root labeled card and shared checkbox context
- `CheckboxCardContent`: content column for the main message
- `CheckboxCardControl`: control area for the checkbox affordance

## Optional Parts

- `CheckboxCardTitle`
- `CheckboxCardDescription`
- `CheckboxCardControlHiddenInput`
- `CheckboxCardControlCheckedIcon`
- `CheckboxCardControlIndeterminateIcon`

## Composition Order

1. `CheckboxCard`
2. `CheckboxCardContent`
3. `CheckboxCardTitle` and `CheckboxCardDescription`
4. `CheckboxCardControl`
5. hidden input and icons inside the control when needed

## Valid Composition Patterns

- plan tiles where the whole card acts as the checkbox label
- settings cards with a short title and supporting description
- horizontal or vertical layouts depending on density

## Invalid Composition Patterns

- making the control clickable but not the surrounding label/card
- using checkbox cards for mutually exclusive single choice
- letting decorative content obscure the actual checked state
