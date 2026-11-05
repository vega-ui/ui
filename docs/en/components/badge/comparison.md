# Badge Comparison

## Quick Decision Rule

Use `Badge` for compact metadata, not full feedback messages.

## `Badge` vs `Alert`

Use `Badge` when:

- the content is a short status or category label

Use `Alert` when:

- the UI needs a fuller feedback message with hierarchy

Main trade-off: badge is compact metadata, while alert is explicit feedback content.

## `Badge` vs `Card`

Use `Badge` when:

- only a tiny inline label is needed

Use `Card` when:

- grouped content needs a surface container

Main trade-off: badge is a label, while card is a layout surface.

## `Badge` vs `Link`

Use `Badge` when:

- the content is status or categorization metadata

Use `Link` when:

- the text should navigate somewhere

## Choose This Component When

- The content is short, compact, and metadata-like.
- The element should stay visually small.
- The UI needs a categorical or status label.
- the pattern should remain subordinate to the surrounding content

## Do Not Choose This Component When

- The content is a full message.
- The UI needs a container surface.
- The status must be explained by more than a tiny label.
