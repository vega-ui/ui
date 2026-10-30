# Drawer Accessibility

## Labeling

`DrawerContent` does not name itself. Naming the drawer is your job, and it is required: a drawer without a name is inaccessible, because screen readers announce it only as "dialog".

- Reference a visible heading with `aria-labelledby` on `DrawerContent`, or set `aria-label` when there is no visible heading.
- If the drawer owns a focused task, the heading should describe that task directly.

```tsx
<DrawerContent aria-labelledby='filters-title'>
  <Heading id='filters-title' as='h2' size={4} fontWeight={600}>Filters</Heading>
</DrawerContent>
```

## Keyboard Behavior

- The trigger should open the drawer from the keyboard.
- `Escape` closes the active drawer unless `DrawerContent` has `closedBy='none'`.
- Nested drawers should close in reverse order.

## Focus Behavior

- Focus should move into the drawer on open.
- Focus should return sensibly to the original trigger or equivalent action on close.
- Nested drawer stacks need real integration testing instead of isolated assumptions.

Focus handling comes from the native `<dialog>`: the rest of the page is inert while the drawer is open, `Tab` stays inside the drawer (it can still reach the browser UI), and closing restores focus to the element that was focused before opening.

On open the drawer itself takes focus, so nothing inside is highlighted and screen readers announce its title; `Tab` moves to the first control. Put `autoFocus` on a child to focus it instead, for example the first field of a form.

## Screen Reader Semantics

- The drawer is exposed as `role=dialog` with `aria-modal` by the browser and is named by your `aria-labelledby` or `aria-label`.
- The trigger exposes `aria-haspopup='dialog'` and `aria-expanded`.
- `DrawerClose` has no default label, so an icon-only button inside it needs an `aria-label`; the library ships no built-in strings.
- The drawer should expose a clear panel purpose.
- Long panels should still read as one coherent overlay task rather than a disconnected page fragment.

## Form Semantics

- Drawers often contain forms, but the form semantics belong to the controls inside the panel.
- Error states and required fields should remain visible even when the panel scrolls.
- Buttons in a `<form method="dialog">` close the drawer through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`. This also works with `closedBy='none'`.

## Accessibility Risks

- A drawer without `aria-labelledby` or `aria-label`.
- Long content with poor scroll affordance.
- Nested overlays without retesting focus restoration.
