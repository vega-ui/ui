# Fieldset Accessibility

## Labeling

- `FieldsetLegend` should provide the primary accessible name for the group.
- `FieldsetHeader` is supporting copy, not the replacement for the legend.

## Keyboard Behavior

- `Fieldset` does not define custom keyboard behavior.
- Keyboard interaction comes from the controls inside the group.

## Focus Behavior

- Focus moves directly to descendant controls, not to the fieldset container itself.
- Native `disabled` on the root prevents descendant form controls from receiving interaction.

## Screen Reader Semantics

- The root uses native `<fieldset>` semantics.
- `FieldsetLegend` maps to native `<legend>`, which screen readers use to announce the group label.

## Form Semantics

- Use `Fieldset` when multiple related inputs should be understood as one form section.
- Group-level validation should keep the legend stable and add supporting error copy separately.

## Accessibility Risks

- omitting `FieldsetLegend`
- using visual headings outside the fieldset as the only group label
- nesting multiple groups without clear legend hierarchy
