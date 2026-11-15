---
'@vega-ui/react': major
---

Rebuild `Pagination` as navigation with links.

BREAKING CHANGE: 🧨

- `Pagination` renders a `<nav>` instead of a `<ul>`, and its `ref` points to it. Name it with `aria-label`
- New `PaginationList` renders the `<ul>`, and `PaginationItem` now renders the `<li>`
- New `PaginationLink` replaces the button-based `PaginationItem`: it renders an `<a>`, `current` sets `aria-current='page'`, `appearance` replaces the default look (`fill` for the current page, `transparent` for the others), and `asChild` renders a router link or a `<button>` instead
- `PaginationEllipsis` renders an `<li>` hidden from assistive technologies, as wide as a link of the same size, with `…` by default. It goes in `PaginationList` directly, not inside a `PaginationItem`
- Removed `PaginationListItem`, `PaginationTriggerIconButton` and `PaginationText`. Use `PaginationLink` with an `Icon` and an `aria-label` for the arrows, and `Text` for the status
