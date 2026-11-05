# Alert Comparison

## Quick Decision Rule

Use `Alert` for short semantic feedback messages.

## `Alert` vs `Badge`

Use `Alert` when:

- the UI needs a short message with hierarchy

Use `Badge` when:

- the UI only needs a tiny status label

Main trade-off: alert is a message pattern, while badge is compact metadata.

## `Alert` vs `Card`

Use `Alert` when:

- the content is feedback or status

Use `Card` when:

- the content is grouped layout or summary content

Main trade-off: alert is feedback-oriented, while card is a container surface.

## `Alert` vs `Link`

Use `Alert` when:

- the UI is communicating status or feedback

Use `Link` when:

- the text is meant to navigate rather than explain status

## Choose This Component When

- The UI needs short semantic feedback.
- Severity or message meaning matters.
- The content benefits from optional icon and title hierarchy.
- the message should remain content, not become a workflow container

## Do Not Choose This Component When

- The content is only a tiny label.
- The UI needs a grouped layout surface.
- The message grows into a larger workflow.
