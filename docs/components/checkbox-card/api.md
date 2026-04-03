# CheckboxCard API

## Root API


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `orientation` | `CheckboxCardOrientation` | `'vertical'` | No | Defines the layout direction of the card content. |
| `variant` | `CheckboxVariant` | `'primary'` | No | Variant that controls the visual style of the checkbox card. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `CheckboxCardContent`

Primary content wrapper for title and description.

## `CheckboxCardTitle`

Short primary label.

## `CheckboxCardDescription`

Supporting text under the title.

## `CheckboxCardControl`

Visual control region for the checkbox affordance.

## `CheckboxCardControlHiddenInput`

Hidden native checkbox input.

## `CheckboxCardControlCheckedIcon`

Checked-state icon.

## `CheckboxCardControlIndeterminateIcon`

Indeterminate-state icon.

## Hooks

## `useCheckboxCardContext`

Advanced hook for custom card-control wrappers that need checked, disabled, size, or variant state.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `CheckboxCardProps` | root prop type | Extends `Card` and checkbox behavior. |
| `CheckboxCardContentProps` | content props | Layout wrapper props. |
| `CheckboxCardTitleProps` | title props | Text heading props. |
| `CheckboxCardDescriptionProps` | description props | Secondary text props. |
| `CheckboxCardControlProps` | control props | Control wrapper props. |

## State Model

- Checked state can be controlled or uncontrolled.
- `indeterminate` is a visual and semantic mixed state on top of checkbox behavior.
- Variant and size flow through checkbox-card context.

## Integration Notes

- Use hidden input when native form submission matters.
- Prefer `Radio` or `SegmentedControl` for single-choice groups.
- Keep the whole card as the labeled click target rather than shrinking interaction to the tiny control.
