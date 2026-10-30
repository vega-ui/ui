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

The backdrop is the `::backdrop` of `DialogContent`. It uses `--overlay` when `data-overlay='true'` and a blur when `data-blurred='true'`. Style it through the `DialogContent` class:

```css
.my-dialog::backdrop {
  background: rgb(0 0 0 / 0.6);
}
```

## State And Variant Interaction

- `data-shadowed='true'` enables `--surface-shadow`
- `data-fluid='true'` removes the bounded modal layout and uses full available space
- `data-status='close'` drives the close transition; the open transition starts from `@starting-style`
- `data-blurred='true'` blurs the page behind the dialog
- `data-overlay='true'` dims the page behind the dialog

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
<DialogContent data-fluid='true' aria-labelledby='inspector-title'>
  <Heading id='inspector-title' as='h2' size={4} fontWeight={600}>Inspector</Heading>
  <Text size={3}>Fluid dialogs can stretch to fit workspace tools and dense review surfaces.</Text>
</DialogContent>
```

### Apple-like header

The header with a small title and a 24px round close button in the corner is plain composition: a `Heading` with `size={4}` and `fontWeight={600}`, and `DialogClose asChild` around an `IconButton` placed absolutely in the top end corner (`position: absolute`, `insetBlockStart: 16`, `insetInlineEnd: 16`); the open modal `<dialog>` is its containing block. `IconButton` has no size or shape option for this; the round 24px button comes from two CSS variables set on it, `--icon-button-size: 24px` and `--icon-button-br-ratio: 0.5`, with `Icon size='xs'` inside.

## Do Not Override

- do not treat internal data attributes as a broad public styling API
- do not remove visual contrast between backdrop and content surface
- do not override dialog styling in a way that breaks focus visibility or scroll usability
