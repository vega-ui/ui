# Collapsible Comparison

## Quick Decision Rule

Use `Collapsible` when one standalone expandable section is enough.

## `Collapsible` vs `Accordion`

Use `Collapsible` when:

- the feature needs one disclosure block
- grouped state coordination across sections is unnecessary

Use `Accordion` when:

- several related sections should share one open-state model

Main trade-off: `Collapsible` stays lighter and simpler, while `Accordion` gives you coordinated grouped disclosure behavior.

## `Collapsible` vs `Popover`

Use `Collapsible` when:

- content should stay inline in the page flow

Use `Popover` when:

- content should float next to a trigger

Main trade-off: `Collapsible` preserves layout continuity, while `Popover` gives stronger local separation.

## Choose This Component When

- One expandable section is enough.
- The content should stay inline.
- A simple trigger-to-content disclosure model is all the feature needs.

## Do Not Choose This Component When

- Several sections should coordinate.
- The content should behave like a floating overlay.
- The feature needs modal or grouped navigation behavior.
