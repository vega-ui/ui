# Dialog Comparison

## Quick Decision Rule

Choose `Dialog` when the user must complete or confirm a focused modal task before returning to the main page.

## `Dialog` vs `Drawer`

Use `Dialog` when:

- the task is modal
- content should feel centered and bounded
- confirmation or interruption is part of the UX

Use `Drawer` when:

- the task feels like a side panel
- the layout benefits from edge-anchored content

Trade-off:

- `Dialog` is stronger and more interruptive
- `Drawer` is roomier for workflows and secondary editing

## `Dialog` vs `Sheet`

Use `Dialog` when:

- the layout should feel like a centered modal surface
- desktop-style bounded focus is the primary mental model

Use `Sheet` when:

- the presentation should feel more mobile-like or sliding

## `Dialog` vs `Popover`

Use `Dialog` when:

- the content is a modal task
- focus trapping and explicit dismissal matter

Use `Popover` when:

- the content is lightweight and non-modal

## `Dialog` vs `Tooltip`

Use `Dialog` when:

- the content is interactive or task-oriented

Use `Tooltip` when:

- the content is informational only

## Choose This Component When

- the user must finish or dismiss the flow explicitly
- the content contains form fields or confirm actions
- modal interruption is the intended UX
- stronger focus trapping is part of the product contract

## Do Not Choose This Component When

- the content is lightweight and contextual
- the overlay should stay non-modal
- the main need is hint text rather than interaction
