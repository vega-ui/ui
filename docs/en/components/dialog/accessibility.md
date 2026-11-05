# Dialog Accessibility

## Labeling

`DialogContent` does not name itself. Naming the dialog is your job, and it is required: a dialog without a name is inaccessible, because screen readers announce it only as "dialog".

Recommended pattern:

- a visible heading with an `id`, referenced by `aria-labelledby` on `DialogContent`
- `aria-label` on `DialogContent` when there is no visible heading
- `aria-describedby` pointing to the sentence that explains the consequence, so it is announced together with the name

<!-- example: dialog/confirm-action.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

export default function ConfirmAction() {
  const titleId = useId();
  const descriptionId = useId();
  const [deleted, setDeleted] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 72,
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {deleted ? (
        <>
          <Text size={3} role='status' style={{ color: 'var(--label-secondary)' }}>Q3 board deck.pdf moved to trash.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setDeleted(false)}>Undo</Button>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={3} fontWeight={500}>Q3 board deck.pdf</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>4.2 MB · Edited yesterday</Text>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>Delete</Button>
            </DialogTrigger>
            <DialogContent
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              onClose={(event) => setDeleted(event.currentTarget.returnValue === 'delete')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={titleId} as='h2' size={4} fontWeight={600}>Delete Q3 board deck.pdf?</Heading>
                <DialogClose asChild>
                  <IconButton
                    aria-label='Close'
                    variant='secondary'
                    appearance='ghost'
                    style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
                  >
                    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                  </IconButton>
                </DialogClose>
              </div>
              <Text id={descriptionId} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                The file stays in trash for 30 days. Shared links stop working right away.
              </Text>
              <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
                <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Cancel</Button>
                <Button type='submit' value='delete' style={destructive}>Delete file</Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
```
<!-- /example -->

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger: opens the dialog. The dialog itself takes the focus, or the child with `autoFocus`. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus to the next or previous control inside the dialog. The page behind is inert, so the focus does not reach it. |
| <kbd>Escape</kbd> | Closes the dialog and returns the focus to the element that opened it. With `closedBy='none'` it does nothing. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

In nested dialogs `Escape` closes only the top one.

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
