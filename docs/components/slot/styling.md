# Slot Styling

## Overview

`Slot` does not own a visual contract. It merges props into one valid child element and leaves all rendering, tokens, and CSS behavior to that child and the parent component that composes `Slot`.

## Public CSS Variables

There are no `--slot-*` public CSS variables in the current implementation.

## Part-Level Variables

### Root

`Slot` has no DOM of its own unless the chosen child renders one.

### Child Element

Styling comes entirely from the slotted child and the parent component that injects props through `asChild`.

## State And Variant Interaction

- `Slot` has no visual variants of its own.
- State classes, data attributes, and inline styles are passed through to the child element.
- Visual drift usually comes from changing the child element semantics, not from any `Slot` CSS layer.

## Examples

### Preserve button styling on a link element

```tsx
<ButtonBase asChild>
  <a href='/pricing'>Pricing</a>
</ButtonBase>
```

### Forward menu-item styling into a router link

```tsx
<DropdownMenuItem asChild>
  <Link href='/settings'>Settings</Link>
</DropdownMenuItem>
```

## Do Not Override

- inventing a standalone `Slot` token API
- treating `Slot` as if it were a styled wrapper
- relying on `Slot` to fix semantic or accessibility issues caused by the chosen child element
