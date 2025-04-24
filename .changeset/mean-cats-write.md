---
"@adara-cs/icons": minor
"@adara-cs/utils": minor
"@adara-cs/ui-kit-web": minor
---

A full-featured, accessible `Pagination` component has been added to the library, including support for controlled and link-based navigation.

**Included components:**

- `Pagination`: Root container to layout pagination items and navigation buttons.
- `PaginationItem`: Represents a selectable page number, with `current` prop support.
- `PaginationText`: For controlled mode — e.g., “Page 5 of 20”.
- `PaginationEllipsis`: Displays a non-interactive ellipsis ("...") to indicate skipped pages.
- `PaginationFirstTrigger`: Navigates to the first page, with `href` or `onClick`.
- `PaginationPrevTrigger`: Navigates to the previous page, supports disabled state.
- `PaginationNextTrigger`: Navigates to the next page, also supports `aria-label`.
- `PaginationLastTrigger`: Jumps to the final page in a sequence.

Each trigger component extends `IconButtonProps` and supports `href` for anchor-based navigation, or `onClick` for controlled behavior.

✅ Fully documented with JSDoc  
✅ Unit tested with Vitest + Testing Library  
✅ Includes Storybook demos with link-based and controlled usage
