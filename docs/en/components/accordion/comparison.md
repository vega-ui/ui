# Accordion Comparison

## Quick Decision Rule

Use `Accordion` when several related sections should share one disclosure model.

## `Accordion` vs `Collapsible`

Use `Accordion` when:

- multiple sections belong to one grouped disclosure pattern
- open-state coordination across sections matters

Use `Collapsible` when:

- one standalone disclosure block is enough
- the feature does not need grouped item semantics

Main trade-off: `Accordion` gives you coordinated grouped behavior, while `Collapsible` stays lighter for one-off sections.

## `Accordion` vs `Drawer`

Use `Accordion` when:

- the content should stay inline in the current layout

Use `Drawer` when:

- the content deserves a separate overlay panel

Main trade-off: `Accordion` preserves inline context, while `Drawer` provides stronger separation and more space.

## Choose This Component When

- Several expandable sections belong to one grouped UI.
- Users benefit from opening one or several related sections inline.
- The layout should stay on the page instead of moving into an overlay.

## Do Not Choose This Component When

- You only need one expandable section.
- The content needs modal or overlay separation.
- The open-state model across sections is irrelevant.
