# Sheet Accessibility

## Labeling

`SheetContent` does not name itself. Naming the sheet is your job, and it is required: a sheet without a name is inaccessible, because screen readers announce it only as "dialog". Reference a visible heading with `aria-labelledby` on `SheetContent`, or set `aria-label` when there is no visible heading. Non-closable sheets should explain why the user is in the flow and how to complete it.

<!-- example: sheet/sheet-with-heading-and-close-button.tsx -->
```tsx
import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { CopyIcon, MailIcon, MessageCircleIcon, XIcon } from '@vega-ui/icons';

const link = 'https://maps.example.com/p/blue-harbor-cafe';

export default function SheetWithHeadingAndCloseButton() {
  const titleId = useId();
  const descriptionId = useId();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <Sheet onChangeOpen={() => setCopied(false)}>
      <SheetTrigger asChild>
        <Button>Share place</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId} aria-describedby={descriptionId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Share Blue Harbor Cafe</Heading>
          <SheetClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </SheetClose>
        </div>
        <Text id={descriptionId} size={3} style={{ color: 'var(--label-secondary)' }}>12 Quay Street · Open until 22:00</Text>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} onClick={copy}>
            <Icon size='sm'><CopyIcon /></Icon>
            Copy link
          </Button>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} asChild>
            <a href={`mailto:?subject=Blue%20Harbor%20Cafe&body=${encodeURIComponent(link)}`}>
              <Icon size='sm'><MailIcon /></Icon>
              Send by email
            </a>
          </Button>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} asChild>
            <a href={`sms:?&body=${encodeURIComponent(link)}`}>
              <Icon size='sm'><MessageCircleIcon /></Icon>
              Send as message
            </a>
          </Button>
        </div>
        <Text size={2} role='status' style={{ minHeight: '1lh', color: 'var(--label-secondary)' }}>{copied ? 'The link is on your clipboard.' : ''}</Text>
      </SheetContent>
    </Sheet>
  );
}
```
<!-- /example -->

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On the trigger: opens the sheet. The sheet itself takes the focus, or the child with `autoFocus`. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus to the next or previous control inside the sheet. The page behind is inert, so the focus does not reach it. A `SheetHandle` without several snap points is disabled and skipped. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | On `SheetHandle` with several snap points: moves the sheet to the next higher snap point, and from the highest one back to the lowest. |
| <kbd>Escape</kbd> | Closes the sheet and returns the focus to the element that opened it. With `closedBy='none'` it does nothing. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

`SheetHandle` is always a `<button>` and has no name of its own: give it one with `aria-label`, for example `Resize sheet`. Without several snap points it is `disabled` and `aria-hidden`, so it is not announced, and the sheet can still be dragged by it.

## Focus Behavior

- Focus should move into the sheet on open.
- Focus should restore sensibly on close.

Focus handling comes from the native `<dialog>`: the rest of the page is inert while the sheet is open, `Tab` stays inside the sheet (it can still reach the browser UI), and closing restores focus to the element that was focused before opening.

On open the sheet itself takes focus, so nothing inside is highlighted and screen readers announce its title; `Tab` moves to the first control. Put `autoFocus` on a child to focus it instead, for example the first field of a form.

## Screen Reader Semantics

- The sheet is exposed as `role=dialog` with `aria-modal` by the browser and is named by your `aria-labelledby` or `aria-label`.
- The trigger exposes `aria-haspopup='dialog'`.
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
