# Layout Primitives

Use this page when the UI mainly needs structure, grouping, spacing, or low-level composition rather than a specialized product interaction.

## Quick Decision Rules

- Use [Card](../components/card/) for a neutral grouping surface.
- Use [Fieldset](../components/fieldset/) for semantic grouping of related form controls.
- Use [Separator](../components/separator/) for visual division between adjacent areas.
- Use [Backdrop](../components/backdrop/) for low-level overlay background behavior.
- Use [Slot](../components/slot/) when composition should pass props into one child element through `asChild`.
- Use [VisuallyHidden](../components/visually-hidden/) for content that should stay available to assistive technology but not visual layout.

## By Role

- Neutral content surface: [Card](../components/card/)
- Semantic form group: [Fieldset](../components/fieldset/)
- Visual divider: [Separator](../components/separator/)
- Overlay background layer: [Backdrop](../components/backdrop/)
- Polymorphic composition helper: [Slot](../components/slot/)
- Hidden-but-accessible content: [VisuallyHidden](../components/visually-hidden/)

## Common Misclassifications

- Do not use [Card](../components/card/) when the grouping must be native form structure; use [Fieldset](../components/fieldset/).
- Do not use [Separator](../components/separator/) as the only thing creating semantic section meaning.
- Do not use [Backdrop](../components/backdrop/) as if it were a full modal or dialog system.
- Do not use [Slot](../components/slot/) as a styled wrapper; it is a composition primitive, not a surface.
- Do not use [VisuallyHidden](../components/visually-hidden/) to hide content that should actually be removed from assistive technology too.

## Start Here

- Dashboard blocks, settings sections, summaries: [Card](../components/card/)
- Grouped control areas: [Fieldset](../components/fieldset/)
- Low-level overlay composition: [Backdrop](../components/backdrop/)
- `asChild` and polymorphic composition: [Slot](../components/slot/)
- Accessible hidden labels or descriptions: [VisuallyHidden](../components/visually-hidden/)
