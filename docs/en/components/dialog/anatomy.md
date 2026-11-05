# Dialog Anatomy

## Overview

`Dialog` is a [compound component](../../glossary.md#compound-component). The root owns open state, focus management, dismissal behavior, and modal coordination across the exported child parts.

## Required Parts

### `Dialog`

Root provider for the dialog state.

- Required: yes
- Owns: open state, dismissal, focus lifecycle
- Must wrap every other `Dialog*` part

### `DialogTrigger`

User action that opens the dialog.

- Required: effectively yes for normal product flows
- Typical usage: `asChild` with `Button`
- Should stay inside `Dialog`

### `DialogContent`

Primary modal surface.

- Required: yes
- Owns: the native modal `<dialog>`, its `::backdrop`, and open and close transitions
- Renders into `document.body`, so no portal part is needed

## Optional Parts

### `DialogClose`

Closes the dialog when clicked.

- Required: no
- Renders a `<button type="button">` with no styles, icon, or label; with `asChild` it renders your own button instead
- Calls `onChangeOpen(false)` before your `onClick`, so the close transition plays and a controlled parent can keep the dialog open
- Give an icon-only close button an `aria-label`

## Your Own Markup

The library does not ship header or title parts. They carry no behavior that plain markup cannot express, so you compose them yourself.

### Heading

Names the dialog.

- Required: a name is required, either a heading referenced by `aria-labelledby` on `DialogContent` or `aria-label` on `DialogContent`
- Typical usage: `Heading` with an `id`

### Action buttons

Buttons that answer the dialog, such as Cancel and Confirm.

- Put them in a `<form method="dialog">`; submitting it closes the dialog through `onChangeOpen(false)`, and the submit button's `value` becomes the dialog's `returnValue`
- Use `DialogClose` for a standalone close button, such as the X in a header

## Composition Order

Typical composition:

1. `Dialog`
2. `DialogTrigger`
3. `DialogContent`
4. Your heading, an optional `DialogClose`, body, and a `<form method="dialog">` with action buttons

## Valid Composition Patterns

<!-- example: dialog/minimal-composition.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
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

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Leave workspace</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Leave Northwind Studio?</Heading>
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
        <Text size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
          You will lose access to 14 projects until an admin invites you again.
        </Text>
        <form method='dialog' style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
          <Button type='submit' value='cancel' variant='secondary' appearance='ghost'>Stay</Button>
          <Button type='submit' value='leave' style={destructive}>Leave workspace</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

This is the production-safe default composition for modal flows.

## Invalid Composition Patterns

### `DialogContent` outside `Dialog`

The child parts depend on root context. Rendering them outside `Dialog` breaks behavior.

### Content without a name

`DialogContent` does not name itself. Without `aria-labelledby` pointing to your heading or an `aria-label`, screen readers announce an unnamed dialog.

### Nested dialogs without retesting focus flow

Nested overlay stacks can still be valid, but they must be treated as an integration edge case, not assumed to work from isolated component testing alone.
