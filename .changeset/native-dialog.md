---
"@vega-ui/react": major
---

BREAKING: `Dialog`, `Drawer`, and `Sheet` are built on the native `<dialog>` element opened with `showModal()`, and the overlays follow native behavior and iOS-like motion.

- `DialogPortal`, `DialogBackdrop`, `DrawerPortal`, `DrawerBackdrop`, `SheetPortal`, and `SheetBackdrop` are removed. `DialogContent`, `DrawerContent`, and `SheetContent` render the `<dialog>` into `document.body`, and the backdrop is its `::backdrop`. Style it with `.your-class::backdrop`.
- `DialogContent`, `DrawerContent`, and `SheetContent` take `<dialog>` attributes, and their `ref` points to the `HTMLDialogElement`. `onCancel` and `onClose` run after the internal handlers. `blurred` (default `true`) blurs the page behind, and `overlay` (default `true`) dims it; with `overlay={false}` the panel stays modal over a transparent backdrop.
- `closedBy` on `DialogContent`, `DrawerContent`, and `SheetContent` sets which user actions close the panel, like the native `closedby` attribute: `any` (a backdrop click, a swipe, or `Escape`), `closerequest` (`Escape` only), or `none`. It replaces `dismissible` on `Drawer` and `Sheet` and `closable` and `clickEnabled` on `Sheet`. It defaults to `closerequest` on `DialogContent`, so a backdrop click no longer closes a dialog, and to `any` on `DrawerContent` and `SheetContent`.
- `useDialogContext`, `useDrawerContext`, and `useSheetContext` no longer expose the floating-ui context and props. The unused `ref` prop is removed from `DrawerProps` and `SheetProps`.
- The browser makes the page inert, handles focus, and restores it on close, and the page does not scroll behind the panel. On open the panel itself takes focus instead of its first control, and `autoFocus` on a child focuses that child. `DialogTrigger`, `DrawerTrigger`, and `SheetTrigger` set `aria-haspopup` and `aria-expanded`.
- `DialogTitle`, `DialogHeader`, `DialogCloseButton`, `DrawerTitle`, `DrawerHeader`, `DrawerCloseButton`, `SheetHeader`, and `SheetMain` are removed: compose the panel from your own markup. Name it with `aria-labelledby` pointing to your heading, or with `aria-label`; a panel without a name is not accessible. New `DialogClose`, `DrawerClose`, and `SheetClose` turn your own button into a close button (`asChild`) with no styles of its own: they replace `DialogCloseButton` and `DrawerCloseButton`. Buttons in a `<form method="dialog">` close the panel too. `useDialogContext` and `useDrawerContext` no longer return `contentId` and `titleId`, and `useSheetContext` no longer returns `contentId`.
- Submitting a `<form method="dialog">` inside the panel closes it through `onChangeOpen(false)`, so the close transition plays and a controlled parent can keep it open; the submit button's `value` becomes the dialog's `returnValue`, as natively. It closes the panel also when `closedBy` is `none`.
- `Backdrop` and `PopoverBackdrop` are removed. Use `Dialog` or `Sheet` for a popover that dims the page.
- Panels open with a spring and close faster with an ease-out; with reduced motion they only fade.

`Drawer`:

- `position` uses logical sides that follow the writing direction: `left` and `right` are now `start` and `end` (`left-start` is `start-start`, `right-end` is `end-end`, and so on), and the default is `end`. In right-to-left text `end` is the left side.
- A touch swipe toward its edge drags the drawer and closes it past half its size or on a flick, when `closedBy` is `any`. Mouse drags are left for text selection.

`Sheet`:

- Snap points act like native sheet detents. A drag follows the finger, resists past the top and bottom with rubber banding, and settles at the snap point where its momentum would carry it, so a flick can skip a snap point; `steppedSnapPoints` moves one snap point at most. A drag down past the lowest snap point closes the sheet when `closedBy` is `any`.
- `edgeThreshold`, `siblingThreshold`, and `swipeTimestamp` are removed.
- The sheet fits its content unless `SheetContent` has a CSS height, and is never taller than the viewport. A number snap point is a fraction of the viewport height instead of the sheet height, and a snap point above the sheet's height rests at its top.
- The sheet opens at the lowest snap point unless `defaultSnapPoint` says otherwise, and an uncontrolled sheet reopens there. `onChangeActiveSnapPoint` only fires when the user moves the sheet to another snap point.
- On touch devices, dragging by scrollable content moves the sheet below its top snap point; at the top it scrolls the content, and pulls the sheet down once the content is scrolled to the top.
- The backdrop fades as the sheet is dragged down, the sheet rises above the on-screen keyboard, and its padding respects the bottom safe area.
- `SheetHandle` is a button that moves the sheet to the next snap point, and back to the lowest from the top, when the sheet has several snap points; otherwise it is disabled and hidden from assistive technology, and it is always a `<button>`. It has no built-in name: pass `aria-label`, for example `Resize sheet`. Like the iOS grabber, it is a 36×5px bar at the top of the sheet that takes no room, and the sheet keeps its content closer to the top.
- Like an iOS sheet, the sheet floats as a card with rounded corners, `--sheet-inset` (default `var(--spacing-8)`) clear of the sides and the bottom, while it rests below the top of the viewport, also at a lower snap point, and widens to the edges as it rises to the top; `--sheet-inset: 0` keeps it full width. `SheetContent` exposes `--sheet-expansion`, from `0` at its lowest position to `1` when it reaches the top of the viewport, for styles that change as the sheet rises.
- `SheetContent` has the side and bottom padding that `SheetHeader` and `SheetMain` had. A scrollable region inside it is any element with `overflow: auto`.
- `react-remove-scroll` is no longer a dependency.

`Popover`:

- `PopoverContent` is a native `popover="auto"` element that is always rendered, hidden while closed; its children render only while it is open. The browser opens it from `PopoverTrigger` through `popovertarget`, closes it on an outside click or `Escape`, stacks nested popovers, and returns focus to the trigger. The trigger must be a button.
- Opening no longer moves focus into the content; `Tab` from the trigger enters it. `usePopoverContext` no longer exposes the floating-ui context and props.
- The content grows out of the side facing its trigger.
- `PopoverTrigger` no longer sets `aria-expanded` and `aria-controls`: the browser exposes the expanded state from `popovertarget`.

`Tooltip`:

- It shows on hover with a mouse or pen and on keyboard focus, never on a tap, and hides when the trigger is pressed. Right after one tooltip closes, the next shows without a delay.
- It describes its trigger through `aria-describedby`, grows out of its arrow, and lets the pointer through to the page. `useTooltipContext` no longer exposes the floating-ui props.

`Select` and `Tooltip` render their floating content in the top layer with `popover="manual"` when the browser supports it, so a modal dialog or an `overflow` container no longer clips or covers them. `SelectPortal` and `PhoneFieldSelectPortal` are removed: render `SelectListbox` directly inside `Select`. `SelectListbox` stays at least as wide as the combobox, also when the combobox resizes while the list is open, and only fades with reduced motion.

`IconButton` no longer keeps the browser's default button padding, so an icon in a small button, such as a 24px close button, is no longer squeezed.
