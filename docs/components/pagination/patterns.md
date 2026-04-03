# Pagination Patterns

## Link-Based Pagination

When to use:

- pages are real navigable destinations

Composition notes:

- use `PaginationItem asChild`
- keep href generation in the parent feature

Trade-offs:

- strong navigation semantics
- routing complexity stays outside the component

```tsx
<Pagination>
  <PaginationListItem>
    <PaginationItem asChild current>
      <a href='?page=1'>1</a>
    </PaginationItem>
  </PaginationListItem>
</Pagination>
```

## Button-Based Pagination

When to use:

- page state is entirely local or client-controlled

Composition notes:

- keep current page in parent state
- disable boundary triggers

Trade-offs:

- simple local control
- parent feature must still own canonical page state

```tsx
<Pagination>
  <PaginationListItem>
    <PaginationTriggerIconButton disabled />
  </PaginationListItem>
  <PaginationListItem>
    <PaginationItem current>1</PaginationItem>
  </PaginationListItem>
</Pagination>
```

## Truncated Large Range

When to use:

- the page count is large and showing every page is noisy

Composition notes:

- keep first, current context, and last pages visible
- use ellipsis only as a gap indicator

Trade-offs:

- compact and scalable
- users lose direct access to every page button

```tsx
<Pagination>
  <PaginationListItem><PaginationItem>1</PaginationItem></PaginationListItem>
  <PaginationListItem><PaginationEllipsis /></PaginationListItem>
  <PaginationListItem><PaginationItem current>12</PaginationItem></PaginationListItem>
</Pagination>
```
