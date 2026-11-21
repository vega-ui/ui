# Toast Comparison

## Quick Decision Rule

Use `Toast` for a short message about something that happened away from the focus of the user, with at most one action that is also reachable in the page. Answer what the user just did right there in place.

## `Toast` vs `Alert`

Use `Toast` when:

- the message is about something that happened elsewhere or later, like a background upload or an item that left the screen
- the message can go away by itself or with a swipe

Use `Alert` when:

- the message belongs to a place in the page, like the errors of a form or the state of an account
- it must stay where it is until its cause is gone

Main trade-off: an [Alert](../alert/) is part of the layout and stays where the user expects it; a toast floats above everything, but is temporary and easy to miss.

## `Toast` vs `Dialog`

Use `Toast` when:

- the user can go on working, and the message needs no answer

Use `Dialog` when:

- the user must decide before going on, like confirming a deletion that cannot be undone

Main trade-off: a [Dialog](../dialog/) takes the focus and blocks the page; a toast does neither. For a destructive action, prefer doing it at once with Undo in a toast over a confirmation dialog when the action can be undone.

## `Toast` vs `Popover`

Use `Toast` when:

- the message is not tied to any one control

Use `Popover` when:

- the content belongs to a button the user pressed, like details or a small form next to it

Main trade-off: a [Popover](../popover/) opens on request next to its trigger; a toast appears on its own in a fixed corner.

## `Toast` vs feedback in place

Use `Toast` when:

- the result leaves the screen or comes later, and the user may have moved on

Use feedback in place when:

- the user is looking at the control that changed, like a "Copied" label on a button, a status text under a field or a [Badge](../badge/) on a row

Main trade-off: feedback in place is seen where it matters and needs no timer; a toast reaches the user wherever they are, but competes with everything else on the screen.

## Choose This Component When

- An action has an Undo, like archiving, moving or removing an item
- A background task finishes or fails, like an upload, an export or a sync
- Something changed that the user did not do, like a message from a teammate, and the page shows it elsewhere too

## Do Not Choose This Component When

- The user must answer before going on: use [Dialog](../dialog/)
- The message belongs to a place in the page, like form errors: use [Alert](../alert/) or [HelperText](../helper-text/)
- The feedback answers the control the user just used: show it in place
- The toast would hold the only way to an action, a long text, or something to copy
