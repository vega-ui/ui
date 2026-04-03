# Pagination Styling

## Overview

`Pagination` styling is mostly delegated to the composed `Button`, `IconButton`, and `Text` primitives. The pagination-specific layer mainly controls list layout and a few page-item shape adjustments.

## Public CSS Variables

There are no large dedicated `--pagination-*` public variables in the current implementation.

The component primarily relies on:

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--spacing-6` | root list | gap between items |
| `--padding-block` | page items / ellipsis | square aspect-ratio sizing |
| `--spacing-8` | pagination text | inline text padding |
| `--color-primary-500` | pagination text | primary text tone |
| `--color-secondary-500` | pagination text | secondary text tone |

## Part-Level Variables

### Root

The root sets horizontal list layout and spacing.

### `PaginationItem`

Adds square aspect ratio by mapping inline padding to block padding.

### `PaginationEllipsis`

Uses button styling but removes interactive-looking background changes.

### `PaginationText`

Adds side padding and variant-based text color.

## State And Variant Interaction

- size and variant mostly flow from pagination context into `Button`, `IconButton`, and `Text`
- current page state changes button appearance to `fill`
- ellipsis stays visually passive

## Examples

### Secondary pagination text

```tsx
<Pagination variant='secondary'>
  <PaginationListItem>
    <PaginationText>Page 3 of 20</PaginationText>
  </PaginationListItem>
</Pagination>
```

## Do Not Override

- styling ellipsis like an interactive page item
- making page items non-square without product intent
