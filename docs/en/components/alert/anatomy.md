# Alert Anatomy

## Overview

`Alert` is a [compound component](../../glossary.md#compound-component) because the root, icon, title, and content parts work together as one message pattern with shared semantic variant context.

## Required Parts

### `Alert`

Required. Owns semantic variant and appearance.

### `AlertMain`

Required in most product alerts. Wraps the message hierarchy.

## Optional Parts

### `AlertIcon`

Optional icon of the message. It gives the icon passed as its children the size of the alert and the color of its `variant`, but does not choose it: pass one that matches the variant, such as an info, warning or check icon from any icon set. The [recipe](./index.md#your-own-component) picks it by `variant` once for the whole app.

### `AlertTitle`

Optional title for stronger emphasis.

### `AlertContent`

Optional supporting message copy.

## Composition Order

1. `Alert`
2. `AlertIcon`
3. `AlertMain`
4. `AlertTitle`
5. `AlertContent`

## Valid Composition Patterns

<!-- example: alert/variants.tsx -->
```tsx
import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle } from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from '@vega-ui/icons';

export default function Variants() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 560 }}>
      <Alert variant='info'>
        <AlertIcon><InfoIcon /></AlertIcon>
        <AlertMain>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertContent>The dashboard will be read-only on Sunday from 02:00 to 03:00 UTC.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='success'>
        <AlertIcon><CircleCheckIcon /></AlertIcon>
        <AlertMain>
          <AlertTitle>Domain verified</AlertTitle>
          <AlertContent>Emails from billing@northwind.io will now pass SPF and DKIM checks.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='warning'>
        <AlertIcon><TriangleAlertIcon /></AlertIcon>
        <AlertMain>
          <AlertTitle>Storage almost full</AlertTitle>
          <AlertContent>You have used 46.2 GB of 50 GB. Uploads stop when the limit is reached.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='error' appearance='surface'>
        <AlertIcon><CircleAlertIcon /></AlertIcon>
        <AlertMain>
          <AlertTitle>Card declined</AlertTitle>
          <AlertContent>The payment for invoice INV-2048 was declined by the bank. Update the card to keep your plan.</AlertContent>
        </AlertMain>
      </Alert>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Alert used as a full-page layout shell

Alerts are feedback messages, not a replacement for page structure.

### Long action-heavy workflow inside the alert

Once the content becomes task-heavy, another pattern is usually a better fit.
