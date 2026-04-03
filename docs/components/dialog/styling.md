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

[DialogContent](../../../packages/ui/src/Dialog/components/DialogContent/style.module.css) uses:

- `--surface-primary`
- `--surface-shadow`
- spacing tokens for padding
- radius tokens for shape

### Backdrop

[DialogBackdrop](../../../packages/ui/src/Dialog/components/DialogBackdrop/style.module.css) relies on spacing and the shared overlay model rather than a large component-local variable set.

## State And Variant Interaction

- `data-shadowed='true'` enables `--surface-shadow`
- `data-fluid='true'` removes the bounded modal layout and uses full available space
- `data-status='open'` drives the open-state scale transition

## Examples

### Theme-level surface customization

```css
.brand-theme {
  --surface-primary: #fffdf9;
  --surface-shadow: 0 20px 60px rgba(23, 16, 9, 0.18);
}
```

### Product-level fluid dialog

```tsx
<DialogContent data-fluid='true'>
  <DialogHeader>
    <DialogTitle>Inspector</DialogTitle>
    <DialogCloseButton />
  </DialogHeader>
  <Text size={3}>Fluid dialogs can stretch to fit workspace tools and dense review surfaces.</Text>
</DialogContent>
```

## Do Not Override

- do not treat internal data attributes as a broad public styling API
- do not remove visual contrast between backdrop and content surface
- do not override dialog styling in a way that breaks focus visibility or scroll usability
