# Link Comparison

## Quick Decision Rule

Use `Link` when the primary job is navigation.

## `Link` vs `Button`

Use `Link` when:

- the interaction navigates to another page, route, or section

Use `Button` when:

- the interaction performs an action or mutates state

Main trade-off: link is navigation semantics, while button is action semantics.

## `Link` vs `Button asChild`

Use `Link` when:

- plain text-link presentation is enough

Use `Button asChild` when:

- navigation should keep button visuals

Main trade-off: link stays lighter and more textual, while button-as-link adds stronger action styling.

## `Link` vs `Badge`

Use `Link` when:

- the text should navigate somewhere

Use `Badge` when:

- the UI only needs compact metadata or status labeling

## Choose This Component When

- The interaction primarily navigates.
- Text-link presentation fits the surrounding UI.
- Inline or secondary navigation is needed.
- the UI should read as navigation rather than command

## Do Not Choose This Component When

- The interaction mutates state.
- A visible button surface is the better presentation.
- The link text does not clearly describe the destination.
