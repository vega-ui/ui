# Tabs Comparison

## Quick Decision Rule

Use `Tabs` when one area shows one of several panels of related content and the user switches between them on the same page.

## `Tabs` vs `SegmentedControl`

Use `Tabs` when:

- each choice shows its own panel of content
- the panels are sections of the same page

Use `SegmentedControl` when:

- the choice is a value, for example a view mode or a filter, that changes one shared area or is submitted with a form

Main trade-off: tabs are a `tablist` that owns panels, while a segmented control is a radio group that picks a value.

## `Tabs` vs `Accordion`

Use `Tabs` when:

- one section at a time is enough and the sections are peers
- horizontal space is available for the labels

Use `Accordion` when:

- several sections may be open together, or the screen is narrow
- the sections should read top to bottom

Main trade-off: tabs keep the page height steady and hide the other sections, while an accordion keeps all headings in the reading order.

## `Tabs` vs navigation links

Use `Tabs` when:

- switching keeps the URL and shows content already on the page

Use a `<nav>` with links when:

- each choice is its own URL, should be shareable, or loads a new page. Mark the current link with `aria-current="page"`; use [Pagination](../pagination/) for numbered pages and [PageControl](../page-control/) for slide indicators.

Main trade-off: tabs switch content in place, links navigate; screen readers announce them differently.

## Choose This Component When

- Several peer sections share one area of the page
- Users compare or switch between views of the same object, such as settings, details and activity
- Content should stay mounted while hidden, keeping its state

## Do Not Choose This Component When

- Each choice is a separate page or URL
- The choice is a form value
- Users need to see several sections at once
