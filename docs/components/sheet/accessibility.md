# Sheet Accessibility

## Labeling

`SheetContent` does not name itself. Naming the sheet is your job, and it is required: a sheet without a name is inaccessible, because screen readers announce it only as "dialog". Reference a visible heading with `aria-labelledby` on `SheetContent`, or set `aria-label` when there is no visible heading. Non-closable sheets should explain why the user is in the flow and how to complete it.

```tsx
<SheetContent aria-labelledby='share-title'>
  <SheetHandle aria-label='Resize sheet' />
  <Heading id='share-title' size={4} fontWeight={600} as='h2'>Share</Heading>
</SheetContent>
```

## Keyboard Behavior

- The trigger should open the sheet from the keyboard.
- `Escape` closes the sheet unless `SheetContent` has `closedBy='none'`.
- `SheetHandle` is always a `<button>` and has no name of its own: give it one with `aria-label`, for example `Resize sheet`. With several snap points it moves the sheet between them from the keyboard; otherwise it is `disabled` and `aria-hidden`, so it stays out of the Tab order and is not announced, and the sheet can still be dragged by it.
- Focus should remain predictable across snap-point changes.

## Focus Behavior

- Focus should move into the sheet on open.
- Focus should restore sensibly on close.

Focus handling comes from the native `<dialog>`: the rest of the page is inert while the sheet is open, `Tab` stays inside the sheet (it can still reach the browser UI), and closing restores focus to the element that was focused before opening.

On open the sheet itself takes focus, so nothing inside is highlighted and screen readers announce its title; `Tab` moves to the first control. Put `autoFocus` on a child to focus it instead, for example the first field of a form.

## Screen Reader Semantics

- The sheet is exposed as `role=dialog` with `aria-modal` by the browser and is named by your `aria-labelledby` or `aria-label`.
- The trigger exposes `aria-haspopup='dialog'` and `aria-expanded`.
- `SheetClose` has no default label, so an icon-only button inside it needs an `aria-label`; the library ships no built-in strings.
- The sheet should read as one coherent overlay surface.
- Non-closable sheets need especially clear purpose.

## Form Semantics

- If the sheet contains a form, required fields and error messaging should remain visible at every snap point.
- Gesture-friendly layout should not hide the real submit and dismissal semantics.
- Buttons in a `<form method="dialog">` close the sheet through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`. This also works with `closedBy='none'`, so a non-closable sheet still has a completion path.

## Accessibility Risks

- A sheet without `aria-labelledby` or `aria-label`.
- Relying only on gesture understanding.
- Snap points that create unusable partially visible content.
- Non-closable flows without clear completion path.
