# Dialog Styling

## Overview

`Dialog` styling is intentionally light. Most visual behavior comes from theme-level surface tokens plus a few content-level layout rules.

## Public CSS Variables

The current implementation does not expose a large documented `--dialog-*` variable surface. The main styling hooks are global semantic variables.

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--surface-primary` | `DialogContent` | main dialog surface |
| `--surface-shadow` | `DialogContent` | elevated shadow when `data-shadowed='true'` |
| `--spacing-14` / `--spacing-12` | `DialogContent` | inner padding |
| `--radius-6` | `DialogContent` | border radius |

## Part-Level Variables

### Content

[DialogContent](../../../../packages/ui/src/Dialog/components/DialogContent/style.module.css) uses:

- `--surface-primary`
- `--surface-shadow`
- spacing tokens for padding
- radius tokens for shape

### Backdrop

The backdrop is the `::backdrop` of `DialogContent`. It uses `--overlay` when `data-overlay='true'` and a blur when `data-blurred='true'`. Style it through the `DialogContent` class:

<!-- example: dialog/backdrop.css -->
```css
.my-dialog::backdrop {
  background: rgb(0 0 0 / 0.6);
}
```
<!-- /example -->

## State And Variant Interaction

- `data-shadowed='true'` enables `--surface-shadow`
- `data-fluid='true'` removes the bounded modal layout and uses full available space
- `data-status='close'` drives the close transition; the open transition starts from `@starting-style`
- `data-blurred='true'` blurs the page behind the dialog
- `data-overlay='true'` dims the page behind the dialog

## Examples

### Theme-level surface customization

<!-- example: dialog/theme-level-surface-customization.css -->
```css
.brand-theme {
  --surface-primary: oklch(99.2% 0.006 80);
  --surface-shadow: 0 20px 60px oklch(20% 0.02 60 / 0.18);
}
```
<!-- /example -->

### Product-level fluid dialog

<!-- example: dialog/product-level-fluid-dialog.tsx -->
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
  Label,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function ProductLevelFluidDialog() {
  const titleId = useId();
  const subjectId = useId();
  const bodyId = useId();

  return (
    <Dialog fluid>
      <DialogTrigger asChild>
        <Button>Compose message</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'grid', maxWidth: 720, marginInline: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>New message to the design team</Heading>
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
          <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={subjectId}>Subject</Label>
              <TextField>
                <TextFieldInput id={subjectId} name='subject' required autoFocus />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={bodyId}>Message</Label>
              <TextArea id={bodyId} name='body' rows={12} fullWidth required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-4)' }}>
              <Button type='submit'>Send</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

### Apple-like header

The header with a small title and a 24px round close button in the corner is plain composition: a `Heading` with `size={4}` and `fontWeight={600}`, and `DialogClose asChild` around an `IconButton` placed absolutely in the top end corner (`position: absolute`, `insetBlockStart: 16`, `insetInlineEnd: 16`); the open modal `<dialog>` is its containing block. `IconButton` has no size or shape option for this; the round 24px button comes from two CSS variables set on it, `--icon-button-size: 24px` and `--icon-button-br-ratio: 0.5`, with `Icon size='xs'` inside.

## Do Not Override

- do not treat internal data attributes as a broad public styling API
- do not remove visual contrast between backdrop and content surface
- do not override dialog styling in a way that breaks focus visibility or scroll usability
