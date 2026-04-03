# Dialog

## Doc Profile

`advanced interactive`

## Summary

`Dialog` is a [compound component](../../glossary.md#compound-component) for modal overlays with trigger, [portal](../../glossary.md#portal), backdrop, content, title, header, and close-button parts. It is the strongest general-purpose overlay in the family and should be chosen when modal interruption is intentional.

## Imports

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogCloseButton,
  type DialogProps,
} from '@vega-ui/react';
```

## Exported Types

- `DialogProps`
- `DialogTriggerProps`
- `DialogPortalProps`
- `DialogBackdropProps`
- `DialogContentProps`
- `DialogHeaderProps`
- `DialogTitleProps`
- `DialogCloseButtonProps`

## Minimal Composition

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open billing dialog</Button>
  </DialogTrigger>
  <DialogPortal>
    <DialogBackdrop>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Billing address</DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <Text size={3}>Update the legal address used on future invoices.</Text>
      </DialogContent>
    </DialogBackdrop>
  </DialogPortal>
</Dialog>
```

## Required Parts

- `Dialog`: root state and context provider
- `DialogTrigger`: open action surface
- `DialogContent`: modal content container

## Optional Parts

- `DialogPortal`: [portal](../../glossary.md#portal) mounting layer
- `DialogBackdrop`: background overlay and click-away surface
- `DialogHeader`: title/action layout wrapper
- `DialogTitle`: title for orientation and accessibility
- `DialogCloseButton`: explicit close affordance

## Composition Order

Typical composition:

1. `Dialog`
2. `DialogTrigger`
3. `DialogPortal`
4. `DialogBackdrop`
5. `DialogContent`
6. `DialogHeader`
7. `DialogTitle`
8. `DialogCloseButton`

## Variants

- Controlled open state versus trigger-driven usage
- Minimal content-only dialog versus header/action dialog
- Fixed content dialog versus scrollable or fluid content dialog

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
- Titles should be present for orientation and screen-reader context.
- Keep dismissal behavior explicit when the dialog contains forms or destructive actions.
- If the content starts reading like a full-page workflow, a drawer, sheet, or routed screen may be clearer than a large dialog.

## Common Mistakes

- Omitting `DialogTitle`.
- Putting critical page content into a dialog without a usable mobile layout.
- Failing to test dialog behavior inside other overlays.
- Treating long dialog content as static without checking scroll and action visibility.
