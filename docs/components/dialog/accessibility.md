# Dialog Accessibility

## Labeling

`DialogContent` does not name itself. Naming the dialog is your job, and it is required: a dialog without a name is inaccessible, because screen readers announce it only as "dialog".

Recommended pattern:

- a visible heading with an `id`, referenced by `aria-labelledby` on `DialogContent`
- `aria-label` on `DialogContent` when there is no visible heading

```tsx
<DialogContent aria-labelledby='rename-title'>
  <Heading id='rename-title' as='h2' size={4} fontWeight={600}>Rename project</Heading>
</DialogContent>
```

## Keyboard Behavior

- the trigger should open the dialog from the keyboard
- focus should move into the dialog when it opens
- `Escape` should close the active dialog
- nested dialogs should close in reverse order

## Focus Behavior

- focus should enter the dialog when it opens
- closing should restore focus to a sensible trigger
- nested dialog stacks should preserve predictable focus restoration

Focus handling comes from the native `<dialog>`: the rest of the page is inert while the dialog is open, and closing restores focus to the element that was focused before opening. In Safari a mouse click does not focus a button, so after a mouse-opened dialog closes focus returns to the page body; keyboard activation returns it to the trigger.

On open the dialog itself takes focus, so nothing inside is highlighted and screen readers announce its title; `Tab` moves to the first control. Put `autoFocus` on a child to focus it instead, for example the first field of a form.

## Screen Reader Semantics

- the dialog is exposed as `role=dialog` with `aria-modal` by the browser and is named by your `aria-labelledby` or `aria-label`
- the trigger exposes `aria-haspopup='dialog'` and `aria-expanded`
- the body content should make sense as one modal unit
- close controls should remain explicit when dismissal matters; `DialogClose` has no default label, so an icon-only button inside it needs an `aria-label`; the library ships no built-in strings

## Form Semantics

When the dialog contains fields, treat it as a normal form boundary and retest keyboard submit, close, and focus-return behavior in the real flow.

Buttons in a `<form method="dialog">` close the dialog through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`, as with a native `<dialog>`. This also works with `closedBy='none'`, where `Escape` and the backdrop do not close the dialog.

## Accessibility Risks

- opening a dialog without `aria-labelledby` or `aria-label`
- using nested dialogs without retesting focus restoration
- putting long content into a dialog without a usable scroll strategy
- relying only on click-away dismissal for important flows
