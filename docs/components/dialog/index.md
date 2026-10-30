# Dialog

## Doc Profile

`advanced interactive`

## Summary

`Dialog` is a [compound component](../../glossary.md#compound-component) for modal overlays with root, trigger, and content parts. `DialogClose` turns your own button into a close button; headings and layout are plain markup you compose yourself. `DialogContent` renders a native `<dialog>` opened with `showModal()`, so the browser puts it in the top layer, makes the rest of the page inert, and draws the backdrop. It is the strongest general-purpose overlay in the family and should be chosen when modal interruption is intentional.

## Imports

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  type DialogProps,
} from '@vega-ui/react';
```

## Exported Types

- `DialogProps`
- `DialogTriggerProps`
- `DialogContentProps`
- `DialogCloseProps`

## Minimal Composition

```tsx
import type { CSSProperties } from 'react';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open billing dialog</Button>
  </DialogTrigger>
  <DialogContent aria-labelledby='billing-title'>
    <Heading id='billing-title' as='h2' size={4} fontWeight={600}>Billing address</Heading>
    <DialogClose asChild>
      <IconButton
        aria-label='Close'
        variant='secondary'
        appearance='ghost'
        style={{ position: 'absolute', insetBlockStart: 16, insetInlineEnd: 16, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
      >
        <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
      </IconButton>
    </DialogClose>
    <Text size={3}>Update the legal address used on future invoices.</Text>
  </DialogContent>
</Dialog>
```

## Required Parts

- `Dialog`: root state and context provider
- `DialogTrigger`: open action surface
- `DialogContent`: modal content container

## Optional Parts

- `DialogClose`: closes the dialog when clicked; wraps your own button with `asChild`

## Your Own Markup

- a heading whose `id` is passed to `DialogContent` as `aria-labelledby` (or `aria-label` on `DialogContent`); the dialog must have a name
- action buttons that answer the dialog (Cancel, Confirm) inside a `<form method="dialog">`

## Composition Order

Typical composition:

1. `Dialog`
2. `DialogTrigger`
3. `DialogContent` with your heading, an optional `DialogClose`, body, and a `<form method="dialog">` for action buttons

## Variants

- Controlled open state versus trigger-driven usage
- Minimal content-only dialog versus a dialog with a header row and close button
- Fixed content dialog versus scrollable or fluid content dialog

## Migrating From 2.x

`DialogHeader`, `DialogTitle`, and `DialogCloseButton` were removed: the library keeps only parts that carry behavior plain markup cannot express. `DialogClose` is the behavior-only replacement for the close button.

- `DialogHeader` → your own layout element, for example a flex row
- `DialogTitle` → a `Heading` with an `id`, referenced by `aria-labelledby` on `DialogContent`
- `DialogCloseButton` → `DialogClose asChild` around your own button, for example an `IconButton` with an `aria-label`
- `useDialogContext()` no longer returns `contentId` or `titleId`, and `DialogTrigger` no longer sets `aria-controls`

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Nested overlays should be tested for focus restoration and stacking order.
- Long content should be scrollable without hiding the primary actions.
- The dialog must be named with `aria-labelledby` or `aria-label`.
- Keep dismissal behavior explicit when the dialog contains forms or destructive actions.
- If the content starts reading like a full-page workflow, a drawer, sheet, or routed screen may be clearer than a large dialog.

## Common Mistakes

- Leaving `DialogContent` without `aria-labelledby` or `aria-label`.
- Putting critical page content into a dialog without a usable mobile layout.
- Failing to test dialog behavior inside other overlays.
- Treating long dialog content as static without checking scroll and action visibility.
