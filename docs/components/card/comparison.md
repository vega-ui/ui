# Card Comparison

## Quick Decision Rule

Use `Card` when grouped content needs a surface container.

## `Card` vs `Alert`

Use `Card` when:

- the content is grouped layout, not a feedback message

Use `Alert` when:

- the content is a short semantic feedback or status message

Main trade-off: card is a content surface, while alert is message-oriented feedback.

## `Card` vs `Badge`

Use `Card` when:

- multiple pieces of related content need grouping

Use `Badge` when:

- only a tiny status or category label is needed

Main trade-off: card is a container, while badge is a compact label.

## `Card` vs `Fieldset`

Use `Card` when:

- the grouping is layout or presentation

Use `Fieldset` when:

- the grouping is semantic form structure

## Choose This Component When

- Grouped content needs a distinct surface.
- The layout benefits from one bounded container.
- Headings, metrics, or settings should feel related.
- the component should stay neutral rather than encode feedback or status semantics

## Do Not Choose This Component When

- The content is just a short feedback message.
- The UI only needs a tiny status label.
- Surface styling would be the only source of hierarchy.
