# Popover Comparison

## Quick Decision Rule

Choose `Popover` when the content is contextual, brief, and should stay anchored to a trigger without becoming modal.

## `Popover` vs `Tooltip`

Use `Popover` when:

- the content is richer than a simple hint
- it may contain actions or form controls

Use `Tooltip` when:

- the content is purely supplemental information

## `Popover` vs `Dialog`

Use `Popover` when:

- the interaction is non-modal and lightweight
- the user should keep page context and not enter a trapped modal flow

Use `Dialog` when:

- the task needs stronger modal focus and containment

## `Popover` vs `Drawer`

Use `Popover` when:

- the content is short and anchored

Use `Drawer` when:

- the content grows into a side-panel workflow

## Choose This Component When

- the content is contextual and brief
- the UI should stay non-modal
- anchored placement is part of the interaction model

## Do Not Choose This Component When

- the task is large, modal, or destructive enough to deserve a stronger overlay
