# Layout primitives

Use this page when the UI mainly needs structure, grouping, spacing, or low-level composition rather than a specialized product interaction.

## Quick Decision Rules

- Use [Card](../components/card/) for a neutral grouping surface.
- Use [Fieldset](../components/fieldset/) for semantic grouping of related form controls.
- Use [Separator](../components/separator/) for visual division between adjacent areas.
- Use [Toolbar](../components/toolbar/) to group three or more related controls into one Tab stop with arrow key navigation.
- Use [Slot](../components/slot/) when composition should pass props into one child element through `asChild`.
- Use [VisuallyHidden](../components/visually-hidden/) for content that should stay available to assistive technology but not visual layout.

## By Role

- Neutral content surface: [Card](../components/card/)
- Semantic form group: [Fieldset](../components/fieldset/)
- Visual divider: [Separator](../components/separator/)
- Group of controls with one Tab stop: [Toolbar](../components/toolbar/)
- Polymorphic composition helper: [Slot](../components/slot/)
- Hidden-but-accessible content: [VisuallyHidden](../components/visually-hidden/)

## Common Misclassifications

- Do not use [Card](../components/card/) when the grouping must be native form structure; use [Fieldset](../components/fieldset/).
- Do not use [Separator](../components/separator/) as the only thing creating semantic section meaning.
- Do not use [Toolbar](../components/toolbar/) for one or two buttons or for navigation links; plain buttons and a `<nav>` fit better.
- Do not use [Slot](../components/slot/) as a styled wrapper; it is a composition primitive, not a surface.
- Do not use [VisuallyHidden](../components/visually-hidden/) to hide content that should actually be removed from assistive technology too.

## Start Here

- Dashboard blocks, settings sections, summaries: [Card](../components/card/)
- Grouped control areas: [Fieldset](../components/fieldset/)
- Editor formatting bars, tool palettes, list controls: [Toolbar](../components/toolbar/)
- `asChild` and polymorphic composition: [Slot](../components/slot/)
- Accessible hidden labels or descriptions: [VisuallyHidden](../components/visually-hidden/)
