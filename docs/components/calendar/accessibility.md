# Calendar Accessibility

## Labeling

The calendar should have a clear visible context such as a field label, heading, or surrounding form copy.

## Keyboard Behavior

- users should be able to move through dates and picker views from the keyboard
- month and year switching should remain reachable without pointer-only controls
- excluded or disabled dates should not behave like normal selectable dates

## Focus Behavior

- focus should remain predictable when switching between day, month, and year views
- custom day items should preserve visible focus states

## Screen Reader Semantics

- visible month and year context should remain understandable
- custom day content should still read like one selectable date cell

## Form Semantics

When the calendar is used inside field-like wrappers, retest how selection state is surfaced back to the containing field.

## Accessibility Risks

- custom date-cell content that hides the date meaning
- disabled and excluded dates that still appear selectable
- custom picker layouts that weaken keyboard navigation
