# Fieldset Comparison

## Quick Decision Rule

Use `Fieldset` when multiple related controls need one semantic group label. Use a plain `div` or `Card` only when the grouping is purely visual.

## `Fieldset` vs `Card`

Use `Fieldset` when:

- the grouping is semantic form structure

Use `Card` when:

- the container is only layout or presentation

## `Fieldset` vs `Separator`

Use `Fieldset` when:

- inputs belong to one named control group

Use `Separator` when:

- you only need visual division

## `Fieldset` vs `Heading`

Use `FieldsetLegend` when:

- the text labels one control group

Use `Heading` when:

- the text is document or section structure rather than native group semantics

## Choose This Component When

- several form controls belong to one named concept
- the group needs native `<fieldset>` and `<legend>` behavior
- you need optional descriptive copy before the controls
- assistive technology should perceive the controls as one grouped question or setting area

## Do Not Choose This Component When

- the grouping is only decorative
- one standalone input just needs a nearby label
- a plain layout container is enough
